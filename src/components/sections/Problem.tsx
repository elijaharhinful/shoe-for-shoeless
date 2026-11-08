import Image from 'next/image';
import { problem } from '@/content/site';
import { Container, Eyebrow, RiseText, stagger } from '../ui';

export default function Problem() {
  return (
    <section id="problem" className="bg-blush-50 py-24 sm:py-32">
      <Container>
        <div className="reveal mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center text-flame-600">{problem.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-section font-black tracking-[-0.025em] text-plum-700">
            <RiseText text={problem.title} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">{problem.body}</p>
        </div>

        <div className="mt-16 grid gap-5 sm:mt-20 lg:grid-cols-12 lg:gap-6">
          <figure className="reveal-media relative overflow-hidden rounded-[var(--radius-card)] lg:col-span-7">
            <Image
              src="/images/before-after-sandals.jpg"
              alt="The same row of students before and after receiving shoes: bare feet on top, sandals below"
              width={1170}
              height={1155}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-square size-full object-cover object-bottom"
            />
            <figcaption className="absolute bottom-2 left-2 max-w-[8.5rem] rounded-2xl bg-sea-950/90 px-3 py-2 text-xs font-semibold leading-snug text-white sm:bottom-3 sm:left-3 sm:max-w-[10rem] sm:text-sm">
              Same students. Before and after.
            </figcaption>
          </figure>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
            <div style={stagger(1)} className="reveal pop grid content-center gap-8 rounded-[var(--radius-card)] bg-sea-700 p-8 text-white sm:p-10">
              {problem.facts.map((f) => (
                <p key={f.figure}>
                  <span className="block font-display text-6xl font-black tracking-tight text-gold-500">{f.figure}</span>
                  <span className="mt-1 block text-lg text-white/85">{f.text}</span>
                </p>
              ))}
            </div>
            <div style={stagger(2)} className="reveal-media relative min-h-64 overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/classroom-faces.jpg"
                alt="Pupils at their desks in a rural classroom"
                fill
                sizes="(min-width: 1024px) 40vw, 50vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
