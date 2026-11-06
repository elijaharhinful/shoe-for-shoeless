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
  },
  {
    icon: HeartHandshake,
    title: 'Volunteer on distribution day',
    body: 'Help us fit shoes, run mentorship sessions, or tell the story with photos and video.',
    cta: 'Volunteer with us',
    href: mail('Volunteering with Shoe for the Shoeless'),
  },
  {
    icon: Instagram,
    title: 'Follow the journey',
    body: 'See every distribution as it happens and share it with someone who can help.',
    cta: '@shoe_4_the_shoeless',
    href: site.social.instagram,
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="bg-blush-200 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow className="text-flame-600">Get involved</Eyebrow>
            <h2 className="mt-5 text-section font-black tracking-[-0.025em] text-maroon-700">
              <RiseText text="Walk with us." />
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
              The fastest way to help is a gift. Here are the other ways to get more children into shoes.
            </p>
            <ButtonLink href="#donate" className="mt-8">
              Donate now
            </ButtonLink>

            <div className="mt-12 space-y-3 text-maroon-900">
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 font-semibold hover:text-flame-600">
                <Mail className="size-5" aria-hidden /> {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phoneIntl}`} className="flex items-center gap-3 font-semibold hover:text-flame-600">
                <Phone className="size-5" aria-hidden /> {site.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <ul className="divide-y divide-maroon-700/15 border-y border-maroon-700/15 lg:col-span-7">
            {ways.map((w, i) => (
              <li key={w.title} style={stagger(i)} className="reveal from-right">
                <a
                  href={w.href}
                  {...(w.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-8"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-maroon-700 text-white transition-colors group-hover:bg-flame-500">
                    <w.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-extrabold text-maroon-800">{w.title}</span>
                    <span className="mt-2 block text-ink-muted">{w.body}</span>
                    <span className="mt-3 block font-display font-bold text-flame-600">{w.cta}</span>
                  </span>
                  <ArrowUpRight
                    className="size-6 text-maroon-700 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-24 border-t border-maroon-700/15 pt-12">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-maroon-700">
            Thank you to our partners
          </h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {partners.map((p, i) => (
              <li
                key={p.name}
                style={stagger(i + 1)}
                className="reveal pop rounded-full border-2 border-maroon-700/20 bg-blush-50 px-6 py-3 font-display text-lg font-extrabold text-maroon-800"
              >
                {p.name}
              </li>
            ))}
            <li style={stagger(partners.length + 1)} className="reveal pop">
              <a
                href={mail('Partnering with Shoe for the Shoeless')}
                className="inline-block rounded-full border-2 border-dashed border-flame-500 px-6 py-3 font-display text-lg font-bold text-flame-600 hover:bg-flame-500 hover:text-white"
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
