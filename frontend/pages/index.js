import { useState } from "react";
import ForecastChart from "../components/ForecastChart";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/forecast";

const COUNTRY_LIST = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "India",
  "China",
  "Australia",
  "Brazil",
  "South Africa",
  "Japan"
  // Add more as needed
];

export default function Home() {
  const [country, setCountry] = useState(COUNTRY_LIST[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchForecast() {
    setLoading(true);
    const res = await fetch(`${API_URL}?country=${encodeURIComponent(country)}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>CareerCast Unemployment Insights Platform</h1>
      <label>
        Select Country:{" "}
        <select value={country} onChange={e => setCountry(e.target.value)}>
          {COUNTRY_LIST.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <button style={{ marginLeft: 12 }} onClick={fetchForecast} disabled={loading}>
        {loading ? "Loading..." : "Get Forecast"}
      </button>
      {data && (
        <div style={{ marginTop: 32 }}>
          <h2>{data.country}</h2>
          <div>RMSE: {data.rmse.toFixed(2)}</div>
          <div>MAE: {data.mae.toFixed(2)}</div>
          <ForecastChart years={data.years} historical={data.historical} forecast={data.forecast} />
          <div style={{ marginTop: 16 }}>
            <b>Forecast (next 5 years):</b>
            <pre>{JSON.stringify(data.forecast, null, 2)}</pre>
            <a
              href={`data:text/csv;charset=utf-8,${encodeURIComponent("year,value\n" + data.years.slice(-5).map((y,i)=>`${y},${data.forecast[i]}`).join("\n"))}`}
              download={`${data.country}_forecast.csv`}
            >
              Download Forecast CSV
            </a>
          </div>
        </div>
      )}
    </div>
  );
}