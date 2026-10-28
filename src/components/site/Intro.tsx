import { useEffect, useState } from "react";

// Logo "unlock" intro: logo draws in, a counter loads, then the screen splits open.
export function Intro({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"load" | "lock" | "open" | "gone">("load");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 2200);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPhase("lock");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase === "lock") {
      const t = setTimeout(() => setPhase("open"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "open") {
      onDone();
      const t = setTimeout(() => {
        setPhase("gone");
        document.body.style.overflow = "";
      }, 1300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, onDone]);

  if (phase === "gone") return null;
  const open = phase === "open";
  const ease = "cubic-bezier(.8,0,.1,1)";

  return (
    <div className="fixed inset-0 z-[90] cursor-pointer" onClick={() => phase === "lock" && setPhase("open")}>
      {/* two shutters */}
      {(["top", "bottom"] as const).map((s) => (
        <div
          key={s}
          className={`absolute inset-x-0 h-1/2 overflow-hidden bg-paper ${s === "top" ? "top-0 border-b" : "bottom-0"}`}
          style={{ transform: open ? `translateY(${s === "top" ? "-100%" : "100%"})` : "none", transition: `transform 1.2s ${ease}` }}
        >
          <div className="absolute inset-0 grid-lines opacity-60" />
          <div
            className="absolute inset-x-0 mx-auto w-[min(70vw,520px)]"
            style={{ top: s === "top" ? "100%" : "0", transform: "translateY(-50%)" }}
          >
            <img
              src="/assets/bia-consulting-full.png"
              width={530}
              height={355}
              alt="BIA Consulting"
              className="w-full select-none"
              draggable={false}
              style={{
                clipPath: `inset(0 ${100 - pct}% 0 0)`,
                transform: phase === "lock" ? "scale(1.04)" : "scale(1)",
                transition: "transform .9s cubic-bezier(.2,.7,.1,1)",
              }}
            />
          </div>
        </div>
      ))}

      {/* HUD */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:p-10" style={{ opacity: open ? 0 : 1, transition: "opacity .4s" }}>
        <div className="flex justify-between">
          <span>BIA Consulting / Sales Growth</span>
          <span>Houston, TX — 29.76°N 95.36°W</span>
        </div>
        <div className="flex items-end justify-between">
          <span>
            {phase === "lock" ? "Access granted" : "Authenticating"}
            <span className="animate-blink">_</span>
          </span>
          <span className="font-display text-6xl font-light tracking-tight text-ink md:text-8xl tabular-nums">
            {String(pct).padStart(3, "0")}
          </span>
        </div>
      </div>
      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-signal/10 to-transparent animate-scan" style={{ opacity: open ? 0 : 1 }} />
    </div>
  );
}
