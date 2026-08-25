import React, { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

// Annual US Misery Index = Unemployment rate + CPI inflation rate (annual avg)
// Approximate reconstruction from BLS unemployment + CPI series, in the spirit of
// the YCharts US Misery Index (I:USMINM) series shown in the reference chart.
const data = [
  { year: 1948, value: 11.9 }, { year: 1949, value: 4.7 }, { year: 1950, value: 6.6 },
  { year: 1951, value: 11.2 }, { year: 1952, value: 4.9 }, { year: 1953, value: 3.7 },
  { year: 1954, value: 6.2 }, { year: 1955, value: 4.0 }, { year: 1956, value: 5.6 },
  { year: 1957, value: 7.6 }, { year: 1958, value: 9.6 }, { year: 1959, value: 6.2 },
  { year: 1960, value: 7.2 }, { year: 1961, value: 7.7 }, { year: 1962, value: 6.5 },
  { year: 1963, value: 7.0 }, { year: 1964, value: 6.5 }, { year: 1965, value: 6.1 },
  { year: 1966, value: 6.8 }, { year: 1967, value: 6.6 }, { year: 1968, value: 7.9 },
  { year: 1969, value: 9.0 }, { year: 1970, value: 10.6 }, { year: 1971, value: 10.3 },
  { year: 1972, value: 8.8 }, { year: 1973, value: 11.1, event: "oil" },
  { year: 1974, value: 16.6 }, { year: 1975, value: 17.6 }, { year: 1976, value: 13.5 },
  { year: 1977, value: 13.6 }, { year: 1978, value: 13.7 },
  { year: 1979, value: 17.1, event: "iran" },
  { year: 1980, value: 20.6, event: "peak1980" },
  { year: 1981, value: 17.9 }, { year: 1982, value: 15.9, event: "recession82" },
  { year: 1983, value: 12.8 }, { year: 1984, value: 11.8 }, { year: 1985, value: 10.8 },
  { year: 1986, value: 8.9 }, { year: 1987, value: 9.8 }, { year: 1988, value: 9.6 },
  { year: 1989, value: 10.1 },
  { year: 1990, value: 11.0, event: "gulfwar" },
  { year: 1991, value: 11.0 }, { year: 1992, value: 10.5 }, { year: 1993, value: 9.9 },
  { year: 1994, value: 8.7 }, { year: 1995, value: 8.4 }, { year: 1996, value: 8.3 },
  { year: 1997, value: 7.2 }, { year: 1998, value: 6.1 }, { year: 1999, value: 6.4 },
  { year: 2000, value: 7.4 },
  { year: 2001, value: 7.5, event: "dotcom" },
  { year: 2002, value: 7.4 }, { year: 2003, value: 8.3 }, { year: 2004, value: 8.2 },
  { year: 2005, value: 8.5 }, { year: 2006, value: 7.8 }, { year: 2007, value: 7.5 },
  { year: 2008, value: 9.6, event: "gfc" },
  { year: 2009, value: 8.9 }, { year: 2010, value: 11.2 }, { year: 2011, value: 12.1 },
  { year: 2012, value: 10.2 }, { year: 2013, value: 8.9 }, { year: 2014, value: 7.8 },
  { year: 2015, value: 5.4 }, { year: 2016, value: 6.2 }, { year: 2017, value: 6.5 },
  { year: 2018, value: 6.3 }, { year: 2019, value: 5.5 },
  { year: 2020, value: 9.3, event: "covid" },
  { year: 2021, value: 10.1 },
  { year: 2022, value: 11.6, event: "inflation22" },
  { year: 2023, value: 7.7 }, { year: 2024, value: 7.0 }, { year: 2025, value: 7.1 },
  { year: 2026, value: 7.5, event: "latest" },
];

const events = {
  oil: { label: "1973 Oil Embargo", note: "OPEC embargo quadruples oil prices, igniting cost-push inflation." },
  iran: { label: "1979 Energy Crisis", note: "Iranian Revolution triggers a second oil shock; inflation tops 11%." },
  peak1980: { label: "1980 All-Time Peak · 20.6", note: "Highest reading since 1948. Reagan invokes the index against Carter; Volcker's Fed begins aggressive rate hikes." },
  recession82: { label: "1981–82 Recession", note: "Volcker's inflation fight pushes unemployment to 10.8%, the postwar high." },
  gulfwar: { label: "1990–91 Gulf War Recession", note: "Oil price spike and credit crunch tip the economy into recession." },
  dotcom: { label: "2001 Dot-Com Bust", note: "Tech collapse and 9/11 slow growth and lift unemployment." },
  gfc: { label: "2008 Global Financial Crisis", note: "Oil hits $145/barrel then markets crash; misery index climbs through 2011." },
  covid: { label: "2020 COVID-19 Shock", note: "Unemployment briefly hits 14.7% (Apr 2020) as lockdowns hit; index spikes then eases with stimulus." },
  inflation22: { label: "2021–22 Inflation Surge", note: "Post-pandemic demand + supply shocks + Ukraine war push CPI inflation to ~9%, a 40-year high." },
  latest: { label: "Jul 2026 · 7.50", note: "Current reading, near the series' long-run average." },
};

const eventPoints = data.filter((d) => d.event);

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const point = data.find((d) => d.year === label);
  return (
    <div
      style={{
        background: "#12151c",
        border: "1px solid #2a3040",
        borderRadius: 8,
        padding: "10px 14px",
        color: "#e8ebf2",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        fontSize: 13,
        maxWidth: 260,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ color: "#7fd4c1", fontVariantNumeric: "tabular-nums", marginBottom: point?.event ? 6 : 0 }}>
        Misery Index: {payload[0].value.toFixed(1)}
      </div>
      {point?.event && (
        <>
          <div style={{ fontWeight: 600, color: "#f2a65a", marginBottom: 2 }}>
            {events[point.event].label}
          </div>
          <div style={{ color: "#aab2c5", lineHeight: 1.4 }}>{events[point.event].note}</div>
        </>
      )}
    </div>
  );
}

