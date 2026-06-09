import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ScanLine, MessageSquare, Award, MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — AgriShield AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-10">
      <Card className="bg-gradient-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-primary text-3xl font-bold text-primary-foreground shadow-glow">
              RK
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h1 className="text-2xl font-bold tracking-tight">Ramesh Kumar</h1>
                <Badge variant="secondary">Verified farmer</Badge>
              </div>
              <p className="mt-1 text-muted-foreground">Tomato & potato grower · 3.2 acres</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Mysuru, Karnataka</span>
                <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> +91 98xxxxxx12</span>
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> ramesh@example.com</span>
              </div>
            </div>
            <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard icon={ScanLine} label="Scans" value="47" />
        <StatCard icon={MessageSquare} label="Conversations" value="128" />
        <StatCard icon={Award} label="Healthy crops" value="62%" />
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { t: "Scanned tomato leaf — Late Blight detected", d: "Today, 10:42 AM" },
            { t: "Voice chat about preventive spraying", d: "Yesterday" },
            { t: "Downloaded treatment report R-1041", d: "2 days ago" },
            { t: "Updated farm location", d: "Last week" },
          ].map((a) => (
            <div key={a.t} className="flex items-start justify-between gap-3 rounded-lg border bg-card p-3 text-sm">
              <span>{a.t}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{a.d}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild className="bg-gradient-primary text-primary-foreground"><Link to="/scan">New scan</Link></Button>
        <Button asChild variant="outline"><Link to="/reports">View reports</Link></Button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof ScanLine; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <Icon className="h-5 w-5 text-primary" />
        <div className="mt-2 text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
