import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Download, Calendar, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reports } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Saved reports — AgriShield AI" }] }),
  component: ReportsPage,
});

const filters = ["All", "Healthy", "Mild", "Moderate", "Severe"];

function ReportsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const list = reports.filter((r) =>
    (filter === "All" || r.severity === filter) &&
    (r.crop.toLowerCase().includes(q.toLowerCase()) || r.disease.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Saved Reports</h1>
        <p className="text-muted-foreground">Your scan and conversation history.</p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by crop or disease…" className="pl-9" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">
          <Leaf className="mx-auto mb-3 h-10 w-10 opacity-40" />
          No reports match your filter.
        </CardContent></Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((r) => (
            <Card key={r.id} className="bg-gradient-card transition-shadow hover:shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">{r.id}</div>
                    <div className="mt-0.5 text-lg font-semibold">{r.disease}</div>
                    <div className="text-sm text-muted-foreground">{r.crop}</div>
                  </div>
                  <SeverityBadge level={r.severity} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Date</div>
                    <div className="font-medium"><Calendar className="mr-1 inline h-3 w-3" />{r.date}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Confidence</div>
                    <div className="font-medium">{r.confidence}%</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Action taken</div>
                    <div className="font-medium">{r.action}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full"><Download className="mr-2 h-3.5 w-3.5" /> Download summary</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Healthy: "bg-success text-success-foreground",
    Mild: "bg-info text-info-foreground",
    Moderate: "bg-warning text-warning-foreground",
    Severe: "bg-destructive text-destructive-foreground",
  };
  return <Badge className={map[level] || ""}>{level}</Badge>;
}
