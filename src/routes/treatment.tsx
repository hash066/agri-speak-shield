import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Leaf, ShieldAlert, Calendar, IndianRupee, AlertTriangle, Droplets, Sprout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/treatment")({
  head: () => ({ meta: [{ title: "Treatment — AgriShield AI" }] }),
  component: TreatmentPage,
});

function TreatmentPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-10">
      <header className="mb-6">
        <Badge variant="secondary" className="mb-2">Tomato · Late Blight</Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Treatment Recommendation</h1>
        <p className="text-muted-foreground">Personalized advisory based on your last scan.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-gradient-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><Leaf className="h-5 w-5 text-primary" /> Disease overview</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p><strong>Late Blight</strong> is a fast-spreading fungal disease (Phytophthora infestans) that thrives in cool, humid conditions. Left untreated it can destroy entire tomato and potato crops within days.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Stat label="Pathogen" value="Phytophthora infestans" />
              <Stat label="Spread speed" value="Very fast" />
              <Stat label="Optimal temp" value="15–25°C" />
              <Stat label="Humidity" value=">80%" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-5 w-5 text-warning" /> Safety first</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Always wear gloves, mask & long sleeves while spraying.</p>
            <p>Do not exceed recommended dose — overuse harms soil and pollinators.</p>
            <p>Wait 14 days after final spray before harvest.</p>
          </CardContent>
        </Card>
      </div>

      <Accordion type="multiple" defaultValue={["symptoms", "chem"]} className="mt-6 space-y-3">
        <Item value="symptoms" icon={Sprout} title="Common symptoms">
          <ul className="ml-5 list-disc space-y-1.5 text-sm">
            <li>Dark, water-soaked spots on leaf margins</li>
            <li>White fungal growth on underside of leaves in humid mornings</li>
            <li>Brown lesions on stems and fruit</li>
            <li>Rapid wilting of entire branches</li>
          </ul>
        </Item>

        <Item value="chem" icon={FlaskConical} title="Recommended fungicides">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Copper oxychloride 50% WP", dose: "3 g / litre water", interval: "7–10 days" },
              { name: "Metalaxyl + Mancozeb", dose: "2.5 g / litre", interval: "10–14 days" },
              { name: "Chlorothalonil 75% WP", dose: "2 g / litre", interval: "7 days" },
            ].map((f) => (
              <div key={f.name} className="rounded-xl border bg-card p-4">
                <div className="font-medium">{f.name}</div>
                <div className="mt-2 text-xs text-muted-foreground"><Droplets className="mr-1 inline h-3 w-3" />Dose: {f.dose}</div>
                <div className="text-xs text-muted-foreground"><Calendar className="mr-1 inline h-3 w-3" />Interval: {f.interval}</div>
              </div>
            ))}
          </div>
        </Item>

        <Item value="org" icon={Leaf} title="Organic alternatives">
          <ul className="space-y-2 text-sm">
            <li><strong>Neem oil spray</strong> — 5 ml / litre, every 5–7 days.</li>
            <li><strong>Cow urine + garlic extract</strong> — natural antifungal.</li>
            <li><strong>Trichoderma viride</strong> soil application before planting.</li>
            <li><strong>Bordeaux mixture</strong> 1% — traditional copper-lime preventive.</li>
          </ul>
        </Item>

        <Item value="prev" icon={ShieldAlert} title="Prevention tips">
          <ul className="ml-5 list-disc space-y-1.5 text-sm">
            <li>Use resistant varieties whenever possible.</li>
            <li>Maintain proper plant spacing for airflow.</li>
            <li>Avoid overhead watering; drip irrigate early morning.</li>
            <li>Rotate crops every 2–3 seasons.</li>
            <li>Remove and destroy infected debris — do not compost.</li>
          </ul>
        </Item>

        <Item value="cost" icon={IndianRupee} title="Estimated cost (per acre)">
          <div className="grid gap-2 text-sm sm:grid-cols-3">
            <Stat label="Chemical" value="₹ 800 – 1,200" />
            <Stat label="Organic" value="₹ 350 – 600" />
            <Stat label="Labour" value="₹ 400 – 700" />
          </div>
        </Item>
      </Accordion>
    </div>
  );
}

function Item({ value, icon: Icon, title, children }: { value: string; icon: typeof Leaf; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={value} className="rounded-2xl border bg-card px-4">
      <AccordionTrigger className="hover:no-underline">
        <span className="flex items-center gap-2.5 text-left font-medium"><Icon className="h-4 w-4 text-primary" /> {title}</span>
      </AccordionTrigger>
      <AccordionContent className="pt-1">{children}</AccordionContent>
    </AccordionItem>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/60 px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
