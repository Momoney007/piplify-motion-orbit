import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Intro } from "@/components/site/Intro";
import { Counter, Cursor, Lines, Magnetic, Reveal } from "@/components/site/motion";
import mark from "@/assets/bia-mark.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Piplify by BIA — Outbound pipeline, guaranteed" },
      { name: "description", content: "Done-for-you B2B cold email at volume. Qualified meetings on your calendar in 60 days, or we work free until we deliver." },
      { property: "og:title", content: "Piplify by BIA — Outbound pipeline, guaranteed" },
      { property: "og:description", content: "Thousands of targeted prospects a month. Meetings booked straight to your calendar. Written guarantee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const BOOK = "#book";

const niches = [
  { n: "B2B SaaS", who: "VP Sales · CTO · Founder", deal: "$6k–$100k LTV", cycle: "1–4 wks" },
  { n: "Staffing & Recruiting", who: "HR Director · COO", deal: "$8k–$25k / placement", cycle: "Days" },
  { n: "Freight & Logistics", who: "VP Logistics · Supply Chain", deal: "$50k–$500k / yr", cycle: "1–3 wks" },
  { n: "IT / MSP", who: "CEO · IT Director", deal: "$2k–$15k / mo", cycle: "2–6 wks" },
  { n: "Cybersecurity", who: "CISO · CTO", deal: "$40k–$250k", cycle: "3–8 wks" },
  { n: "Commercial Cleaning", who: "Facilities · Property Mgr", deal: "$2k–$20k / mo", cycle: "1–3 wks" },
  { n: "Insurance", who: "CFO · HR · Owner", deal: "$10k–$100k / yr", cycle: "2–6 wks" },
];

const compare = [
  ["Monthly cost", "$349 – $1,997", "$5k – $8k+ salary, tools, mgmt", "$2k – $5k+"],
  ["First meeting", "2 – 3 weeks", "2 – 3 month ramp", "4 – 8 weeks"],
  ["Guarantee", "Yes — in contract", "None", "Rarely"],
  ["Alignment", "Revenue share", "Paid regardless", "Flat retainer"],
  ["Infrastructure", "Domains, warmup, deliverability", "You build it", "Sometimes"],
  ["Scale", "Add volume instantly", "Hire another person", "Pay more"],
];

function Index() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const on = () => setScroll(scrollY);
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <div className="grain cursor-none-fine relative min-h-screen">
      <Intro onDone={done} />
      <Cursor />
      <div className="fixed left-0 top-0 z-[70] h-[2px] bg-ink" style={{ width: `${(scroll / Math.max(1, (typeof document !== "undefined" ? document.body.scrollHeight : 1) - (typeof window !== "undefined" ? innerHeight : 0))) * 100}%` }} />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12">
          <a href="#top" className="flex items-center gap-3">
            <img src={mark.url} alt="BIA Consulting" className="h-7 w-auto" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">× Piplify</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            {["Math", "Guarantee", "Niches", "Compare"].map((l, i) => (
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
          Active clients capped<br />Onboarding — 5 business days<br />
          <span className="text-ink">● Accepting Q1 slots</span>
        </div>

        {ready && (
          <div className="relative">
            <Lines
              className="font-display text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.04em] md:text-[11.5vw]"
              lines={[
                <span className="font-narrow">Your buyers'</span>,
                <span className="text-outline font-wide font-light">inbox.</span>,
                <span className="font-narrow">Your revenue<span className="text-steel">.</span></span>,
              ]}
            />
            <Reveal delay={500} className="mt-10 grid gap-8 border-t pt-8 md:grid-cols-12">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:col-span-5">
                We build your outbound pipeline from zero. Thousands of the right decision-makers reached every month — meetings land on your calendar. You just close.
              </p>
              <div className="grid grid-cols-3 gap-6 md:col-span-5 md:col-start-8">
                {[
                  [<Counter to={8000} suffix="+" />, "Emails / mo"],
                  [<Counter to={15} prefix="~" />, "Meetings / mo"],
                  [<Counter to={60} />, "Day guarantee"],
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
          {[...niches, ...niches].map((n, i) => (
            <span key={i} className="flex items-center gap-12">
              {n.n} <span className="text-steel">▲</span>
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM — acquisition-style blunt framing */}
      <section className="px-6 py-32 md:px-12 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(01) — The real problem</div>
          <div className="md:col-span-9">
            <Lines
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl"
              lines={["You don't have a closing problem.", <span className="text-steel">You have a conversation problem.</span>]}
            />
            <Reveal delay={200} className="mt-12 grid gap-10 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Referrals dry up. Your SDR takes three months to ramp — then quits. Agencies send 500 emails and call it a campaign. None of it moves the number.
              </p>
              <p className="text-lg leading-relaxed text-ink">
                The fix isn't a better pitch. It's <em className="font-semibold not-italic underline decoration-steel decoration-2 underline-offset-4">more of the right people hearing it</em> — consistently, every single month.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MATH */}
      <section id="math" className="relative border-t px-6 py-32 md:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Lines className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl font-narrow" lines={["500 emails is", <span className="text-outline">a waste.</span>]} />
          <p className="max-w-sm font-mono text-xs uppercase leading-6 tracking-[0.15em] text-muted-foreground">The honest math at 8,000 emails a month. Volume changes everything.</p>
        </div>
        <div className="grid border-l border-t md:grid-cols-5">
          {[
            [8000, "Sent", "ICP-matched contacts", 100],
            [2800, "Opened", "35% decision-makers", 35],
            [80, "Replied", "1% interested", 12],
            [16, "Meetings", "Qualified calls", 6],
            [4, "Closed", "25% new clients", 3],
          ].map(([v, l, s, w], i) => (
            <Reveal key={i} delay={i * 120} className="group relative overflow-hidden border-b border-r p-8 transition-colors duration-500 hover:bg-ink hover:text-paper">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Step 0{i + 1}</div>
              <div className="mt-10 font-display text-5xl font-semibold tracking-tight md:text-6xl"><Counter to={v as number} /></div>
              <div className="mt-2 text-lg font-medium">{l}</div>
              <div className="text-sm opacity-60">{s}</div>
              <div className="mt-8 h-px bg-current opacity-20"><div className="h-px bg-current transition-all duration-1000 group-hover:opacity-100" style={{ width: `${w}%` }} /></div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">* Industry benchmarks across B2B campaigns, not a promise for any specific client.</p>
      </section>

      {/* GUARANTEE */}
      <section id="guarantee" className="relative overflow-hidden bg-ink px-6 py-36 text-paper md:px-12 md:py-48">
        <div className="pointer-events-none absolute -right-[10vw] top-1/2 -translate-y-1/2 select-none font-display text-[40vw] font-black leading-none text-paper/[0.04]">60</div>
        <div className="relative grid gap-12 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel md:col-span-3">(02) — The guarantee</div>
          <div className="md:col-span-9">
            <Lines className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-8xl" lines={["Meetings in 60 days.", <span className="text-steel">Or we work free</span>, "until we deliver."]} />
            <Reveal delay={300} className="mt-14 flex flex-wrap items-center gap-10 border-t border-paper/15 pt-10">
              <p className="max-w-lg text-lg leading-relaxed text-paper/70">We define the target together — by niche and deal size — before you sign. It's written into every contract. No fine print. No asterisks.</p>
              <Magnetic href={BOOK} className="rounded-full bg-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink">Lock in your guarantee →</Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NICHES */}
      <section id="niches" className="px-6 py-32 md:px-12">
        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(03) — Who this is for</div>
          <div className="md:col-span-9">
            <Lines className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl" lines={["Seven niches.", <span className="text-steel">If one deal pays for months of us.</span>]} />
            <Reveal delay={200}><p className="mt-6 max-w-xl text-muted-foreground">Not on the list? We'll tell you before you pay a dollar.</p></Reveal>
          </div>
        </div>
        <ul className="border-t">
          {niches.map((n, i) => (
            <li key={n.n} data-cursor="hover" className="group relative overflow-hidden border-b">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.1,1)] group-hover:scale-y-100" />
              <div className="relative grid grid-cols-12 items-center gap-4 py-7 transition-colors duration-500 group-hover:text-paper">
                <span className="col-span-1 font-mono text-xs text-steel">0{i + 1}</span>
                <span className="col-span-11 font-display text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-4 md:col-span-5 md:text-5xl">{n.n}</span>
                <span className="col-span-4 hidden font-mono text-[11px] uppercase tracking-[0.15em] opacity-70 md:block">{n.who}</span>
                <span className="col-span-2 hidden text-right font-mono text-xs md:block">{n.deal}<br /><span className="opacity-50">{n.cycle}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* COMPARE */}
      <section id="compare" className="border-t px-6 py-32 md:px-12">
        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">(04) — Do the math</div>
          <Lines className="font-display text-5xl font-medium leading-[1] tracking-tight md:col-span-9 md:text-7xl" lines={["Hire an SDR,", "an agency,", <span className="text-outline font-wide">or us.</span>]} />
        </div>
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="py-4 font-normal">Category</th>
                <th className="bg-ink px-6 py-4 font-normal text-paper">Piplify ▲</th>
                <th className="px-6 py-4 font-normal">In-house SDR</th>
                <th className="px-6 py-4 font-normal">Other agencies</th>
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

      {/* CTA */}
      <section id="book" className="relative overflow-hidden border-t px-6 py-40 md:px-12">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-10 flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 200 200" className="animate-spin-slow absolute h-40 w-40 text-ink">
              <defs><path id="c" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
              <text className="font-mono" fontSize="11" letterSpacing="4" fill="currentColor"><textPath href="#c">LIMITED CLIENT SLOTS · BOOK A STRATEGY CALL · </textPath></text>
            </svg>
            <span className="font-display text-3xl">▲</span>
          </div>
          <Lines className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tight md:text-[10vw] font-narrow" lines={["Stop waiting", <span className="text-outline">for referrals.</span>]} />
          <Reveal delay={300} className="mt-12 flex flex-col items-center gap-6">
            <p className="max-w-md text-muted-foreground">One 30-minute call. We'll map your market, your numbers, and whether we're a fit — honestly.</p>
            <Magnetic href="mailto:hello@getpiplify.com" className="rounded-full bg-ink px-10 py-5 font-mono text-xs uppercase tracking-[0.25em] text-paper">Book your free strategy call →</Magnetic>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Starts at $349 / month</span>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t px-6 py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:px-12">
        <img src={mark.url} alt="BIA Consulting" className="h-5 w-auto" />
        <span>Building better businesses.</span>
        <span>Houston, TX & Nationwide · © {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
