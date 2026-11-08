import Image from 'next/image';
import { Instagram, Linkedin } from 'lucide-react';
import { nav, site } from '@/content/site';
import { Container } from './ui';

export default function Footer() {
  return (
    <footer className="bg-sea-950 pt-20 text-white/75">
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/brand/logo-white.png" alt={site.name} width={446} height={132} className="h-14 w-auto" />
            <p className="mt-6 max-w-sm leading-relaxed">{site.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-flame-500"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-flame-500"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-500">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={`/${n.href}`} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-500">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phoneIntl}`} className="hover:text-white">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="pt-2">
                <span className="block text-sm text-white/50">Mobile Money</span>
                <span className="font-display font-bold text-white">
                  {site.contact.momo.number} · {site.contact.momo.name}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-8 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Founded by{' '}
            <a href={site.social.founderSite} target="_blank" rel="noopener noreferrer" className="text-white/75 underline-offset-4 hover:text-white hover:underline">
              Edna Frimpong, The ShoemakerGurl
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
