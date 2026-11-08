'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { nav, site } from '@/content/site';
import { cx } from './ui';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const light = !solid && !open; // white-on-video state

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        light ? 'bg-transparent' : 'bg-blush-50/95 shadow-[0_1px_0] shadow-plum-700/10 backdrop-blur',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src={light ? '/brand/logo-white.png' : '/brand/logo-plum.png'}
            alt={site.name}
            width={446}
            height={132}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cx(
                    'font-display text-[0.95rem] font-semibold transition-colors',
                    light ? 'text-white/90 hover:text-gold-500' : 'text-plum-800 hover:text-flame-600',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#donate"
            className="inline-flex items-center gap-2 rounded-full bg-flame-500 px-5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-flame-600 sm:px-6 sm:py-3"
          >
            <Heart className="size-4 fill-current" aria-hidden />
            Donate
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cx('rounded-full p-2 lg:hidden', light ? 'text-white' : 'text-plum-800')}
          >
            {open ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="h-[calc(100dvh-5rem)] bg-blush-50 px-5 pb-10 lg:hidden">
          <ul className="flex flex-col border-t border-plum-700/10">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-plum-700/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-2xl font-bold text-plum-800"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-ink-muted">
            Mobile Money: <strong className="text-plum-800">{site.contact.momo.number}</strong> ({site.contact.momo.name})
          </p>
        </nav>
      )}
    </header>
  );
}
