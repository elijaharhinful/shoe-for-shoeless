import Image from 'next/image';
import { bigIdea } from '@/content/site';
import { ButtonLink, Container, Eyebrow, RiseText, stagger } from '../ui';

export default function BigIdea() {
  return (
    <section id="our-work" className="relative overflow-hidden bg-flame-500 py-24 text-white sm:py-32">
      {/* Large mark as a quiet watermark */}
      <Image
        src="/brand/mark-white.png"
        alt=""
        width={156}
        height={132}
        className="float-slow pointer-events-none absolute -right-24 -top-16 w-[34rem] max-w-none opacity-[0.08]"
      />
      <Container className="relative">
        <div className="reveal max-w-5xl">
          <Eyebrow className="text-maroon-900">{bigIdea.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-section font-black tracking-[-0.025em]">
            <RiseText text={bigIdea.title} />
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">{bigIdea.body}</p>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:mt-20 lg:grid-cols-12">
          <ol className="space-y-10 lg:col-span-6">
            {bigIdea.steps.map((s, i) => (
              <li key={s.title} style={stagger(i)} className="reveal from-left grid grid-cols-[auto_1fr] gap-x-6">
                <span className="font-display text-6xl font-black leading-none text-maroon-900/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="border-t-2 border-white/40 pt-4">
                  <h3 className="font-display text-2xl font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-white/90">{s.body}</p>
                </div>
              </li>
            ))}
            <li style={stagger(3)} className="reveal flex flex-wrap gap-3 pt-2">
              <ButtonLink href="#donate" tone="light">
                Fund a pair
              </ButtonLink>
              <ButtonLink href="#get-involved" tone="outline-light">
                Partner with us
              </ButtonLink>
            </li>
          </ol>

          <div className="relative lg:col-span-6">
            <div className="reveal-media relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-2xl shadow-maroon-950/30 lg:ml-10">
              <Image
                src="/images/shoemaker-workshop.jpg"
                alt="A Ghanaian shoemaker stitching a sandal by hand in the workshop"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div style={stagger(4)} className="reveal pop absolute -bottom-10 -left-2 w-1/2 overflow-hidden rounded-2xl border-[6px] border-flame-500 shadow-xl sm:-left-6">
              <Image
                src="/images/sandals-workshop.jpg"
                alt="Finished black sandals laid out on the workshop floor"
                width={1080}
                height={720}
                sizes="25vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
