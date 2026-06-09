import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, ScanLine, Mic, Activity, FlaskConical, FolderClock, ShieldCheck, Settings, User, Menu, Moon, Sun } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Leaf },
  { to: "/scan", label: "Scan", icon: ScanLine },
  { to: "/voice", label: "Voice", icon: Mic },
  { to: "/dashboard", label: "Risk", icon: Activity },
  { to: "/treatment", label: "Treatment", icon: FlaskConical },
  { to: "/reports", label: "Reports", icon: FolderClock },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
] as const;

const tail = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar (mobile) */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-2 border-b bg-background/80 px-4 py-3 backdrop-blur">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-soft">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">AgriShield AI</span>
        </Link>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="lg:flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex sticky top-0 h-screen w-64 flex-col border-r bg-sidebar p-4">
          <Link to="/" className="mb-6 flex items-center gap-2 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-soft">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold tracking-tight">AgriShield AI</div>
              <div className="text-xs text-muted-foreground">Crop intelligence</div>
            </div>
          </Link>
          <nav className="flex-1 space-y-1">
            {nav.map((n) => (
              <NavItem key={n.to} {...n} active={isActive(n.to)} />
            ))}
          </nav>
          <div className="mt-4 space-y-1 border-t pt-3">
            {tail.map((n) => <NavItem key={n.to} {...n} active={isActive(n.to)} />)}
            <button
              onClick={() => setDark((d) => !d)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <aside className="relative ml-auto h-full w-72 bg-sidebar p-4 shadow-glow animate-slide-in-right">
              <div className="mb-4 flex items-center gap-2 px-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">AgriShield AI</span>
              </div>
              <nav className="space-y-1">
                {[...nav, ...tail].map((n) => <NavItem key={n.to} {...n} active={isActive(n.to)} />)}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 min-w-0 pb-24 lg:pb-0">{children}</main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t bg-background/90 backdrop-blur">
        <div className="grid grid-cols-5">
          {nav.slice(0, 5).map((n) => {
            const Icon = n.icon;
            const active = isActive(n.to);
            return (
              <Link key={n.to} to={n.to} className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px]",
                active ? "text-primary" : "text-muted-foreground"
              )}>
                <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_8px_var(--primary)]")} />
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, label, icon: Icon, active }: { to: string; label: string; icon: typeof Leaf; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-gradient-primary text-primary-foreground shadow-soft"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