export default function MiseryIndexChart() {
  const [active, setActive] = useState(null);

  return (
    <div
      style={{
        background: "#0b0d13",
        minHeight: "100%",
        padding: "28px 20px 20px",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        color: "#e8ebf2",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.3 }}>
            US Misery Index <span style={{ color: "#6b7280", fontWeight: 400 }}>(I:USMINM)</span>
          </h1>
          <div style={{ fontSize: 13, color: "#6b7280", fontFamily: "'IBM Plex Mono', monospace" }}>
            Unemployment rate + CPI inflation rate · 1948–2026
          </div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: "#7fd4c1", marginBottom: 18 }}>
          7.50 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 400 }}>for Jul 2026</span>
        </div>

        <div style={{ border: "1px solid #1e2330", borderRadius: 10, padding: "18px 8px 8px", background: "#0f1219" }}>
          <ResponsiveContainer width="100%" height={430}>
            <ComposedChart data={data} margin={{ top: 10, right: 24, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id="fillMisery" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7fd4c1" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#7fd4c1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1c212e" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="year"
                type="number"
                domain={[1948, 2026]}
                ticks={[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2026]}
                stroke="#4b5266"
                tick={{ fill: "#8a92a6", fontSize: 12, fontFamily: "IBM Plex Mono, monospace" }}
                axisLine={{ stroke: "#2a3040" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 22]}
                ticks={[0, 5, 10, 15, 20]}
                stroke="#4b5266"
                tick={{ fill: "#8a92a6", fontSize: 12, fontFamily: "IBM Plex Mono, monospace" }}
                axisLine={false}
                tickLine={false}
                width={34}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3a4155", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7fd4c1"
                strokeWidth={2}
                fill="url(#fillMisery)"
                activeDot={{ r: 4, fill: "#7fd4c1", stroke: "#0b0d13", strokeWidth: 2 }}
              />
              {eventPoints.map((p) => (
                <ReferenceDot
                  key={p.year}
                  x={p.year}
                  y={p.value}
                  r={5}
                  fill="#f2a65a"
                  stroke="#0b0d13"
                  strokeWidth={2}
                  onMouseEnter={() => setActive(p.event)}
                  onMouseLeave={() => setActive(null)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#6b7280", marginBottom: 10, fontWeight: 600 }}>
            Marked events
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {eventPoints.map((p) => {
              const ev = events[p.event];
              const isActive = active === p.event;
              return (
                <div
                  key={p.event}
                  onMouseEnter={() => setActive(p.event)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    border: `1px solid ${isActive ? "#f2a65a" : "#1e2330"}`,
                    background: isActive ? "#171310" : "#0f1219",
                    borderRadius: 8,
                    padding: "10px 12px",
                    transition: "border-color 120ms, background 120ms",
                    cursor: "default",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f2a65a", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontFamily: "IBM Plex Mono, monospace", color: "#6b7280" }}>{p.year}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#e8ebf2" }}>{ev.label.replace(/^\d{4}\s*/, "").replace(/^[\d–\s]*/, "")}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#9aa1b4", lineHeight: 1.45 }}>{ev.note}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 11.5, color: "#525a6e", lineHeight: 1.5 }}>
          Chart reconstructs the annual-average Misery Index (unemployment rate + CPI inflation rate) from BLS
          data, in the style of YCharts' I:USMINM series. Values are approximate annual averages for readability;
          consult{" "}
          <a href="https://ycharts.com/indicators/us_misery_index" style={{ color: "#7fd4c1" }} target="_blank" rel="noreferrer">
            ycharts.com/indicators/us_misery_index
          </a>{" "}
          for the exact monthly series. Hover a point or card for event detail.
        </div>
      </div>
    </div>
  );
}
