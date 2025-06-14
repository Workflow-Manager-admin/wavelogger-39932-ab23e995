import React from "react";
import "./navbar.css";

// PUBLIC_INTERFACE
export default function Navbar({ onHome, onLog, onStats, active }) {
  return (
    <nav className="navbar surf-navbar">
      <div className="container navbar-inner">
        <div className="logo surf-logo" onClick={onHome}>
          <span className="logo-symbol">🌊</span>
          SurfSync
        </div>
        <div className="nav-links">
          <button
            className={active === "home" ? "nav-btn nav-btn-active" : "nav-btn"}
            onClick={onHome}
          >
            Sessions
          </button>
          <button
            className={active === "log" ? "nav-btn nav-btn-active" : "nav-btn"}
            onClick={onLog}
          >
            Log Session
          </button>
          <button
            className={active === "stats" ? "nav-btn nav-btn-active" : "nav-btn"}
            onClick={onStats}
          >
            Stats
          </button>
        </div>
      </div>
    </nav>
  );
}
