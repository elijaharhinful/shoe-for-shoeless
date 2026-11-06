import Link from 'next/link';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

type Tone = 'flame' | 'maroon' | 'light' | 'outline-light' | 'outline-maroon';

const tones: Record<Tone, string> = {
  flame: 'bg-flame-500 text-white hover:bg-flame-600 shadow-[0_10px_30px_-10px] shadow-flame-600/70',
  maroon: 'bg-maroon-700 text-white hover:bg-maroon-800',
  light: 'bg-white text-maroon-800 hover:bg-blush-100',
  'outline-light': 'border-2 border-white/70 text-white hover:bg-white hover:text-maroon-800',
  'outline-maroon': 'border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white',
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 font-display text-[0.95rem] font-bold tracking-wide transition-[background-color,color,border-color,translate,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60';

export function ButtonLink({
  tone = 'flame',
  className,
  ...props
}: ComponentProps<typeof Link> & { tone?: Tone }) {
  return <Link {...props} className={cx(base, tones[tone], className)} />;
}

export function Button({
  tone = 'flame',
  className,
  ...props
}: ComponentProps<'button'> & { tone?: Tone }) {
  return <button {...props} className={cx(base, tones[tone], className)} />;
}

/** Section label with the logo's toe-print dot trail. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx('toe-trail font-display text-sm font-bold uppercase tracking-[0.18em]', className)}>
      {children}
    </p>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>{children}</div>;
}

/** Stagger index for .reveal / .enter children (read by globals.css as --i). */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

/**
 * Headline whose words rise out of a mask in sequence. Animates when an ancestor .reveal
 * scrolls into view, or on load inside an .enter element. Words in `accent` get accentClass.
 */
export function RiseText({
  text,
  accent = [],
  accentClass,
  offset = 0,
}: {
  text: string;
  accent?: string[];
  accentClass?: string;
  offset?: number;
}) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="rise-word">
            <span
              style={{ '--w': i + offset } as CSSProperties}
              className={accent.includes(word) ? accentClass : undefined}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

export { cx };
