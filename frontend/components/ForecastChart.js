// ForecastChart.js
// ...implement component here...
import React from "react";

export default function ForecastChart({ years, historical, forecast }) {
  // Simple inline chart (replace with Recharts/Chart.js for production)
  const allYears = [...years.slice(0, -5), ...years.slice(-5)];
  const allValues = [...historical, ...forecast];
  return (
    <div>
      <h3>Unemployment Rate Prediction</h3>
      <svg width={480} height={200} style={{ background: "#f0f0f0" }}>
        {allValues.map((val, i) => (
          i > 0 && (
            <line
              key={i}
              x1={40 + (i - 1) * 40}
              y1={180 - allValues[i - 1] * 10}
              x2={40 + i * 40}
              y2={180 - val * 10}
              stroke={i >= allValues.length - 5 ? "red" : "blue"}
              strokeWidth={2}
            />
          )
        ))}
        {/* X-axis */}
        <line x1={40} y1={180} x2={440} y2={180} stroke="#333" />
        {/* Y-axis */}
        <line x1={40} y1={180} x2={40} y2={20} stroke="#333" />
        {/* Labels */}
        <text x={20} y={30} fontSize={12} fill="#444">%</text>
        {allYears.map((y, i) =>
          i % 5 === 0 ? (
            <text key={y} x={40 + i * 40} y={195} fontSize={10}>{y}</text>
          ) : null
        )}
      </svg>
    </div>
  );
}