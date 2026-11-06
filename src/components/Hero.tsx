import Image from 'next/image';
import { Play } from 'lucide-react';
import { site, stats } from '@/content/site';
import DonateForm from './DonateForm';
import { Eyebrow, RiseText, stagger } from './ui';

export default function Hero() {
  const pairs = stats[0];
  return (
    <section className="relative isolate overflow-hidden bg-maroon-950 text-white">
      {/* Poster is always present; the looping film sits above it unless the visitor prefers reduced motion. */}
      <Image
        src="/images/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-zoom -z-20 object-cover"
      />
      <video
        className="hero-zoom absolute inset-0 -z-10 hidden size-full object-cover motion-safe:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        aria-hidden
      >
        <source src="/videos/hero-loop.webm" type="video/webm" />
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-maroon-950/90 via-maroon-950/60 to-maroon-950/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-maroon-950/80 to-transparent" />

      <div className="mx-auto grid min-h-[min(100svh,60rem)] max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1fr_26rem] lg:gap-16 lg:pb-24">
        <div className="max-w-3xl">
          <Eyebrow className="enter text-gold-500">
            {pairs.value} pairs delivered across Ghana
          </Eyebrow>
          <h1 className="enter mt-6 text-hero font-black tracking-[-0.03em] text-white">
            <RiseText text="Shoes for the Shoeless." accent={['Shoeless.']} accentClass="text-gold-500" />
          </h1>
          <p className="enter mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl" style={stagger(4)}>
            {site.tagline}
          </p>
          <a
            href="#film"
            className="enter group mt-9 inline-flex items-center gap-4 font-display font-bold text-white"
            style={stagger(5)}
          >
            <span className="pulse-ring grid size-14 place-items-center rounded-full border-2 border-white/60 transition-[background-color,border-color,color,scale] duration-300 group-hover:scale-110 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-maroon-900">
              <Play className="ml-0.5 size-5 fill-current" aria-hidden />
            </span>
            Watch our story
          </a>
        </div>

        <div className="enter from-right" style={stagger(3)}>
          <DonateForm />
        </div>
      </div>
    </section>
  );
}
