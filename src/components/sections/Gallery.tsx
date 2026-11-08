import Image from 'next/image';
import { Container, Eyebrow, RiseText, stagger } from '../ui';

const photos = [
  { src: '/images/celebration-group.jpg', w: 591, h: 655, alt: 'Children celebrating together after a distribution' },
  { src: '/images/handover-kneeling.jpg', w: 1170, h: 1061, alt: 'A volunteer kneels to hand a young boy his new shoes' },
  { src: '/images/feet-brown-sandals.jpg', w: 810, h: 1080, alt: 'Pupils wearing new brown sandals' },
  { src: '/images/mentor-talk.jpg', w: 591, h: 655, alt: 'A mentor speaks to a classroom during a mentorship session' },
  { src: '/images/edna-with-students.jpg', w: 1112, h: 1190, alt: 'A volunteer with students in yellow uniforms holding their new sandals' },
  { src: '/images/community-gathering.jpg', w: 1128, h: 989, alt: 'A community gathering for shoe distribution day' },
  { src: '/images/edna-classroom-gift.jpg', w: 720, h: 1080, alt: 'A student receives his new shoes in class' },
  { src: '/images/classroom-laughing.jpg', w: 591, h: 655, alt: 'Children laughing at their desks' },
  { src: '/images/school-group-yellow.jpg', w: 1280, h: 853, alt: 'A school group in yellow uniforms outside their classroom' },
];

export default function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-blush-50 py-24 sm:py-32">
      <Container>
        <div className="reveal max-w-3xl">
          <Eyebrow className="text-flame-600">From the field</Eyebrow>
          <h2 id="gallery-title" className="mt-5 text-section font-black tracking-[-0.025em] text-plum-700">
            <RiseText text="Meet the children we walk with." />
          </h2>
        </div>
        <div className="mt-14 columns-2 gap-4 sm:gap-5 lg:columns-3">
          {photos.map((p, i) => (
            <figure key={p.src} style={stagger(i % 3)} className="reveal-media mb-4 break-inside-avoid overflow-hidden rounded-2xl sm:mb-5">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="w-full transition-transform duration-700 ease-[var(--ease-out-soft)] hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
