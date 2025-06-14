import React from "react";
import "./sessioncard.css";

// PUBLIC_INTERFACE
export default function SessionCard({ session, onClick }) {
  return (
    <div className="session-card" onClick={onClick}>
      <div className="card-date">
        {session.date}
      </div>
      <div className="card-title">
        {session.spot} &mdash; {session.board}
      </div>
      <div className="card-row">
        <span title="Waves">🌊 {session.waves}</span>
        <span title="Mood">{session.mood}</span>
        <span title="Swell Size">🌬️ {session.swell}ft</span>
      </div>
      <div className="card-footer">
        <span title="Wind">
          <WindIcon wind={session.wind} /> {session.wind}
        </span>
        <span title="Tide">
          <TideIcon tide={session.tide} /> {session.tide}
        </span>
      </div>
    </div>
  );
}

// Ocean wind icon
function WindIcon({ wind }) {
  if (wind === "Offshore") return <span role="img" aria-label="offshore">🟦</span>;
  if (wind === "Onshore") return <span role="img" aria-label="onshore">🟩</span>;
  if (wind === "None") return <span role="img" aria-label="calm">⬜️</span>;
  return <span role="img" aria-label="wind">🌬️</span>;
}
// Ocean tide icon
function TideIcon({ tide }) {
  if (tide === "High") return <span role="img" aria-label="high tide">🌊</span>;
  if (tide === "Mid") return <span role="img" aria-label="mid tide">🌅</span>;
  if (tide === "Low") return <span role="img" aria-label="low tide">🏖️</span>;
  return <span role="img" aria-label="tide">🌊</span>;
}
