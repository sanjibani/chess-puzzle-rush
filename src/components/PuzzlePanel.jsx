import { themeDescriptions, difficultyLevels } from "../data/puzzles";
import { getDifficultyLabel, getDifficultyColor, getRatingChange } from "../utils/elo";

export default function PuzzlePanel({
  puzzle,
  status,
  rating,
  playerColor,
  difficulty,
  timer,
  hintLevel,
  hintsUsed,
  onHint,
  onSolution,
  onNext,
  onRetry,
  onDifficultyChange,
  solutionSteps,
  reviewStep,
  onStepBack,
  onStepForward,
  onSetReviewStep,
  onReport,
  reportedPuzzles,
}) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const ratingChange = puzzle
    ? getRatingChange(rating, puzzle.rating, status === "completed")
    : 0;

  return (
    <div className="puzzle-panel">
      {/* Puzzle Info */}
      <div className="panel-section puzzle-info">
        <div className="puzzle-header">
          <h2>
            {status === "loading"
              ? "Loading..."
              : status === "completed"
              ? "Puzzle Solved!"
              : status === "wrong"
              ? "Incorrect"
              : "Find the Best Move"}
          </h2>
          {puzzle && (
            <span className="puzzle-id">#{puzzle.id}</span>
          )}
        </div>

        {puzzle && (
          <div className="puzzle-meta">
            <div className="meta-row">
              <span className="meta-label">Play as</span>
              <span className={`meta-value color-badge ${playerColor}`}>
                {playerColor === "white" ? "White" : "Black"}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Puzzle Rating</span>
              <span
                className="meta-value"
                style={{ color: getDifficultyColor(puzzle.rating) }}
              >
                {puzzle.rating} ({getDifficultyLabel(puzzle.rating)})
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Time</span>
              <span className="meta-value">{formatTime(timer)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Status Banner */}
      {(status === "completed" || status === "wrong") && (
        <div className={`status-banner ${status}`}>
          <div className="status-icon">
            {status === "completed" ? "\u2713" : "\u2717"}
          </div>
          <div className="status-text">
            {status === "completed" ? (
              <>
                <strong>Correct!</strong>
                <span className="rating-change positive">
                  +{Math.abs(ratingChange)}
                </span>
              </>
            ) : (
              <>
                <strong>Incorrect</strong>
                <span className="rating-change negative">
                  {ratingChange}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Solution Navigator */}
      {(status === "completed" || status === "wrong") &&
        solutionSteps &&
        solutionSteps.length > 1 && (
          <div className="panel-section solution-nav-section">
            <h3>Solution Steps</h3>
            <div className="solution-nav">
              <button
                className="nav-arrow"
                onClick={onStepBack}
                disabled={reviewStep === 0}
                title="Previous move (←)"
              >
                &#8592;
              </button>

              <div className="nav-center">
                {reviewStep === 0 ? (
                  <span className="nav-label">Starting position</span>
                ) : (
                  <>
                    <span
                      className={`nav-move ${
                        solutionSteps[reviewStep]?.isPlayer
                          ? "player-move"
                          : "computer-move"
                      }`}
                    >
                      {solutionSteps[reviewStep]?.san}
                    </span>
                    <span className="nav-who">
                      {solutionSteps[reviewStep]?.isPlayer
                        ? `Your move`
                        : `Response`}
                    </span>
                  </>
                )}
                <span className="nav-counter">
                  {reviewStep} / {solutionSteps.length - 1}
                </span>
              </div>

              <button
                className="nav-arrow"
                onClick={onStepForward}
                disabled={reviewStep === solutionSteps.length - 1}
                title="Next move (→)"
              >
                &#8594;
              </button>
            </div>

            {/* Move list */}
            <div className="move-list">
              {solutionSteps.slice(1).map((step, idx) => (
                <button
                  key={idx}
                  className={`move-pill ${step.isPlayer ? "player" : "computer"} ${
                    reviewStep === idx + 1 ? "active" : ""
                  }`}
                  onClick={() => onSetReviewStep(idx + 1)}
                >
                  {step.san}
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Themes */}
      {puzzle && puzzle.themes && (
        <div className="panel-section themes-section">
          <h3>Themes</h3>
          <div className="theme-tags">
            {puzzle.themes.map((theme) => (
              <span key={theme} className="theme-tag">
                {themeDescriptions[theme] || theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="panel-section controls-section">
        {status === "playing" && (
          <>
            <button className="btn btn-hint" onClick={onHint}>
              {hintLevel === 0
                ? "Hint (show piece)"
                : hintLevel === 1
                ? "Hint (show square)"
                : "Hint used"}
            </button>
            <button className="btn btn-solution" onClick={onSolution}>
              Show Solution
            </button>
          </>
        )}

        {(status === "completed" || status === "wrong") && (
          <>
            <button className="btn btn-next" onClick={onNext}>
              Next Puzzle &rarr;
            </button>
            {status === "wrong" && (
              <button className="btn btn-retry" onClick={onRetry}>
                Retry
              </button>
            )}
          </>
        )}

        {puzzle && (status === "completed" || status === "wrong") && (
          <button
            className={`btn btn-report ${reportedPuzzles?.includes(puzzle.id) ? "reported" : ""}`}
            onClick={() => onReport?.(puzzle.id)}
            disabled={reportedPuzzles?.includes(puzzle.id)}
            title="Report this puzzle as invalid or incorrect"
          >
            {reportedPuzzles?.includes(puzzle.id)
              ? "Reported — Thanks!"
              : "Report Bad Puzzle"}
          </button>
        )}
      </div>

      {/* Difficulty Selector */}
      <div className="panel-section difficulty-section">
        <h3>Difficulty</h3>
        <div className="difficulty-buttons">
          <button
            className={`diff-btn ${difficulty === "all" ? "active" : ""}`}
            onClick={() => onDifficultyChange("all")}
          >
            All
          </button>
          {difficultyLevels.map((level) => (
            <button
              key={level.name}
              className={`diff-btn ${
                difficulty === level.name.toLowerCase() ? "active" : ""
              }`}
              style={{
                "--diff-color": level.color,
              }}
              onClick={() => onDifficultyChange(level.name.toLowerCase())}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div className="panel-section shortcuts-section">
        <h3>Shortcuts</h3>
        <div className="shortcut-list">
          <div className="shortcut">
            <kbd>H</kbd> <span>Hint</span>
          </div>
          <div className="shortcut">
            <kbd>N</kbd> <span>Next puzzle</span>
          </div>
          <div className="shortcut">
            <kbd>R</kbd> <span>Retry</span>
          </div>
          <div className="shortcut">
            <kbd>S</kbd> <span>Solution</span>
          </div>
          <div className="shortcut">
            <kbd>&#8592;</kbd><kbd>&#8594;</kbd> <span>Step</span>
          </div>
        </div>
      </div>
    </div>
  );
}
