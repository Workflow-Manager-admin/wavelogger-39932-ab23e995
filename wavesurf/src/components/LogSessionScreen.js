import React, { useState } from "react";
import "./logsession.css";

const BOARD_TYPES = [
  "Shortboard",
  "Longboard",
  "Fish",
  "Funboard",
  "Gun",
  "Foamie",
];

const WINDS = ["Offshore", "Onshore", "None"];
const TIDES = ["Low", "Mid", "High"];
const SWELL_MARKS = [0, 2, 4, 6, 8, 10, 12];

// PUBLIC_INTERFACE
export default function LogSessionScreen({
  onSave,
  onCancel,
  moods,
  isEdit = false,
  session = null,
  defaultDate,
}) {
  // Defaults for new or edit mode
  const [form, setForm] = useState(
    session || {
      date: defaultDate,
      spot: "",
      board: "",
      waves: 0,
      mood: moods[0],
      notes: "",
      swell: 2,
      wind: WINDS[0],
      tide: TIDES[0],
    }
  );
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // PUBLIC_INTERFACE
  function handleNumberChange(e) {
    let val = Number(e.target.value);
    if (Number.isNaN(val)) val = 0;
    setForm({ ...form, [e.target.name]: val });
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    // Validate
    if (!form.date || !form.spot || !form.board) {
      setError("Date, spot, and board type are required.");
      return;
    }
    onSave(form);
  }

  return (
    <div className="container log-session-wrap">
      <h2>{isEdit ? "Edit Surf Session" : "Log New Surf Session"}</h2>
      <form className="log-session-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-row">
          <label>
            Date<br />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Surf Spot<br />
            <input
              name="spot"
              type="text"
              placeholder="e.g. Ocean Beach"
              value={form.spot}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Board Type<br />
            <select name="board" value={form.board} onChange={handleChange} required>
              <option value="">--Choose Board--</option>
              {BOARD_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <label>
            Wave Count<br />
            <input
              name="waves"
              type="number"
              min={0}
              max={100}
              value={form.waves}
              onChange={handleNumberChange}
              required
            />
          </label>
        </div>
        <div className="form-row emoji-mood-row">
          <label>
            Mood<br />
            <div className="mood-picker">
              {moods.map((m) => (
                <button
                  type="button"
                  key={m}
                  className={
                    "emoji-btn" + (form.mood === m ? " emoji-active" : "")
                  }
                  onClick={() => setForm({ ...form, mood: m })}
                >
                  {m}
                </button>
              ))}
            </div>
          </label>
          <label>
            Swell Size ({form.swell} ft)
            <input
              name="swell"
              type="range"
              min={0}
              max={12}
              step={1}
              value={form.swell}
              onChange={handleNumberChange}
              list="swellmarks"
            />
            <datalist id="swellmarks">
              {SWELL_MARKS.map((v) => (
                <option key={v} value={v} label={v + "ft"} />
              ))}
            </datalist>
          </label>
        </div>
        <div className="form-row">
          <label>
            Wind
            <select name="wind" value={form.wind} onChange={handleChange}>
              {WINDS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </label>
          <label>
            Tide
            <select name="tide" value={form.tide} onChange={handleChange}>
              {TIDES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row notes-row">
          <label>
            Notes (optional)
            <textarea
              name="notes"
              placeholder="Memorable moments, conditions, or anything else..."
              value={form.notes}
              onChange={handleChange}
              rows={3}
              maxLength={240}
            />
          </label>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-buttons">
          <button type="submit" className="btn btn-save">
            {isEdit ? "Save Changes" : "Add Session"}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
