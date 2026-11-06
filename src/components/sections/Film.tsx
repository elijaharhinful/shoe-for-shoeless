import { Container, Eyebrow, RiseText } from '../ui';

export default function Film() {
  return (
    <section id="film" className="bg-blush-100 py-24 sm:py-32">
      <Container>
        <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow className="text-flame-600">Distribution day</Eyebrow>
            <h2 className="mt-5 text-section font-black tracking-[-0.025em] text-maroon-700">
              <RiseText text="Watch a classroom get its shoes." />
            </h2>
          </div>
          <p className="max-w-sm text-lg text-ink-muted">
            Filmed at Mante School of Excellence, Afienya. One minute, start to finish.
          </p>
        </div>

        <div className="reveal pop mt-12 overflow-hidden rounded-[var(--radius-card)] bg-maroon-950 shadow-2xl shadow-maroon-900/25">
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
