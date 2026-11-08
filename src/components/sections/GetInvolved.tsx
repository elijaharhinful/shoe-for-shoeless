import Image from 'next/image';
import { ArrowUpRight, Handshake, HeartHandshake, Instagram, Mail, Phone } from 'lucide-react';
import { partners, site } from '@/content/site';
import { ButtonLink, Container, Eyebrow, RiseText, stagger } from '../ui';

const mail = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;

const ways = [
  {
    icon: Handshake,
    title: 'Sponsor a school',
    body: 'Companies and churches can fund a full distribution day: shoes, fitting, school supplies, and a report with photos.',
    cta: 'Start a sponsorship',
    href: mail('Sponsoring a school distribution'),
    dot: 'bg-sea-700',
  },
  {
    icon: HeartHandshake,
    title: 'Volunteer on distribution day',
    body: 'Help us fit shoes, run mentorship sessions, or tell the story with photos and video.',
    cta: 'Volunteer with us',
    href: mail('Volunteering with Shoe for the Shoeless'),
    dot: 'bg-leaf-700',
  },
  {
    icon: Instagram,
    title: 'Follow the journey',
    body: 'See every distribution as it happens and share it with someone who can help.',
    cta: site.social.instagramHandle,
    href: site.social.instagram,
    dot: 'bg-plum-700',
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="bg-blush-200 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow className="text-flame-600">Get involved</Eyebrow>
            <h2 className="mt-5 text-section font-black tracking-[-0.025em] text-plum-700">
              <RiseText text="Walk with us." />
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
              The fastest way to help is a gift. Here are the other ways to get more children into shoes.
            </p>
            <ButtonLink href="#donate" className="mt-8">
              Donate now
            </ButtonLink>

            <div className="mt-12 space-y-3 text-plum-900">
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 font-semibold hover:text-flame-600">
                <Mail className="size-5" aria-hidden /> {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phoneIntl}`} className="flex items-center gap-3 font-semibold hover:text-flame-600">
                <Phone className="size-5" aria-hidden /> {site.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <ul className="divide-y divide-plum-700/15 border-y border-plum-700/15 lg:col-span-7">
            {ways.map((w, i) => (
              <li key={w.title} style={stagger(i)} className="reveal from-right">
                <a
                  href={w.href}
                  {...(w.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-8"
                >
                  <span className={`grid size-12 place-items-center rounded-full ${w.dot} text-white transition-colors group-hover:bg-flame-500`}>
                    <w.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-extrabold text-plum-800">{w.title}</span>
                    <span className="mt-2 block text-ink-muted">{w.body}</span>
                    <span className="mt-3 block font-display font-bold text-flame-600">{w.cta}</span>
                  </span>
                  <ArrowUpRight
                    className="size-6 text-plum-700 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-24 border-t border-plum-700/15 pt-12">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-plum-700">
            Thank you to our partners
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p, i) => {
              const tile = p.logo ? (
                <Image
                  src={p.logo.src}
                  alt={p.name}
                  width={p.logo.w}
                  height={p.logo.h}
                  sizes="12rem"
                  className="max-h-16 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="text-center font-display text-lg font-extrabold leading-tight text-plum-800">{p.name}</span>
              );
              const box =
                'grid h-28 place-items-center rounded-2xl border-2 border-plum-700/10 bg-white px-5 transition-[border-color,translate] duration-200';
              return (
                <li key={p.name} style={stagger(i + 1)} className="reveal pop">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.name}
                      className={`${box} hover:-translate-y-0.5 hover:border-flame-500`}
                    >
                      {tile}
                    </a>
                  ) : (
                    <div className={box}>{tile}</div>
                  )}
                </li>
              );
            })}
            <li style={stagger(partners.length + 1)} className="reveal pop">
              <a
                href={mail('Partnering with Shoe for the Shoeless')}
                className="grid h-28 place-items-center rounded-2xl border-2 border-dashed border-flame-500 px-5 text-center font-display text-lg font-bold text-flame-600 transition-colors hover:bg-flame-500 hover:text-white"
              >
                + Your organisation
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
