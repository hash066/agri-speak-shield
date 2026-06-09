import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Globe, MapPin, Moon, Shield } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — AgriShield AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground">Customize your AgriShield experience.</p>
      </header>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Globe className="h-4 w-4 text-primary" /> Language & Region</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Row label="App language">
              <Select defaultValue="en">
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Voice language">
              <Select defaultValue="auto">
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kn">Kannada</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </Row>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-primary" /> Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Toggle id="alerts" label="Outbreak alerts" defaultChecked />
            <Toggle id="weather" label="Daily weather risk" defaultChecked />
            <Toggle id="tips" label="Weekly farming tips" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MapPin className="h-4 w-4 text-primary" /> Farm location</CardTitle></CardHeader>
          <CardContent>
            <Row label="Region"><span className="text-sm text-muted-foreground">Mysuru, Karnataka</span></Row>
            <Button variant="outline" size="sm" className="mt-3">Update location</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Moon className="h-4 w-4 text-primary" /> Appearance</CardTitle></CardHeader>
          <CardContent>
            <Toggle id="dark" label="Dark mode (use top-right toggle)" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Shield className="h-4 w-4 text-primary" /> Privacy</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Toggle id="share" label="Share anonymous scans to improve AI" defaultChecked />
            <Toggle id="loc" label="Use location for risk forecasts" defaultChecked />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
function Toggle({ id, label, defaultChecked }: { id: string; label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  );
}
