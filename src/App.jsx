import { useState, useEffect, useCallback } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import PuzzlePanel from "./components/PuzzlePanel";
import StatsModal from "./components/StatsModal";
import { usePuzzle } from "./hooks/usePuzzle";
import "./App.css";

export default function App() {
  const {
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
    moveHighlights,
    totalPuzzles,
    solutionSteps,
    reviewStep,
    makeMove,
    showHint,
    showSolution,
    nextPuzzle,
    retryPuzzle,
    setDifficulty,
    setSoundEnabled,
    stepForward,
    stepBack,
    setReviewStep,
    reportPuzzle,
    reportedPuzzles,
  } = usePuzzle();

  const [showStats, setShowStats] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (showStats) {
        if (e.key === "Escape") setShowStats(false);
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          stepBack();
          break;
        case "ArrowRight":
          stepForward();
          break;
        case "h":
        case "H":
          showHint();
          break;
        case "n":
        case "N":
          if (status === "completed" || status === "wrong") nextPuzzle();
          break;
        case "r":
        case "R":
          if (status === "wrong") retryPuzzle();
          break;
        case "s":
        case "S":
          if (status === "playing") showSolution();
          break;
        case "Escape":
          setShowStats(false);
          break;
      }
    },
    [showStats, status, showHint, nextPuzzle, retryPuzzle, showSolution, stepBack, stepForward]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app">
      <Header
        rating={rating}
        stats={stats}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenStats={() => setShowStats(true)}
      />

      <main className="main-content">
        <div className="puzzle-layout">
          <Board
            game={game}
            displayFen={displayFen}
            playerColor={playerColor}
            onMove={makeMove}
            status={status}
            moveHighlights={moveHighlights}
          />

          <PuzzlePanel
            puzzle={puzzle}
            status={status}
            rating={rating}
            playerColor={playerColor}
            difficulty={difficulty}
            timer={timer}
            hintLevel={hintLevel}
            hintsUsed={hintsUsed}
            onHint={showHint}
            onSolution={showSolution}
            onNext={nextPuzzle}
            onRetry={retryPuzzle}
            onDifficultyChange={setDifficulty}
            solutionSteps={solutionSteps}
            reviewStep={reviewStep}
            onStepBack={stepBack}
            onStepForward={stepForward}
            onSetReviewStep={setReviewStep}
            onReport={reportPuzzle}
            reportedPuzzles={reportedPuzzles}
          />
        </div>

        {stats.currentStreak >= 3 && status === "completed" && (
          <div className="streak-banner">
            <span className="streak-fire">&#128293;</span>
            <span>{stats.currentStreak} puzzle streak!</span>
            <span className="streak-fire">&#128293;</span>
          </div>
        )}
      </main>

      {showStats && (
        <StatsModal
          stats={stats}
          rating={rating}
          totalPuzzles={totalPuzzles}
          onClose={() => setShowStats(false)}
        />
      )}
    </div>
  );
}
