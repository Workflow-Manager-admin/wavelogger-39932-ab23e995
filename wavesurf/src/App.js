import React, { useState, useMemo } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import HomeScreen from "./components/HomeScreen";
import LogSessionScreen from "./components/LogSessionScreen";
import SessionDetailView from "./components/SessionDetailView";
import StatsDashboard from "./components/StatsDashboard";
import ReminderBanner from "./components/ReminderBanner";
import FilterBar from "./components/FilterBar";

// PUBLIC_INTERFACE
function getInitialSessions() {
  // Sample data for demo (adapted to requirements).
  return [
    {
      id: 1,
      date: new Date().toISOString().slice(0, 10),
      spot: "Ocean Beach",
      board: "Shortboard",
      waves: 13,
      mood: "🌊",
      swell: 6,
      wind: "Onshore",
      tide: "Mid",
      notes: "Fun sunset surf, little choppy.",
    },
    {
      id: 2,
      date: "2024-06-13",
      spot: "Mavericks",
      board: "Gun",
      waves: 3,
      mood: "😬",
      swell: 12,
      wind: "Offshore",
      tide: "High",
      notes: "Big, scary but epic!",
    },
    {
      id: 3,
      date: "2024-06-12",
      spot: "Santa Cruz",
      board: "Longboard",
      waves: 18,
      mood: "😊",
      swell: 3,
      wind: "None",
      tide: "Low",
      notes: "Small but nice and glassy.",
    },
  ];
}

// Mood options (emoji).
const MOODS = ["😬", "🙂", "😊", "🌊", "🤙", "🏄", "🥶"];

export default function App() {
  const [route, setRoute] = useState("home"); // 'home', 'log', 'view', 'edit', 'stats'
  const [sessions, setSessions] = useState(getInitialSessions);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [filter, setFilter] = useState({ spot: "", board: "", mood: "" });

  // Reminder logic (dummy - always triggers if you haven't logged today)
  const hasLoggedToday = sessions.some(
    (s) => s.date === new Date().toISOString().slice(0, 10)
  );

  // Handlers for navigation/routes
  const goHome = () => {
    setRoute("home");
    setSelectedSessionId(null);
  };

  const goLog = () => {
    setRoute("log");
    setSelectedSessionId(null);
  };

  const goStats = () => {
    setRoute("stats");
    setSelectedSessionId(null);
  };

  const goViewDetail = (id) => {
    setSelectedSessionId(id);
    setRoute("view");
  };

  const goEdit = (id) => {
    setSelectedSessionId(id);
    setRoute("edit");
  };

  // CRUD handlers
  // PUBLIC_INTERFACE
  function addSession(newSession) {
    setSessions((prev) => [
      { ...newSession, id: Date.now() },
      ...prev,
    ]);
    setRoute("home");
  }

  // PUBLIC_INTERFACE
  function updateSession(id, updated) {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    setRoute("home");
  }

  // PUBLIC_INTERFACE
  function deleteSession(id) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setRoute("home");
  }

  // Filtering
  const filteredSessions = useMemo(() => {
    let result = sessions;
    if (filter.spot)
      result = result.filter((s) =>
        s.spot.toLowerCase().includes(filter.spot.toLowerCase())
      );
    if (filter.board) result = result.filter((s) => s.board === filter.board);
    if (filter.mood) result = result.filter((s) => s.mood === filter.mood);
    return result;
  }, [sessions, filter]);

  // Unique boards for filtering
  const boardTypes = [...new Set(sessions.map((s) => s.board))];

  // Unique moods (from data)
  const moodsUsed = Array.from(new Set(sessions.map((s) => s.mood))).filter(
    (m) => m
  );

  return (
    <div className="app ocean-bg">
      <Navbar
        onHome={goHome}
        onLog={goLog}
        onStats={goStats}
        active={route}
      />
      <main className="main-content">
        {route === "home" && (
          <>
            <ReminderBanner
              show={!hasLoggedToday}
              onLog={goLog}
              todayLogged={hasLoggedToday}
            />
            <FilterBar
              value={filter}
              setValue={setFilter}
              moods={moodsUsed}
              boards={boardTypes}
            />
            <HomeScreen
              sessions={filteredSessions}
              onView={goViewDetail}
              onLog={goLog}
            />
          </>
        )}

        {route === "log" && (
          <LogSessionScreen
            onSave={addSession}
            onCancel={goHome}
            moods={MOODS}
            defaultDate={new Date().toISOString().slice(0, 10)}
          />
        )}

        {route === "edit" && selectedSessionId !== null && (
          <LogSessionScreen
            onSave={(data) => updateSession(selectedSessionId, data)}
            onCancel={goHome}
            moods={MOODS}
            isEdit
            session={sessions.find((s) => s.id === selectedSessionId)}
          />
        )}

        {route === "view" && selectedSessionId !== null && (
          <SessionDetailView
            session={sessions.find((s) => s.id === selectedSessionId)}
            onEdit={() => goEdit(selectedSessionId)}
            onDelete={() => {
              deleteSession(selectedSessionId);
              goHome();
            }}
            onBack={goHome}
          />
        )}

        {route === "stats" && (
          <StatsDashboard
            sessions={sessions}
            onBack={goHome}
          />
        )}
      </main>
      <footer className="footer-bar">
        <div>
          <span className="footer-logo">🌊</span> SurfSync &mdash; A WaveLogger App
        </div>
        <div className="footer-links">
          <a href="https://en.wikipedia.org/wiki/Surfing" target="_blank" rel="noopener noreferrer">
            About Surfing
          </a>
        </div>
      </footer>
    </div>
  );
}
