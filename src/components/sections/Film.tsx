import { Container, Eyebrow, RiseText } from '../ui';

export default function Film() {
  return (
    <section id="film" className="bg-sea-800 py-24 text-white sm:py-32">
      <Container>
        <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow className="text-gold-500">Distribution day</Eyebrow>
            <h2 className="mt-5 text-section font-black tracking-[-0.025em]">
              <RiseText text="Watch a classroom get its shoes." />
            </h2>
          </div>
          <p className="max-w-sm text-lg text-white/75">
            Filmed at Mante School of Excellence, Afienya. One minute, start to finish.
          </p>
        </div>

        <div className="reveal pop mt-12 overflow-hidden rounded-[var(--radius-card)] bg-sea-950 shadow-2xl shadow-sea-950/40">
          <video
            className="aspect-video w-full"
            controls
            preload="none"
            playsInline
            poster="/images/film-poster.jpg"
          >
            <source src="/videos/our-story-film.mp4" type="video/mp4" />
            Your browser can’t play this video.
          </video>
        </div>
      </Container>
    </section>
  );
}
