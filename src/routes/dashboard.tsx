import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Thermometer, CloudRain, Wind, AlertTriangle, Leaf, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { weatherRisk } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Risk dashboard — AgriShield AI" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const r = weatherRisk;
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Risk Dashboard</h1>
          <p className="text-muted-foreground">Live fungal disease risk for your farm.</p>
        </div>
        <Badge variant="secondary" className="rounded-full">Mysuru, Karnataka · Today</Badge>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Risk gauge */}
        <Card className="lg:col-span-1 bg-gradient-card">
          <CardHeader><CardTitle>Fungal risk score</CardTitle></CardHeader>
          <CardContent>
            <Gauge value={r.score} />
            <div className="mt-4 text-center">
              <Badge className="bg-warning text-warning-foreground">{r.level} risk</Badge>
              <p className="mt-3 text-sm text-muted-foreground">
                High humidity combined with moderate temperatures creates favorable conditions for fungal outbreaks today.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trend */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>7-day risk trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={r.trend}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="risk" stroke="var(--primary)" strokeWidth={2.5} fill="url(#riskGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Droplets} label="Humidity" value={`${r.humidity}%`} hint="Very high" tone="warning" />
        <Metric icon={Thermometer} label="Temperature" value={`${r.temperature}°C`} hint="Optimal for fungi" tone="warning" />
        <Metric icon={CloudRain} label="Rainfall (24h)" value={`${r.rainfall} mm`} hint="Light showers" tone="info" />
        <Metric icon={Wind} label="Wind speed" value={`${r.wind} km/h`} hint="Calm" tone="success" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Leaf className="h-5 w-5 text-primary" /> Likely diseases</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {r.likelyDiseases.map((d) => (
              <div key={d.name}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-muted-foreground">{d.probability}%</span>
                </div>
                <Progress value={d.probability} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" /> Recommended action today</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> Inspect tomato & potato fields for early lesions.</li>
              <li className="flex gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> Apply preventive copper-based spray on susceptible crops.</li>
              <li className="flex gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> Avoid overhead irrigation in the evening.</li>
              <li className="flex gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> Improve field drainage where water is pooling.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, hint, tone }: { icon: typeof Droplets; label: string; value: string; hint: string; tone: "success" | "warning" | "info" }) {
  const toneClass = { success: "text-success", warning: "text-warning", info: "text-info" }[tone];
  return (
    <Card className="bg-gradient-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className={`grid h-10 w-10 place-items-center rounded-xl bg-secondary ${toneClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`mt-1 text-[11px] font-medium ${toneClass}`}>{hint}</div>
      </CardContent>
    </Card>
  );
}

function Gauge({ value }: { value: number }) {
  const angle = (value / 100) * 180;
  return (
    <div className="relative mx-auto h-36 w-64">
      <svg viewBox="0 0 200 110" className="h-full w-full">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.62 0.17 150)" />
            <stop offset="0.5" stopColor="oklch(0.78 0.16 75)" />
            <stop offset="1" stopColor="oklch(0.58 0.22 25)" />
          </linearGradient>
        </defs>
        <path d="M10 100 A 90 90 0 0 1 190 100" stroke="var(--secondary)" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M10 100 A 90 90 0 0 1 190 100" stroke="url(#g)" strokeWidth="16" fill="none" strokeLinecap="round"
          strokeDasharray="283" strokeDashoffset={283 - (283 * value) / 100} />
        <g transform={`rotate(${angle - 90} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="25" stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill="var(--foreground)" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-4xl font-bold text-gradient">{value}</div>
        <div className="text-xs text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}
