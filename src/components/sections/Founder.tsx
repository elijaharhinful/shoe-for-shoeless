import Image from 'next/image';
import { Award } from 'lucide-react';
import { founder, site } from '@/content/site';
import { Container, Eyebrow, RiseText, stagger } from '../ui';

export default function Founder() {
  return (
    <section id="story" className="overflow-hidden bg-maroon-950 py-24 text-white sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="reveal lg:col-span-7">
          <Eyebrow className="text-gold-500">Our story</Eyebrow>
          <h2 className="mt-5 text-section font-black tracking-[-0.025em]">
            <RiseText text="Started by a shoemaker who refused to look away." />
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">{founder.intro}</p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {founder.honours.map((h, i) => (
              <li key={h} style={stagger(i + 2)} className="reveal flex gap-3 text-white/85">
                <Award className="mt-0.5 size-5 shrink-0 text-gold-500" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <a
            href={site.social.founderSite}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block font-display font-bold text-gold-500 underline-offset-4 hover:underline"
          >
            More about {founder.name} →
          </a>
        </div>

        <figure className="relative lg:col-span-5">
          <div className="reveal-media relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src="/images/edna-portrait.jpg"
              alt={`${founder.name}, founder, holding a handmade shoe`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption style={stagger(4)} className="reveal pop relative -mt-16 ml-6 mr-6 rounded-2xl bg-flame-500 p-6 shadow-xl sm:ml-auto sm:mr-[-1.5rem] sm:max-w-xs">
            <p className="font-display text-lg font-bold leading-snug">“{founder.quote}”</p>
            <p className="mt-3 text-sm text-white/85">
              {founder.name}, {founder.alias}
            </p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
