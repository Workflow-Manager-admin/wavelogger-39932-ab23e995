import React from "react";
import "./sessiondetail.css";

// PUBLIC_INTERFACE
export default function SessionDetailView({ session, onEdit, onDelete, onBack }) {
  if (!session) return null;
  return (
    <div className="container session-detail-view">
      <button className="btn btn-back" onClick={onBack}>
        &larr; Back
      </button>
      <div className="detail-header">
        <h2>
          {session.spot} <span className="detail-board">({session.board})</span>
        </h2>
        <div className="detail-date">{session.date}</div>
      </div>
      <div className="detail-info-grid">
        <DetailItem label="Waves" value={session.waves} icon="🌊" />
        <DetailItem label="Mood" value={session.mood} icon={session.mood} />
        <DetailItem label="Swell Size" value={session.swell + "ft"} icon="🌬️" />
        <DetailItem label="Wind" value={session.wind} icon="🍃" />
        <DetailItem label="Tide" value={session.tide} icon="🌅" />
      </div>
      <div className="detail-notes">
        <b>Notes:</b>
        <br />
        {session.notes || <span className="notes-empty">No notes recorded.</span>}
      </div>
      <div className="detail-actions">
        <button className="btn btn-edit" onClick={onEdit}>Edit</button>
        <button className="btn btn-delete" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="detail-item">
      <span className="detail-icon">{icon}</span>
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}
