import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function useBoardSize() {
  const [size, setSize] = useState(() => Math.min(560, window.innerWidth - 40));
  useEffect(() => {
    const update = () => setSize(Math.min(560, window.innerWidth - 40));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export default function Board({
  game,
  displayFen,
  playerColor,
  onMove,
  status,
  moveHighlights,
}) {
  const [moveFrom, setMoveFrom] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});
  const boardSize = useBoardSize();

  const boardOrientation = playerColor;
  const isPlayable = status === "playing";

  // Get legal moves for a square
  const getMoveOptions = useCallback(
    (square) => {
      if (!game || !isPlayable) return false;
      const chess = new Chess(game.fen());
      const moves = chess.moves({ square, verbose: true });

      if (moves.length === 0) {
        setOptionSquares({});
        return false;
      }

      const options = {};
      moves.forEach((move) => {
        const isCapture =
          chess.get(move.to) &&
          chess.get(move.to).color !== chess.get(square).color;
        options[move.to] = {
          background: isCapture
            ? "radial-gradient(circle, rgba(0,0,0,0) 58%, rgba(30,30,30,0.22) 58%)"
            : "radial-gradient(circle, rgba(30,30,30,0.22) 28%, transparent 28%)",
          borderRadius: "50%",
        };
      });
      options[square] = {
        background: "rgba(255, 255, 100, 0.45)",
      };
      setOptionSquares(options);
      return true;
    },
    [game, isPlayable]
  );

  // Handle piece drop (drag and drop)
  const onDrop = useCallback(
    (sourceSquare, targetSquare, piece) => {
      if (!isPlayable) return false;

      // Check for promotion
      const isPromotion =
        piece[1] === "P" &&
        ((piece[0] === "w" && targetSquare[1] === "8") ||
          (piece[0] === "b" && targetSquare[1] === "1"));

      const result = onMove(
        sourceSquare,
        targetSquare,
        isPromotion ? "q" : undefined
      );
      setMoveFrom(null);
      setOptionSquares({});
      return result;
    },
    [isPlayable, onMove]
  );

  // Handle square click (click-to-move)
  const onSquareClick = useCallback(
    (square) => {
      if (!isPlayable || !game) return;

      // If we already selected a piece, try to move
      if (moveFrom) {
        const chess = new Chess(game.fen());
        const piece = chess.get(moveFrom);
        const isPromotion =
          piece &&
          piece.type === "p" &&
          ((piece.color === "w" && square[1] === "8") ||
            (piece.color === "b" && square[1] === "1"));

        const result = onMove(
          moveFrom,
          square,
          isPromotion ? "q" : undefined
        );
        setMoveFrom(null);
        setOptionSquares({});
        if (result) return;
      }

      // Check if clicking on own piece
      const chess = new Chess(game.fen());
      const piece = chess.get(square);
      if (piece && piece.color === chess.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
    },
    [game, moveFrom, isPlayable, onMove, getMoveOptions]
  );

  // Combine all square styles
  const customSquareStyles = useMemo(() => {
    return {
      ...optionSquares,
      ...moveHighlights,
    };
  }, [optionSquares, moveHighlights]);

  if (!game && !displayFen) {
    return (
      <div className="board-container">
        <div className="board-loading">Loading puzzle...</div>
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="board-wrapper">
        <Chessboard
          id="puzzle-board"
          position={displayFen || game.fen()}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          boardOrientation={boardOrientation}
          boardWidth={boardSize}
          animationDuration={180}
          arePiecesDraggable={isPlayable}
          customBoardStyle={{
            borderRadius: "6px",
            boxShadow:
              "0 0 0 2px #1a1a1a, 0 0 0 4px #3a3a3a, 0 8px 32px rgba(0,0,0,0.7)",
          }}
          customDarkSquareStyle={{ backgroundColor: "#779952" }}
          customLightSquareStyle={{ backgroundColor: "#EEEED2" }}
          customSquareStyles={customSquareStyles}
          customDropSquareStyle={{
            boxShadow: "inset 0 0 2px 6px rgba(255,255,255,0.25)",
          }}
          areCoordinatesShown={true}
          customNotationStyle={{
            fontSize: "11px",
            fontWeight: "600",
            color: "rgba(0,0,0,0.35)",
          }}
        />
      </div>
      {status === "correct" && (
        <div className="board-overlay correct-overlay">
          <span className="overlay-icon">&#10003;</span>
        </div>
      )}
    </div>
  );
}
