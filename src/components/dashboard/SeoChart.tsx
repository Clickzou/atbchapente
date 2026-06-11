"use client";

import { useMemo, useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type DailyPoint = { date: string; clicks: number; impressions: number };

type Period = "7" | "28" | "90";

const nf = new Intl.NumberFormat("fr-FR");

export default function SeoChart({ data }: { data: DailyPoint[] }) {
  const [period, setPeriod] = useState<Period>("28");

  const chartData = useMemo(() => {
    const n = Number(period);
    return data.slice(-n).map((p) => ({
      ...p,
      label: new Date(p.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
    }));
  }, [data, period]);

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-anthracite">Évolution clics &amp; impressions</p>
          <p className="text-xs text-foreground/50">Source : Google Search Console</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
          {(["7", "28", "90"] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                period === p
                  ? "bg-white text-anthracite shadow-sm"
                  : "text-foreground/50 hover:text-anthracite"
              }`}
            >
              {p}j
            </button>
          ))}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="py-12 text-center text-sm text-foreground/40">
          Aucune donnée disponible.
        </div>
      ) : (
        <div className="w-full" style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="atbClicksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                stroke="#e2e8f0"
                interval="preserveStartEnd"
                minTickGap={20}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "#f97316" }}
                stroke="#fed7aa"
                width={40}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "#3b82f6" }}
                stroke="#bfdbfe"
                width={50}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  fontSize: "12px",
                }}
                labelStyle={{ fontWeight: 700, color: "#0f172a", marginBottom: 4 }}
                formatter={(value, name) => [nf.format(Number(value)), String(name)]}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: 8 }} iconType="circle" iconSize={8} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="clicks"
                stroke="#f97316"
                strokeWidth={2.5}
                fill="url(#atbClicksGradient)"
                name="Clics"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="impressions"
                stroke="#3b82f6"
                strokeWidth={2.5}
                name="Impressions"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
