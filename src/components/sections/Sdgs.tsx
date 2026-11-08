import { sdgs } from '@/content/site';
import { Container, Eyebrow, RiseText, cx, stagger } from '../ui';

// One campaign color per goal. Full class strings so Tailwind picks them up.
const tones = {
  leaf: 'bg-leaf-700',
  flame: 'bg-flame-500',
  plum: 'bg-plum-700',
  sea: 'bg-sea-700',
} as const;

export default function Sdgs() {
  return (
    <section id="sdgs" aria-labelledby="sdgs-title" className="bg-blush-50 py-24 sm:py-32">
      <Container>
        <div className="reveal max-w-4xl">
          <Eyebrow className="text-flame-600">{sdgs.eyebrow}</Eyebrow>
          <h2 id="sdgs-title" className="mt-5 text-section font-black tracking-[-0.025em] text-plum-700">
            <RiseText text={sdgs.title} />
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">{sdgs.body}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sdgs.goals.map((g, i) => (
            <li
              key={g.number}
              style={stagger(i)}
              className={cx(
                'reveal pop flex flex-col rounded-[var(--radius-card)] p-7 text-white shadow-xl shadow-plum-950/10',
                tones[g.tone],
              )}
            >
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-300">Goal</p>
              <p className="font-display text-7xl font-black leading-none tracking-[-0.04em]">{g.number}</p>
              <h3 className="mt-6 font-display text-xl font-extrabold leading-snug">{g.name}</h3>
              <p className="mt-3 leading-relaxed text-white/85">{g.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
