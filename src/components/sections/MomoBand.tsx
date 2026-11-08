import { Smartphone } from 'lucide-react';
import { site } from '@/content/site';
import { Container } from '../ui';

/** Thin plum band under the hero: the most common way Ghanaian supporters give. */
export default function MomoBand() {
  return (
    <section aria-label="Give by Mobile Money" className="bg-plum-700 text-white">
      <Container className="flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
        <p className="font-display text-lg font-bold sm:text-xl">
          Every pair is handmade in Ghana and fitted by hand.
        </p>
        <p className="flex items-center gap-2.5 text-white/95">
          <Smartphone className="size-5 shrink-0" aria-hidden />
          <span>
            Give by Mobile Money:{' '}
            <a href={`tel:${site.contact.phoneIntl}`} className="font-display font-extrabold underline-offset-4 hover:underline">
              {site.contact.momo.number}
            </a>{' '}
            <span className="text-white/80">({site.contact.momo.name})</span>
          </span>
        </p>
      </Container>
    </section>
  );
}
