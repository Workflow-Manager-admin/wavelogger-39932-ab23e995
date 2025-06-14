import React from "react";
import "./statsdashboard.css";

// PUBLIC_INTERFACE
export default function StatsDashboard({ sessions, onBack }) {
  // Calculate stats for demo
  const totalSessions = sessions.length;
  const totalWaves = sessions.reduce((t, s) => t + (parseInt(s.waves, 10) || 0), 0);
  const spotCounts = countBy(sessions, (s) => s.spot);
  const favSpot = Object.entries(spotCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  const swellCounts = countBy(sessions, (s) => {
    if (s.swell < 4) return "0-3ft";
    if (s.swell < 8) return "4-7ft";
    return "8-12ft";
  });

  // For chart bar SVG
  const chartData = [
    { label: "Low (0-3ft)", value: swellCounts["0-3ft"] || 0, col: "#4FC3F7" },
    { label: "Med (4-7ft)", value: swellCounts["4-7ft"] || 0, col: "#83e1e6" },
    { label: "Big (8-12ft)", value: swellCounts["8-12ft"] || 0, col: "#00897B" },
  ];

  return (
    <div className="container stats-dashboard">
      <button className="btn btn-back" onClick={onBack}>
        &larr; Back
      </button>
      <h2>Surf Stats <span role="img" aria-label="chart">📊</span></h2>
      <div className="stats-summary">
        <Stat label="Total Sessions" value={totalSessions} />
        <Stat label="Total Waves" value={totalWaves} />
        <Stat label="Favorite Spot" value={favSpot || "-"} />
      </div>
      <div className="div-chartbar-label">
        <BarChart data={chartData} max={Math.max(...chartData.map(d => d.value), 1)} />
        <div className="chart-labels">
          {chartData.map((d) => (
            <span key={d.label}>
              <span className="chart-color-dot" style={{ background: d.col }}></span>
              {d.label}: {d.value}
            </span>
          ))}
        </div>
      </div>
      <div className="extra-message">
        More analytics coming soon!
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stats-card">
      <div className="stats-label">{label}</div>
      <div className="stats-value">{value}</div>
    </div>
  );
}

function BarChart({ data, max }) {
  const height = 80;
  const width = 210;
  const barWidth = 50;
  const spacing = 20;
  return (
    <svg width={width} height={height}>
      {data.map((d, i) => (
        <rect
          key={d.label}
          x={i * (barWidth + spacing)}
          y={height - (height * d.value) / max}
          width={barWidth}
          height={(height * d.value) / max}
          fill={d.col}
          rx="4"
        />
      ))}
    </svg>
  );
}

// Utility: countBy
function countBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}
