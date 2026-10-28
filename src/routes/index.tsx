import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Intro } from "@/components/site/Intro";
import { Counter, Cursor, Lines, Magnetic, Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BIA Consulting — Build, train & scale your sales team" },
      { name: "description", content: "Fractional sales & business development. We place SDRs, BDRs and AEs, train your team, clean your pipeline, define your ICP and generate leads." },
      { property: "og:title", content: "BIA Consulting — Building Better Businesses" },
      { property: "og:description", content: "Fractional sales leadership, embedded reps, team training, pipeline cleanup and lead generation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const BOOK = "https://calendly.com/mominyabbas2/30min";
const LINKEDIN = "https://www.linkedin.com/company/144044597/";
const EMAIL = "documatesolution@gmail.com";

const services = [
  { n: "Fractional reps", d: "We place SDRs, BDRs and AEs inside your business — trained, managed and producing from week one. No 90-day ramp, no recruiting fees.", tag: "SDR · BDR · AE" },
  { n: "Sales team build-out", d: "Org design, hiring profiles, comp plans and interviews. We build the team you'll keep, the right way, the first time.", tag: "Structure" },
  { n: "Team training", d: "Live coaching on discovery, objection handling, cold calling and closing. Playbooks your reps actually use.", tag: "Enablement" },
  { n: "Pipeline cleanup", d: "We audit your CRM, kill dead deals, fix stages and forecasting, so the number you see is the number you'll hit.", tag: "CRM · Forecast" },
  { n: "Lead generation", d: "Multichannel outbound — email, phone, LinkedIn — aimed at buyers who can say yes.", tag: "Outbound" },
  { n: "ICP & strategy", d: "We find who buys fastest, pays most and stays longest — then point your entire team at them.", tag: "Targeting" },
];

const steps = [
  ["Diagnose", "2 weeks", "We sit in your calls, read your CRM, interview your reps. You get a no-nonsense report on what's broken."],
  ["Define", "Week 3", "ICP, messaging, process and the metrics that matter. One playbook, one source of truth."],
  ["Deploy", "Month 2", "Fractional reps go live, your team gets trained, the pipeline gets cleaned."],
  ["Scale", "Ongoing", "We double down on what works, hand off what's ready, and build until you can run it without us."],
];

const compare = [
  ["Time to productive", "2 – 4 weeks", "3 – 6 months", "Never, if it's the wrong hire"],
  ["Cost", "Fraction of a full team", "$80k – $150k+ per rep, loaded", "$20k – $40k recruiting fee"],
  ["Training & playbook", "Included", "You build it", "Not included"],
  ["Management", "We manage the reps", "Your time", "Your time"],
  ["Risk", "Flexible, scale up or down", "Severance, rehiring", "Replacement clause, maybe"],
];

function Index() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  const [scroll, setScroll] = useState(0);
  const [max, setMax] = useState(1);
  useEffect(() => {
    const on = () => {
      setScroll(scrollY);
      setMax(Math.max(1, document.body.scrollHeight - innerHeight));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <div className="grain cursor-none-fine relative min-h-screen">
      <Intro onDone={done} />
      <Cursor />
      <div className="fixed left-0 top-0 z-[70] h-[2px] bg-ink" style={{ width: `${(scroll / max) * 100}%` }} />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12">
          <a href="#top" className="flex items-center gap-3">
            <img src="/assets/bia-consulting-mark.png" alt="BIA Consulting" width={480} height={200} className="h-7 w-auto max-w-[34vw] object-contain" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">Consulting</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            {["Services", "Process", "Compare", "About"].map((l, i) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="group relative text-muted-foreground transition-colors hover:text-ink">
                <span className="mr-1 text-steel">0{i + 1}</span>
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <Magnetic href={BOOK} className="rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
            Book a call →
          </Magnetic>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-14 pt-32 md:px-12">
        <div className="absolute inset-0 grid-lines" style={{ transform: `translateY(${scroll * 0.2}px)` }} />
        <svg className="animate-float-tri absolute right-[6%] top-[18%] w-[38vw] max-w-[520px] text-ink" viewBox="0 0 100 90" fill="none" style={{ translate: `0 ${scroll * -0.15}px` }}>
          <path d="M50 2 L98 88 H2 Z" stroke="currentColor" strokeWidth=".25" />
          <path d="M50 22 L84 82 H16 Z" stroke="currentColor" strokeWidth=".25" strokeDasharray="1 1.5" />
          <path d="M58 48 L72 76 H44 Z" fill="var(--steel)" opacity=".55" />
        </svg>
        <div className="absolute right-6 top-28 hidden text-right font-mono text-[10px] uppercase leading-5 tracking-[0.2em] text-muted-foreground md:block">
          Fractional sales & business development<br />Houston, TX — working nationwide<br />
          <span className="text-ink">● Taking new partners</span>
        </div>

        {ready && (
          <div className="relative">
            <Lines
              className="font-display text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.04em] md:text-[11.5vw]"
              lines={[
                <span className="font-narrow">We build</span>,
                <span className="text-outline font-wide font-light">sales teams</span>,
                <span className="font-narrow">that close<span className="text-steel">.</span></span>,
              ]}
            />
            <Reveal delay={500} className="mt-10 grid gap-8 border-t pt-8 md:grid-cols-12">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:col-span-5">
                Your fractional sales department. We place SDRs, BDRs and AEs, train the team you have, clean up your pipeline and point everyone at the buyers who actually buy.
              </p>
              <div className="grid grid-cols-3 gap-6 md:col-span-5 md:col-start-8">
                {[
                  [<Counter to={3} suffix="×" />, "Pipeline growth"],
                  [<Counter to={30} suffix=" days" />, "To first hire live"],
                  [<Counter to={40} suffix="%" />, "Less than full-time"],
                ].map(([v, l], i) => (
                  <div key={i}>
                    <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{v}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y bg-ink py-5 text-paper">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl font-light uppercase tracking-tight md:text-5xl">
          {[...services, ...services].map((n, i) => (
            <span key={i} className="flex items-center gap-12">
              {n.n} <span className="text-steel">▲</span>
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="px-6 py-32 md:px-12 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(00) — The real problem</div>
          <div className="md:col-span-9">
            <Lines
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl"
              lines={["Your product isn't the problem.", <span className="text-steel">Your sales engine is.</span>]}
            />
            <Reveal delay={200} className="mt-12 grid gap-10 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-muted-foreground">
                The founder is still the best closer. Reps ramp for six months, then leave. The CRM is full of deals that died in March. Nobody can say who your ideal customer actually is.
              </p>
              <p className="text-lg leading-relaxed text-ink">
                You don't need more tools. You need <em className="font-semibold not-italic underline decoration-steel decoration-2 underline-offset-4">people, process and a playbook</em> — built by operators who've done it before.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t px-6 py-32 md:px-12">
        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(01) — What we do</div>
          <div className="md:col-span-9">
            <Lines className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl" lines={["Six ways we grow", <span className="text-steel">your revenue.</span>]} />
          </div>
        </div>
        <ul className="border-t">
          {services.map((n, i) => (
            <li key={n.n} data-cursor="hover" className="group relative overflow-hidden border-b">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.1,1)] group-hover:scale-y-100" />
              <div className="relative grid grid-cols-12 items-center gap-4 py-8 transition-colors duration-500 group-hover:text-paper">
                <span className="col-span-1 font-mono text-xs text-steel">0{i + 1}</span>
                <span className="col-span-11 font-display text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-4 md:col-span-4 md:text-5xl">{n.n}</span>
                <span className="col-span-11 col-start-2 text-sm leading-relaxed opacity-70 md:col-span-5 md:col-start-auto">{n.d}</span>
                <span className="col-span-2 hidden text-right font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 md:block">{n.tag}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative border-t px-6 py-32 md:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Lines className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl font-narrow" lines={["No fluff.", <span className="text-outline">Just a system.</span>]} />
          <p className="max-w-sm font-mono text-xs uppercase leading-6 tracking-[0.15em] text-muted-foreground">Four steps from guessing to a sales team that runs on its own.</p>
        </div>
        <div className="grid border-l border-t md:grid-cols-4">
          {steps.map(([t, w, d], i) => (
            <Reveal key={t} delay={i * 120} className="group relative overflow-hidden border-b border-r p-8 transition-colors duration-500 hover:bg-ink hover:text-paper">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] opacity-60"><span>Step 0{i + 1}</span><span>{w}</span></div>
              <div className="mt-16 font-display text-5xl font-semibold tracking-tight">{t}</div>
              <p className="mt-4 text-sm leading-relaxed opacity-70">{d}</p>
              <div className="mt-8 h-px bg-current opacity-20"><div className="h-px bg-current" style={{ width: `${(i + 1) * 25}%` }} /></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section className="relative overflow-hidden bg-ink px-6 py-36 text-paper md:px-12 md:py-48">
        <div className="pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-1/2 select-none font-display text-[40vw] font-black leading-none text-paper/[0.04]">BIA</div>
        <div className="relative grid gap-12 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel md:col-span-3">(02) — Our promise</div>
          <div className="md:col-span-9">
            <Lines className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-8xl" lines={["We don't hand you", <span className="text-steel">a slide deck.</span>, "We hand you revenue."]} />
            <Reveal delay={300} className="mt-14 grid grid-cols-2 gap-10 border-t border-paper/15 pt-10 md:grid-cols-4">
              {[
                [<Counter to={50} suffix="+" />, "Reps placed & trained"],
                [<Counter to={12} suffix="M+" prefix="$" />, "Pipeline generated"],
                [<Counter to={35} suffix="%" />, "Avg. win-rate lift"],
                [<Counter to={90} />, "Days to a working engine"],
              ].map(([v, l], i) => (
                <div key={i}>
                  <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{v}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">{l}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="border-t px-6 py-32 md:px-12">
        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(03) — Do the math</div>
          <Lines className="font-display text-5xl font-medium leading-[1] tracking-tight md:col-span-9 md:text-7xl" lines={["Hire full-time,", "use a recruiter,", <span className="text-outline font-wide">or go fractional.</span>]} />
        </div>
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="py-4 font-normal">Category</th>
                <th className="bg-ink px-6 py-4 font-normal text-paper">BIA ▲</th>
                <th className="px-6 py-4 font-normal">Full-time hire</th>
                <th className="px-6 py-4 font-normal">Recruiter</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((r) => (
                <tr key={r[0]} className="border-t transition-colors hover:bg-secondary">
                  <td className="py-5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{r[0]}</td>
                  <td className="bg-ink px-6 py-5 font-medium text-paper">{r[1]}</td>
                  <td className="px-6 py-5 text-muted-foreground line-through decoration-steel/50">{r[2]}</td>
                  <td className="px-6 py-5 text-muted-foreground">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* ABOUT / FIT */}
      <section id="about" className="border-t px-6 py-32 md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(04) — Is this you?</div>
          <div className="grid gap-px bg-border md:col-span-9 md:grid-cols-2">
            {[
              ["Built for", ["$1M – $50M companies ready to scale sales", "Founders still carrying the number", "Teams with reps but no process", "Leaders who want a forecast they trust"]],
              ["Not for", ["Companies looking for a magic tool", "Anyone unwilling to change how they sell", "Teams that want reports, not results"]],
            ].map(([h, items], i) => (
              <Reveal key={h as string} delay={i * 150} className="bg-paper p-10">
                <div className="font-display text-3xl font-medium">{h as string}</div>
                <ul className="mt-6 space-y-4">
                  {(items as string[]).map((t) => (
                    <li key={t} className="flex gap-3 border-t pt-4 text-muted-foreground"><span className="text-ink">{i ? "×" : "▲"}</span>{t}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="relative overflow-hidden border-t px-6 py-40 md:px-12">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-10 flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 200 200" className="animate-spin-slow absolute h-40 w-40 text-ink">
              <defs><path id="c" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
              <text className="font-mono" fontSize="11" letterSpacing="4" fill="currentColor"><textPath href="#c">BUILDING BETTER BUSINESSES · BOOK A STRATEGY CALL · </textPath></text>
            </svg>
            <span className="font-display text-3xl">▲</span>
          </div>
          <Lines className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tight md:text-[10vw] font-narrow" lines={["Stop being", <span className="text-outline">the sales team.</span>]} />
          <Reveal delay={300} className="mt-12 flex flex-col items-center gap-6">
            <p className="max-w-md text-muted-foreground">One 30-minute call. We'll look at your team, your pipeline and your market — and tell you honestly where the revenue is hiding.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic href={BOOK} className="rounded-full bg-ink px-10 py-5 font-mono text-xs uppercase tracking-[0.25em] text-paper">Book your strategy call →</Magnetic>
              <Magnetic href={LINKEDIN} className="rounded-full border border-ink px-10 py-5 font-mono text-xs uppercase tracking-[0.25em] text-ink">Follow on LinkedIn ↗</Magnetic>
            </div>
            <a href={`mailto:${EMAIL}`} className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-ink">or email {EMAIL}</a>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t px-6 py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:px-12">
        <img src="/assets/bia-consulting-mark.png" alt="BIA Consulting" width={480} height={200} className="h-5 w-auto max-w-full object-contain" />
        <span>Building better businesses.</span>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">LinkedIn ↗</a>
        <span>© {new Date().getFullYear()} BIA Consulting</span>
      </footer>
    </div>
  );
}
