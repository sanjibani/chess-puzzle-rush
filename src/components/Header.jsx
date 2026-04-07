import { getDifficultyColor } from "../utils/elo";

export default function Header({
  rating,
  stats,
  soundEnabled,
  onToggleSound,
  onOpenStats,
}) {
  const today = stats.today || { solved: 0, attempted: 0 };
  const todayDate = new Date().toDateString();
  const todaySolved = today.date === todayDate ? today.solved : 0;

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          <span className="logo-icon">&#9822;</span>
          <span className="logo-text">Puzzle Rush</span>
        </h1>
      </div>

      <div className="header-center">
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Rating</span>
            <span
              className="stat-value rating-value"
              style={{ color: getDifficultyColor(rating) }}
            >
              {rating}
            </span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">Streak</span>
            <span className="stat-value streak-value">
              {stats.currentStreak > 0 ? (
                <>
                  {stats.currentStreak}
                  {stats.currentStreak >= 5 && (
                    <span className="fire">&#128293;</span>
                  )}
                </>
              ) : (
                0
              )}
            </span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">Today</span>
            <span className="stat-value">{todaySolved}</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          className="icon-btn"
          onClick={onToggleSound}
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? "\u{1F50A}" : "\u{1F507}"}
        </button>
        <button className="icon-btn" onClick={onOpenStats} title="View stats">
          &#9776;
        </button>
      </div>
    </header>
  );
}
