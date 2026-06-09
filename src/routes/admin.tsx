import { createFileRoute } from "@tanstack/react-router";
import { Users, ScanLine, MessageSquare, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { adminStats } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — AgriShield AI" }] }),
  component: AdminPage,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function AdminPage() {
  const s = adminStats;
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform usage and disease intelligence.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Users} label="Total users" value={s.users.toLocaleString()} delta="+8.2%" />
        <Stat icon={ScanLine} label="Total scans" value={s.scans.toLocaleString()} delta="+12.4%" />
        <Stat icon={MessageSquare} label="Conversations" value={s.conversations.toLocaleString()} delta="+5.6%" />
        <Stat icon={AlertTriangle} label="Active alerts" value={s.alerts.toString()} delta="+3" tone="warning" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Popular crops scanned</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={s.popularCrops}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="crop" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="scans" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Disease distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={s.diseaseDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {s.diseaseDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Conversations by language</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {s.languageUsage.map((l) => (
              <div key={l.language}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{l.language}</span><span className="text-muted-foreground">{l.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-gradient-primary" style={{ width: `${l.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { region: "Mysuru", disease: "Late Blight", level: "High" },
              { region: "Hassan", disease: "Powdery Mildew", level: "Moderate" },
              { region: "Mandya", disease: "Rust", level: "High" },
              { region: "Tumkur", disease: "Downy Mildew", level: "Low" },
            ].map((a) => (
              <div key={a.region} className="flex items-center justify-between rounded-xl border bg-card p-3">
                <div>
                  <div className="font-medium">{a.region}</div>
                  <div className="text-xs text-muted-foreground">{a.disease}</div>
                </div>
                <Badge className={a.level === "High" ? "bg-destructive text-destructive-foreground" : a.level === "Moderate" ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}>
                  {a.level}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, delta, tone = "primary" }: { icon: typeof Users; label: string; value: string; delta: string; tone?: "primary" | "warning" }) {
  return (
    <Card className="bg-gradient-card">
      <CardContent className="p-5">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone === "warning" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-1 text-[11px] font-medium text-success">{delta} vs last week</div>
      </CardContent>
    </Card>
  );
}
