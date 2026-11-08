import type { CSSProperties } from 'react';
import { communities, project, stats } from '@/content/site';
import { ButtonLink, Container, Eyebrow, RiseText, stagger } from '../ui';

const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);

/**
 * Odometer tiles, e.g. 530 -> [5][3][0]. Each digit column holds 0-9 twice and rolls a full lap
 * to its value when the section scrolls into view (CSS in globals.css). Static final value otherwise.
 */
function Tiles({ value, prefix }: { value: number; prefix: string }) {
  const chars = `${prefix}${value}`.split('');
  return (
    <span className="flex gap-1.5 [--tile-h:4.5rem] sm:[--tile-h:6rem]" aria-hidden>
      {chars.map((c, i) => {
        const digit = /\d/.test(c) ? Number(c) : null;
        return (
          <span
            key={i}
            className="relative h-(--tile-h) w-[3.25rem] overflow-hidden rounded-lg bg-leaf-900/80 font-display text-5xl font-black text-gold-500 shadow-[inset_0_-3px_0] shadow-black/30 sm:w-[4.25rem] sm:text-6xl"
          >
            {digit === null ? (
              <span className="grid h-full place-items-center">{c}</span>
            ) : (
              <span className="odo-col flex flex-col" style={{ '--n': 10 + digit, '--i': i } as CSSProperties}>
                {DIGITS.map((d, j) => (
                  <span key={j} className="grid h-(--tile-h) shrink-0 place-items-center">
                    {d}
                  </span>
                ))}
              </span>
            )}
            {/* Split-flap seam */}
            <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/25" />
          </span>
        );
      })}
    </span>
  );
}

export default function Impact() {
  const delivered = stats[0].value;
  const milestone = project.nextMilestone;
  const pct = Math.min(100, Math.round((delivered / milestone) * 100));
  const listed = communities.reduce((n, c) => n + c.pairs, 0);

  return (
    <section id="impact" className="bg-leaf-800 py-24 text-white sm:py-32">
      <Container>
        <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow className="text-gold-500">Live counter</Eyebrow>
            <h2 className="mt-5 text-section font-black tracking-[-0.025em]">
              <RiseText text="Step by step, school by school." />
            </h2>
          </div>
          <ButtonLink href="#donate" tone="flame" className="self-start lg:self-auto">
            Add a pair to the count
          </ButtonLink>
        </div>

        <dl className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal" style={stagger(i)}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="sr-only">
                  {s.prefix}
                  {s.value}
                </span>
                <Tiles value={s.value} prefix={s.prefix} />
                <span className="mt-4 block font-display text-xl font-bold text-white/90">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="reveal mt-16 rounded-[var(--radius-card)] bg-leaf-900/70 p-6 sm:p-10">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-500">{project.name}</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-lg font-bold">
              {delivered} of {milestone.toLocaleString('en-US')} pairs, our next milestone
            </p>
            <p className="text-white/70">
              On the way to {project.goal.toLocaleString('en-US')} children in shoes
            </p>
          </div>
          <div
            className="mt-4 h-4 overflow-hidden rounded-full bg-black/25"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={milestone}
            aria-valuenow={delivered}
            aria-label="Progress toward the next milestone"
          >
            <div className="bar-fill h-full rounded-full bg-gradient-to-r from-leaf-400 to-gold-500" style={{ width: `${pct}%` }} />
          </div>

          <h3 className="mt-10 font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-500">
            Distribution so far: {listed} pairs in {communities.length} communities
          </h3>
          <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((c, i) => (
              <li key={c.name} style={stagger((i % 6) + 4)} className="reveal flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
                <span className="font-semibold">{c.name}</span>
                <span className="font-display font-extrabold text-gold-500">{c.pairs}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
