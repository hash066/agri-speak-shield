import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, Languages, Sparkles, Volume2, Bot, User, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/voice")({
  head: () => ({ meta: [{ title: "Voice assistant — AgriShield AI" }] }),
  component: VoicePage,
});

type Msg = { id: number; role: "user" | "bot"; text: string; time: string };
type MicStatus = "idle" | "listening" | "processing" | "speaking";

const suggestions = [
  "What disease is this?",
  "How serious is it?",
  "How do I treat it?",
  "Will it spread?",
  "Give advice in Kannada",
  "Give advice in Hindi",
];

const sampleReplies = [
  "Based on what you described, it sounds like early-stage Late Blight. I recommend removing affected leaves and applying a copper-based fungicide within 24 hours.",
  "ಇದು ಲೇಟ್ ಬ್ಲೈಟ್ ಇರಬಹುದು. ಮೊದಲು ಪೀಡಿತ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ ಮತ್ತು ತಾಮ್ರ ಆಧಾರಿತ ಫಂಗಿಸೈಡ್ ಸಿಂಪಡಿಸಿ.",
  "यह संभवतः लेट ब्लाइट है। प्रभावित पत्तियाँ हटा दें और 24 घंटे में कॉपर फंगिसाइड का छिड़काव करें।",
];

function VoicePage() {
  const [lang, setLang] = useState("auto");
  const [expert, setExpert] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [mic, setMic] = useState<MicStatus>("idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, role: "bot", text: "Namaste! 🌾 I'm your AgriShield assistant. Ask me about crop diseases, treatments, or prevention.", time: now() },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [messages, mic]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text, time: now() }]);
    setInput("");
    setMic("processing");
    setTimeout(() => {
      setMic("speaking");
      const reply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
      setMessages((m) => [...m, { id: Date.now() + 1, role: "bot", text: reply, time: now() }]);
      setTimeout(() => setMic("idle"), 1800);
    }, 900);
  };

  const toggleMic = () => {
    if (mic === "listening") {
      setMic("idle");
      send("How do I treat late blight on my tomato plants?");
    } else {
      setMic("listening");
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 py-4 lg:h-screen lg:py-6">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Voice Assistant</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> Online · Multilingual
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-[140px]"><Languages className="mr-1.5 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
          <label className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Expert
            <Switch checked={expert} onCheckedChange={setExpert} />
          </label>
        </div>
      </div>

      {/* Chat */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "bot" && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={cn("max-w-[80%] space-y-1", m.role === "user" && "items-end")}>
                <div className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                )}>
                  {m.text}
                </div>
                <div className={cn("flex items-center gap-1.5 text-[10px] text-muted-foreground", m.role === "user" && "justify-end")}>
                  <span>{m.time}</span>
                  {m.role === "bot" && <button className="hover:text-primary"><Volume2 className="h-3 w-3" /></button>}
                </div>
              </div>
              {m.role === "user" && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {(mic === "processing" || mic === "speaking") && (
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground"><Bot className="h-4 w-4" /></div>
              <div className="rounded-2xl bg-secondary px-4 py-3">
                <Waveform />
              </div>
            </div>
          )}
        </div>

        {/* Quick suggestions */}
        <div className="border-t bg-muted/30 p-3">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Mic / input */}
          {textMode ? (
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" />
              <Button type="submit" size="icon" className="bg-gradient-primary text-primary-foreground shrink-0"><Send className="h-4 w-4" /></Button>
              <Button type="button" size="icon" variant="outline" onClick={() => setTextMode(false)} className="shrink-0"><Mic className="h-4 w-4" /></Button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                {mic === "listening" && <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />}
                <button
                  onClick={toggleMic}
                  className={cn(
                    "relative grid h-16 w-16 place-items-center rounded-full shadow-glow transition-all",
                    mic === "listening" ? "bg-destructive text-destructive-foreground scale-110" : "bg-gradient-primary text-primary-foreground"
                  )}
                  aria-label="Toggle microphone"
                >
                  {mic === "listening" ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="secondary" className="font-normal">
                  {mic === "idle" && "Tap to speak"}
                  {mic === "listening" && "Listening…"}
                  {mic === "processing" && "Processing…"}
                  {mic === "speaking" && "Speaking…"}
                </Badge>
                <button onClick={() => setTextMode(true)} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                  <Keyboard className="h-3.5 w-3.5" /> Use keyboard
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function Waveform() {
  return (
    <div className="flex h-6 items-center gap-1">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="block h-full w-1 origin-center rounded-full bg-primary animate-wave"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
