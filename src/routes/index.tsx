import { createFileRoute, Link } from "@tanstack/react-router";
import { ScanLine, Mic, ShieldCheck, Languages, Activity, FlaskConical, Leaf, ArrowRight, Camera, BarChart3, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-agri.jpg";
import { supportedCrops, testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriShield AI — Early fungal disease detection for crops" },
      { name: "description", content: "Scan crop leaves, detect disease early, and chat with a multilingual voice AI in Kannada, Hindi & English." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-powered farm intelligence
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                AgriShield <span className="text-gradient">AI</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                Early fungal disease detection and multilingual farm support — built for farmers.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow">
                  <Link to="/scan"><Camera className="mr-2 h-4 w-4" /> Scan Crop</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/voice"><Mic className="mr-2 h-4 w-4" /> Talk to AI</Link>
                </Button>
              </div>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {[
                  "Detect fungal disease from leaf images",
                  "Multilingual voice chatbot",
                  "Early outbreak risk prediction",
                  "Treatment & prevention guidance",
                  "Farmer-friendly interface",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
              <img
                src={heroImg}
                alt="AgriShield AI crop intelligence dashboard"
                width={1536} height={1024}
                className="relative rounded-3xl border shadow-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section title="How it works" subtitle="Three simple steps from photo to action">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Camera, title: "1. Capture", desc: "Take or upload a leaf photo from your phone." },
            { icon: ScanLine, title: "2. Analyze", desc: "AI identifies disease, severity, and spread risk." },
            { icon: FlaskConical, title: "3. Act", desc: "Receive treatment plan in your language." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="bg-gradient-card border-border/60">
              <CardContent className="p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Supported crops */}
      <Section title="Supported crops" subtitle="Trained on common Indian crops & global staples">
        <div className="flex flex-wrap gap-2">
          {supportedCrops.map((c) => (
            <span key={c.name} className="rounded-full border bg-card px-4 py-2 text-sm shadow-soft">
              <span className="mr-1.5">{c.emoji}</span>{c.name}
            </span>
          ))}
        </div>
      </Section>

      {/* Features grid */}
      <Section title="Why early detection matters">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Save the harvest", desc: "Catch disease before it spreads field-wide." },
            { icon: Languages, title: "In your language", desc: "Kannada, Hindi & English — voice and text." },
            { icon: Activity, title: "Weather-aware", desc: "Risk scoring from humidity, temp & rainfall." },
            { icon: Leaf, title: "Safer treatments", desc: "Organic alternatives & safe dosing." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardContent className="p-5">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Multilingual */}
      <Section title="Multilingual support" subtitle="Talk naturally — switch languages mid-sentence">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { lang: "ಕನ್ನಡ", name: "Kannada", sample: "ಎಲೆಯಲ್ಲಿ ರೋಗ ಇದೆಯೇ?" },
            { lang: "हिन्दी", name: "Hindi", sample: "पत्ती में बीमारी है क्या?" },
            { lang: "English", name: "English", sample: "What's wrong with this leaf?" },
          ].map((l) => (
            <Card key={l.name} className="bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-gradient">{l.lang}</div>
                <div className="mt-1 text-sm font-medium">{l.name}</div>
                <p className="mt-3 text-sm text-muted-foreground italic">"{l.sample}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section title="Trusted by farmers & experts">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-gradient-card">
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow sm:p-12">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Protect your next harvest</h2>
              <p className="mt-2 text-primary-foreground/85">Start scanning crops in under 10 seconds.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/scan">Scan Crop <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10">
                <Link to="/dashboard"><BarChart3 className="mr-2 h-4 w-4" /> View dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 AgriShield AI — Built for farmers everywhere.
      </footer>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
