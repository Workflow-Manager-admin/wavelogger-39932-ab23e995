import React from "react";
import SessionCard from "./SessionCard";

// PUBLIC_INTERFACE
export default function HomeScreen({ sessions, onView, onLog }) {
  return (
    <div className="container sessions-home">
      <div className="home-header">
        <h1 className="main-title">
          <span role="img" aria-label="wave">
            🌊
          </span>{" "}
          Your Surf Sessions
        </h1>
        <button className="btn btn-primary log-btn" onClick={onLog}>
          + Log New Session
        </button>
      </div>
      {sessions.length === 0 ? (
        <div className="empty-list">
          No sessions yet. Click <em>Log New Session</em> to begin!
        </div>
      ) : (
        <div className="session-card-list">
          {sessions.map((sess) => (
            <SessionCard
              key={sess.id}
              session={sess}
              onClick={() => onView(sess.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
