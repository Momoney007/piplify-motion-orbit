import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Lines({ lines, className = "", delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className={`mask-line ${inView ? "in" : ""} block`}>
          <span style={{ transitionDelay: `${delay + i * 110}ms` }}>{l}</span>
        </span>
      ))}
    </div>
  );
}

export function Counter({ to, prefix = "", suffix = "", duration = 1800 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Magnetic({ children, className = "", href }: { children: ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href={href}
      data-cursor="hover"
      className={className}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        ref.current!.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      }}
      onMouseLeave={() => (ref.current!.style.transform = "")}
      style={{ transition: "transform .35s cubic-bezier(.2,.7,.1,1)" }}
    >
      {children}
    </a>
  );
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, big = false, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      big = !!(e.target as HTMLElement).closest("a,button,[data-cursor]");
    };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${big ? 2.2 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-1.5 w-1.5 bg-ink [@media(pointer:fine)]:block" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-9 w-9 rounded-full border border-ink/60 mix-blend-difference transition-[width,height] duration-300 [@media(pointer:fine)]:block" />
    </>
  );
}
