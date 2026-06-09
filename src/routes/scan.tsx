import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, Camera, ImageIcon, X, Loader2, AlertTriangle, CheckCircle2, Sparkles, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { diseaseResult } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/scan")({
  head: () => ({ meta: [{ title: "Scan crop — AgriShield AI" }, { name: "description", content: "Upload or capture a leaf photo to detect fungal disease." }] }),
  component: ScanPage,
});

type Stage = "idle" | "preview" | "analyzing" | "result";

function ScanPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);

  const onFile = (f?: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImage(url);
    setStage("preview");
  };

  const analyze = () => {
    setStage("analyzing");
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); setStage("result"); toast.success("Analysis complete"); return 100; }
        return p + 8;
      });
    }, 150);
  };

  const reset = () => { setStage("idle"); setImage(null); setProgress(0); };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Disease Detection</h1>
        <p className="text-muted-foreground">Upload or capture a clear photo of an affected leaf.</p>
      </header>

      {stage === "idle" && (
        <Card className="bg-gradient-card">
          <CardContent
            className="p-8"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}
          >
            <div className="grid place-items-center rounded-2xl border-2 border-dashed border-border p-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                <ImageIcon className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">Drag & drop a leaf image</h2>
              <p className="mt-1 text-sm text-muted-foreground">JPG / PNG up to 10MB</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={() => fileRef.current?.click()} className="bg-gradient-primary text-primary-foreground shadow-soft">
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
                <Button onClick={() => camRef.current?.click()} variant="outline">
                  <Camera className="mr-2 h-4 w-4" /> Take photo
                </Button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
              <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onFile(e.target.files?.[0])} />
            </div>
          </CardContent>
        </Card>
      )}

      {(stage === "preview" || stage === "analyzing") && image && (
        <Card>
          <CardContent className="p-4">
            <div className="relative overflow-hidden rounded-xl">
              <img src={image} alt="Leaf preview" className="aspect-video w-full object-cover" />
              {stage === "analyzing" && (
                <div className="absolute inset-0 grid place-items-center bg-foreground/40 backdrop-blur-sm">
                  <div className="rounded-2xl bg-card p-6 text-center shadow-glow">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-3 font-medium">Analyzing leaf…</p>
                    <Progress value={progress} className="mt-3 w-56" />
                    <p className="mt-1 text-xs text-muted-foreground">{progress}%</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={analyze} disabled={stage === "analyzing"} className="bg-gradient-primary text-primary-foreground shadow-soft">
                <Sparkles className="mr-2 h-4 w-4" /> Analyze
              </Button>
              <Button onClick={reset} variant="outline"><X className="mr-2 h-4 w-4" /> Replace</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {stage === "result" && image && (
        <div className="grid gap-4 lg:grid-cols-3 animate-fade-in">
          <Card className="lg:col-span-2 bg-gradient-card">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-warning text-warning-foreground">{diseaseResult.severity}</Badge>
                <CardTitle className="text-2xl">{diseaseResult.name}</CardTitle>
                <p className="text-sm italic text-muted-foreground">{diseaseResult.scientific}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient">{diseaseResult.confidence}%</div>
                <div className="text-xs text-muted-foreground">confidence</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <img src={image} alt="Analyzed leaf" className="aspect-video w-full rounded-xl object-cover" />
              <p className="text-sm leading-relaxed">{diseaseResult.summary}</p>

              <div>
                <div className="mb-2 flex justify-between text-xs font-medium">
                  <span>Severity meter</span>
                  <span className="text-warning">Moderate</span>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="bg-success" style={{ width: "20%" }} />
                  <div className="bg-warning" style={{ width: "40%" }} />
                  <div className="bg-destructive" style={{ width: "10%" }} />
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Other possibilities</h4>
                <div className="flex flex-wrap gap-2">
                  {diseaseResult.alternatives.map((a) => (
                    <span key={a.name} className="rounded-full border bg-background px-3 py-1 text-xs">
                      {a.name} · {a.confidence}%
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Why the model thinks this</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {diseaseResult.reasons.map((r) => (
                    <li key={r} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{r}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-warning/50 bg-warning/5">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> What to do now</CardTitle></CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm">
                  {diseaseResult.actions.map((a, i) => (
                    <li key={a} className="flex gap-2">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Wind className="h-5 w-5 text-info" />
                <div className="text-sm">
                  <div className="font-medium">Spread risk: Elevated</div>
                  <div className="text-xs text-muted-foreground">Humidity is favorable for fungal growth.</div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={reset} variant="outline" className="w-full">Scan another</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const _cn = cn;
