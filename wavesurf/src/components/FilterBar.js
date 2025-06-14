import React from "react";
import "./filterbar.css";

// PUBLIC_INTERFACE
export default function FilterBar({ value, setValue, moods, boards }) {
  // Spot text + dropdown for board/mood
  function change(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  function clear() {
    setValue({ spot: "", board: "", mood: "" });
  }
  return (
    <div className="filter-bar card-bg">
      <span className="filter-label">Filter: </span>
      <input
        name="spot"
        placeholder="by spot..."
        value={value.spot}
        onChange={change}
      />
      <select name="board" value={value.board} onChange={change}>
        <option value="">Board</option>
        {boards.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <select name="mood" value={value.mood} onChange={change}>
        <option value="">Mood</option>
        {moods.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button className="btn btn-mini" onClick={clear}>
        Clear
      </button>
    </div>
  );
}
