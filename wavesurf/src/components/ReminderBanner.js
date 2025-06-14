import React from "react";
import "./reminder.css";

// PUBLIC_INTERFACE
export default function ReminderBanner({ show, onLog, todayLogged }) {
  if (!show) return null;
  return (
    <div className="reminder-banner ocean-gradient">
      <span role="img" aria-label="surf">🏄‍♂️</span>
      <b>Log your session today!</b>
      {!todayLogged && (
        <button className="btn btn-remind" onClick={onLog}>
          + Log Now
        </button>
      )}
    </div>
  );
}
