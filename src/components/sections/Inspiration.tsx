import Image from 'next/image';
import { inspiration } from '@/content/site';
import { Container, Eyebrow } from '../ui';

export default function Inspiration() {
  return (
    <section aria-labelledby="inspiration" className="bg-blush-50 py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="reveal-media relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5">
          <Image
            src="/images/feet-black-sandals.jpg"
            alt="A row of children's feet in new black sandals"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="reveal from-right lg:col-span-7 lg:pl-8">
          <Eyebrow className="text-flame-600">Our inspiration</Eyebrow>
          <blockquote className="mt-6">
            <p id="inspiration" className="font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-plum-700 sm:text-5xl">
              “{inspiration.verse}”
            </p>
            <footer className="mt-6 font-display text-lg font-bold text-flame-600">{inspiration.reference}</footer>
          </blockquote>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">{inspiration.body}</p>
        </div>
      </Container>
    </section>
  );
}
