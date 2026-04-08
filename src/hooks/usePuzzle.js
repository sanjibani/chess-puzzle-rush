import { useState, useCallback, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import allPuzzles from "../data/puzzles";
import { calculateNewRating } from "../utils/elo";
import { useStorage } from "./useStorage";
import {
  playMoveSound,
  playCaptureSound,
  playCorrectSound,
  playWrongSound,
  playCompletedSound,
  playStreakSound,
} from "../utils/sounds";

// Validate a puzzle using chess.js
function validatePuzzle(puzzle) {
  try {
    const chess = new Chess(puzzle.fen);

    // Validate ALL moves in the sequence are legal
    for (let i = 0; i < puzzle.moves.length; i++) {
      const uci = puzzle.moves[i];
      const from = uci.substring(0, 2);
      const to = uci.substring(2, 4);
      const promotion = uci.length > 4 ? uci[4] : undefined;
      if (!chess.move({ from, to, promotion })) return false;
    }

    // For single-player-move puzzles: reject if the moved piece can be
    // immediately recaptured by the opponent's king AND the result is not
    // check/checkmate (which would justify the sacrifice).
    if (puzzle.moves.length === 1) {
      const after = new Chess(puzzle.fen);
      const uci = puzzle.moves[0];
      const pTo = uci.substring(2, 4);
      const prom = uci.length > 4 ? uci[4] : undefined;
      after.move({ from: uci.substring(0, 2), to: pTo, promotion: prom });

      if (!after.isCheck() && !after.isCheckmate()) {
        const canKingCapture = after
          .moves({ verbose: true })
          .some((m) => m.piece === "k" && m.to === pTo);
        if (canKingCapture) return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

const validPuzzles = allPuzzles.filter(validatePuzzle);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build an array of steps for the solution navigator.
// steps[0] = starting position (no move played yet)
// steps[i] = position after moves[i-1] has been played
function computeSolutionSteps(puzzleData) {
  const steps = [];
  try {
    const chess = new Chess(puzzleData.fen);
    steps.push({ fen: chess.fen(), san: null, from: null, to: null, isPlayer: null });

    puzzleData.moves.forEach((uci, idx) => {
      const from = uci.substring(0, 2);
      const to = uci.substring(2, 4);
      const promotion = uci.length > 4 ? uci[4] : undefined;
      const move = chess.move({ from, to, promotion });
      if (move) {
        steps.push({
          fen: chess.fen(),
          san: move.san,
          from: move.from,
          to: move.to,
          isPlayer: idx % 2 === 0, // even index = player's move
        });
      }
    });
  } catch {
    // Return just the start position if something fails
  }
  return steps;
}

export function usePuzzle() {
  // Persistent state
  const [rating, setRating] = useStorage("chess_puzzle_rating", 1000);
  const [stats, setStats] = useStorage("chess_puzzle_stats", {
    totalSolved: 0,
    totalAttempted: 0,
    currentStreak: 0,
    bestStreak: 0,
    ratingHistory: [1000],
    solvedIds: [],
    today: { date: new Date().toDateString(), solved: 0, attempted: 0 },
  });
  const [soundEnabled, setSoundEnabled] = useStorage("chess_puzzle_sound", true);
  const [reportedPuzzles, setReportedPuzzles] = useStorage("chess_puzzle_reported", []);

  // Session state
  const [game, setGame] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  const [wrongSquare, setWrongSquare] = useState(null);
  const [hintSquare, setHintSquare] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [difficulty, setDifficulty] = useStorage("chess_puzzle_difficulty", "all");
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const autoAdvanceRef = useRef(null);
  const [puzzleQueue, setPuzzleQueue] = useState([]);
  const [puzzleHistory, setPuzzleHistory] = useState([]);

  // Solution review state
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [reviewStep, setReviewStep] = useState(null); // null = live play, 0..N = reviewing

  const getFilteredPuzzles = useCallback(() => {
    if (difficulty === "all") return validPuzzles;
    const ranges = {
      beginner: [0, 1000],
      intermediate: [1000, 1400],
      advanced: [1300, 1800],
      expert: [1800, 3000],
    };
    const [min, max] = ranges[difficulty] || [0, 3000];
    return validPuzzles.filter((p) => p.rating >= min && p.rating < max);
  }, [difficulty]);

  const loadPuzzle = useCallback(
    (specificPuzzle = null) => {
      let nextPuzzle = specificPuzzle;

      if (!nextPuzzle) {
        let queue = [...puzzleQueue];
        if (queue.length === 0) {
          const filtered = getFilteredPuzzles();
          if (filtered.length === 0) {
            setStatus("loading");
            return;
          }
          const unsolved = filtered.filter((p) => !stats.solvedIds.includes(p.id));
          queue = shuffle(unsolved.length > 0 ? unsolved : filtered);
        }
        nextPuzzle = queue.shift();
        setPuzzleQueue(queue);
      }

      try {
        const chess = new Chess(nextPuzzle.fen);
        // Track history (don't add if retrying the same puzzle)
        if (puzzle && puzzle.id !== nextPuzzle.id) {
          setPuzzleHistory((prev) => [...prev.slice(-20), puzzle]);
        }
        if (autoAdvanceRef.current) {
          clearTimeout(autoAdvanceRef.current);
          autoAdvanceRef.current = null;
        }
        setGame(chess);
        setPuzzle(nextPuzzle);
        setMoveIndex(0);
        setStatus("playing");
        setWrongSquare(null);
        setHintSquare(null);
        setHintLevel(0);
        setHintsUsed(0);
        setTimer(0);
        setReviewStep(null);
        setSolutionSteps(computeSolutionSteps(nextPuzzle));

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setTimer((t) => t + 1);
        }, 1000);
      } catch {
        const filtered = getFilteredPuzzles();
        const next = filtered[Math.floor(Math.random() * filtered.length)];
        if (next && next.id !== nextPuzzle.id) {
          loadPuzzle(next);
        }
      }
    },
    [puzzleQueue, getFilteredPuzzles, stats.solvedIds]
  );

  useEffect(() => {
    if (!puzzle && validPuzzles.length > 0) {
      loadPuzzle();
    }
  }, []);

  useEffect(() => {
    setPuzzleQueue([]);
  }, [difficulty]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const completePuzzle = useCallback(
    (solved) => {
      if (timerRef.current) clearInterval(timerRef.current);

      const newRating = calculateNewRating(
        rating,
        puzzle.rating,
        solved && hintsUsed === 0
      );
      setRating(newRating);

      const today = new Date().toDateString();
      setStats((prev) => {
        const todayStats =
          prev.today.date === today
            ? prev.today
            : { date: today, solved: 0, attempted: 0 };

        return {
          ...prev,
          totalSolved: solved ? prev.totalSolved + 1 : prev.totalSolved,
          totalAttempted: prev.totalAttempted + 1,
          currentStreak: solved ? prev.currentStreak + 1 : 0,
          bestStreak: solved
            ? Math.max(prev.bestStreak, prev.currentStreak + 1)
            : prev.bestStreak,
          ratingHistory: [...prev.ratingHistory.slice(-99), newRating],
          solvedIds: solved
            ? [...new Set([...prev.solvedIds, puzzle.id])]
            : prev.solvedIds,
          today: {
            date: today,
            solved: solved ? todayStats.solved + 1 : todayStats.solved,
            attempted: todayStats.attempted + 1,
          },
        };
      });

      if (solved) {
        setStatus("completed");
        // Open review at the last step
        setReviewStep(puzzle.moves.length);
        if (soundEnabled) {
          const newStreak = stats.currentStreak + 1;
          if (newStreak > 0 && newStreak % 5 === 0) {
            playStreakSound();
          } else {
            playCompletedSound();
          }
        }
        // Auto-advance to next puzzle after 2s
        autoAdvanceRef.current = setTimeout(() => {
          loadPuzzle();
        }, 2000);
      } else {
        setStatus("wrong");
        // Open review at step 0 (start) so user can step through
        setReviewStep(0);
        if (soundEnabled) playWrongSound();
        // Auto-retry after 2s
        autoAdvanceRef.current = setTimeout(() => {
          if (puzzle) loadPuzzle(puzzle);
        }, 2000);
      }
    },
    [rating, puzzle, stats, hintsUsed, soundEnabled, setRating, setStats, loadPuzzle]
  );

  const makeMove = useCallback(
    (from, to, promotion) => {
      if (status !== "playing" || !puzzle || !game) return false;

      const expectedMove = puzzle.moves[moveIndex];
      const expectedFrom = expectedMove.substring(0, 2);
      const expectedTo = expectedMove.substring(2, 4);
      const expectedPromotion =
        expectedMove.length > 4 ? expectedMove[4] : undefined;

      if (from === expectedFrom && to === expectedTo) {
        const finalPromotion = promotion || expectedPromotion;
        const gameCopy = new Chess(game.fen());
        const move = gameCopy.move({ from, to, promotion: finalPromotion });

        if (!move) {
          setWrongSquare(to);
          setTimeout(() => setWrongSquare(null), 800);
          return false;
        }

        setGame(gameCopy);
        setHintSquare(null);
        setHintLevel(0);

        if (soundEnabled) {
          if (move.captured) playCaptureSound();
          else playMoveSound();
        }

        const nextIndex = moveIndex + 1;

        if (nextIndex >= puzzle.moves.length) {
          if (soundEnabled) playCorrectSound();
          completePuzzle(true);
          return true;
        }

        setMoveIndex(nextIndex);
        setStatus("correct");

        setTimeout(() => {
          const computerMove = puzzle.moves[nextIndex];
          const compFrom = computerMove.substring(0, 2);
          const compTo = computerMove.substring(2, 4);
          const compPromotion =
            computerMove.length > 4 ? computerMove[4] : undefined;

          const gameCopy2 = new Chess(gameCopy.fen());
          const compMoveResult = gameCopy2.move({
            from: compFrom,
            to: compTo,
            promotion: compPromotion,
          });

          if (compMoveResult) {
            setGame(gameCopy2);
            if (soundEnabled) {
              if (compMoveResult.captured) playCaptureSound();
              else playMoveSound();
            }
          }

          setMoveIndex(nextIndex + 1);
          setStatus("playing");
        }, 500);

        return true;
      } else {
        setWrongSquare(to);
        if (soundEnabled) playWrongSound();
        setTimeout(() => setWrongSquare(null), 800);
        completePuzzle(false);
        return false;
      }
    },
    [game, puzzle, moveIndex, status, soundEnabled, completePuzzle]
  );

  const showHint = useCallback(() => {
    if (!puzzle || status !== "playing") return;

    const currentMove = puzzle.moves[moveIndex];
    const from = currentMove.substring(0, 2);
    const to = currentMove.substring(2, 4);

    if (hintLevel === 0) {
      setHintSquare(from);
      setHintLevel(1);
      setHintsUsed((h) => h + 1);
    } else if (hintLevel === 1) {
      setHintSquare(to);
      setHintLevel(2);
    }
  }, [puzzle, moveIndex, hintLevel, status]);

  const showSolution = useCallback(() => {
    if (!puzzle || status !== "playing") return;

    // Mark as failed (stops timer, updates rating/stats, sets reviewStep=0)
    completePuzzle(false);

    // Cancel the auto-retry that completePuzzle just set — we'll set our own
    // after the animation finishes
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }

    let step = 0;
    const totalSteps = puzzle.moves.length;

    const advance = () => {
      if (step >= totalSteps) {
        // Animation done — auto-retry after 1.5s
        autoAdvanceRef.current = setTimeout(() => {
          if (puzzle) loadPuzzle(puzzle);
        }, 1500);
        return;
      }
      step++;
      setReviewStep(step);
      if (soundEnabled) playMoveSound();
      setTimeout(advance, 650);
    };

    setTimeout(advance, 200);
  }, [puzzle, status, soundEnabled, completePuzzle, setReviewStep, loadPuzzle]);

  // Cancel auto-advance when user interacts with solution review
  const cancelAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  // Step forward through solution
  const stepForward = useCallback(() => {
    if (reviewStep === null) return;
    cancelAutoAdvance();
    setReviewStep((s) => Math.min(s + 1, solutionSteps.length - 1));
  }, [reviewStep, solutionSteps.length, cancelAutoAdvance]);

  // Step backward through solution
  const stepBack = useCallback(() => {
    if (reviewStep === null) return;
    cancelAutoAdvance();
    setReviewStep((s) => Math.max(s - 1, 0));
  }, [reviewStep, cancelAutoAdvance]);

  const nextPuzzle = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    loadPuzzle();
  }, [loadPuzzle]);

  const retryPuzzle = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    if (puzzle) loadPuzzle(puzzle);
  }, [puzzle, loadPuzzle]);

  const prevPuzzle = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    if (puzzleHistory.length === 0) return;
    const prev = puzzleHistory[puzzleHistory.length - 1];
    setPuzzleHistory((h) => h.slice(0, -1));
    loadPuzzle(prev);
  }, [puzzleHistory, loadPuzzle]);

  const playerColor = puzzle
    ? new Chess(puzzle.fen).turn() === "w"
      ? "white"
      : "black"
    : "white";

  // Highlights for live play
  const getMoveHighlights = useCallback(() => {
    if (reviewStep !== null) {
      // When reviewing, highlight the from/to of the current review step's move
      const step = solutionSteps[reviewStep];
      if (step && step.from && step.to) {
        return {
          [step.from]: { backgroundColor: "rgba(255, 255, 0, 0.35)" },
          [step.to]: { backgroundColor: "rgba(255, 255, 0, 0.5)" },
        };
      }
      return {};
    }

    const highlights = {};
    if (wrongSquare) {
      highlights[wrongSquare] = {
        backgroundColor: "rgba(235, 64, 52, 0.5)",
        borderRadius: "50%",
      };
    }
    if (hintSquare) {
      highlights[hintSquare] = {
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderRadius: "50%",
        animation: "pulse 1s infinite",
      };
    }
    return highlights;
  }, [wrongSquare, hintSquare, reviewStep, solutionSteps]);

  // The FEN to display on the board (review or live)
  const displayFen =
    reviewStep !== null && solutionSteps[reviewStep]
      ? solutionSteps[reviewStep].fen
      : game
      ? game.fen()
      : null;

  const reportPuzzle = useCallback(
    (puzzleId) => {
      setReportedPuzzles((prev) => {
        if (prev.includes(puzzleId)) return prev;
        return [...prev, puzzleId];
      });
    },
    [setReportedPuzzles]
  );

  return {
    game,
    displayFen,
    puzzle,
    status,
    rating,
    stats,
    playerColor,
    difficulty,
    timer,
    hintLevel,
    hintsUsed,
    soundEnabled,
    moveHighlights: getMoveHighlights(),
    totalPuzzles: validPuzzles.length,
    solutionSteps,
    reviewStep,
    reportedPuzzles,
    hasPrevPuzzle: puzzleHistory.length > 0,

    makeMove,
    showHint,
    showSolution,
    nextPuzzle,
    retryPuzzle,
    setDifficulty,
    setSoundEnabled,
    loadPuzzle,
    stepForward,
    stepBack,
    setReviewStep,
    reportPuzzle,
    prevPuzzle,
  };
}
