import { getDifficultyColor } from "../utils/elo";

export default function StatsModal({ stats, rating, totalPuzzles, onClose }) {
  const accuracy =
    stats.totalAttempted > 0
      ? Math.round((stats.totalSolved / stats.totalAttempted) * 100)
      : 0;

  const ratingHistory = stats.ratingHistory || [1000];
  const minRating = Math.min(...ratingHistory);
  const maxRating = Math.max(...ratingHistory);
  const ratingRange = Math.max(maxRating - minRating, 100);

  // Simple SVG chart
  const chartWidth = 300;
  const chartHeight = 120;
  const padding = 10;

  const points = ratingHistory
    .map((r, i) => {
      const x =
        padding +
        (i / Math.max(ratingHistory.length - 1, 1)) * (chartWidth - 2 * padding);
      const y =
        chartHeight -
        padding -
        ((r - minRating + 50) / (ratingRange + 100)) * (chartHeight - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Your Statistics</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Rating Section */}
          <div className="stats-section">
            <h3>Current Rating</h3>
            <div
              className="big-rating"
              style={{ color: getDifficultyColor(rating) }}
            >
              {rating}
            </div>
          </div>

          {/* Rating Chart */}
          <div className="stats-section">
            <h3>Rating Progress</h3>
            <div className="chart-container">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="rating-chart"
              >
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((pct) => (
                  <line
                    key={pct}
                    x1={padding}
                    y1={padding + pct * (chartHeight - 2 * padding)}
                    x2={chartWidth - padding}
                    y2={padding + pct * (chartHeight - 2 * padding)}
                    stroke="rgba(255,255,255,0.1)"
                    strokeDasharray="4,4"
                  />
                ))}

                {/* Rating line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke="#81b64c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Current rating dot */}
                {ratingHistory.length > 0 && (
                  <circle
                    cx={
                      padding +
                      ((ratingHistory.length - 1) /
                        Math.max(ratingHistory.length - 1, 1)) *
                        (chartWidth - 2 * padding)
                    }
                    cy={
                      chartHeight -
                      padding -
                      ((ratingHistory[ratingHistory.length - 1] - minRating + 50) /
                        (ratingRange + 100)) *
                        (chartHeight - 2 * padding)
                    }
                    r="4"
                    fill="#81b64c"
                  />
                )}

                {/* Labels */}
                <text x={padding} y={chartHeight - 2} fill="#888" fontSize="8">
                  {minRating - 50}
                </text>
                <text
                  x={chartWidth - padding}
                  y={chartHeight - 2}
                  fill="#888"
                  fontSize="8"
                  textAnchor="end"
                >
                  {maxRating + 50}
                </text>
              </svg>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-section">
            <h3>Performance</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-value">{stats.totalSolved}</div>
                <div className="stat-card-label">Solved</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{stats.totalAttempted}</div>
                <div className="stat-card-label">Attempted</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{accuracy}%</div>
                <div className="stat-card-label">Accuracy</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{stats.bestStreak}</div>
                <div className="stat-card-label">Best Streak</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{stats.currentStreak}</div>
                <div className="stat-card-label">Current Streak</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">
                  {stats.solvedIds ? stats.solvedIds.length : 0}/{totalPuzzles}
                </div>
                <div className="stat-card-label">Unique Solved</div>
              </div>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="stats-section">
            <h3>Today</h3>
            <div className="today-stats">
              <span>
                Solved: <strong>{stats.today?.solved || 0}</strong>
              </span>
              <span>
                Attempted: <strong>{stats.today?.attempted || 0}</strong>
              </span>
              <span>
                Accuracy:{" "}
                <strong>
                  {stats.today?.attempted > 0
                    ? Math.round(
                        ((stats.today?.solved || 0) /
                          stats.today.attempted) *
                          100
                      )
                    : 0}
                  %
                </strong>
              </span>
            </div>
          </div>

          {/* Reset button */}
          <div className="stats-section reset-section">
            <button
              className="btn btn-danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all stats and rating? This cannot be undone."
                  )
                ) {
                  localStorage.removeItem("chess_puzzle_rating");
                  localStorage.removeItem("chess_puzzle_stats");
                  window.location.reload();
                }
              }}
            >
              Reset All Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
