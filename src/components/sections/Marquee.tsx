import { bigIdea, project, stats } from '@/content/site';

/** Gold ticker between the Big Idea and Impact bands. Copy comes from site.ts only. */
export default function Marquee() {
  const items = [
    project.name,
    ...bigIdea.steps.map((s) => s.title),
    ...stats.slice(0, 2).map((s) => `${s.prefix}${s.value} ${s.label}`),
  ];

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-display text-3xl font-black uppercase tracking-[-0.01em] sm:text-5xl">{t}</span>
          <span className="toe-trail text-flame-500" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="What we do" className="marquee overflow-hidden bg-gold-500 py-6 text-plum-800 sm:py-8">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
