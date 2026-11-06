'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const INTERVAL_MS = 4000;
const MAX_TRIES = 15; // about a minute, enough for a Mobile Money approval

/**
 * Mobile Money often clears a few seconds after Paystack redirects the donor back.
 * Re-run the server-side check until it settles, then let the donor retry by hand.
 */
export default function PendingRefresh() {
  const router = useRouter();
  const [tries, setTries] = useState(0);
  const waiting = tries < MAX_TRIES;

  useEffect(() => {
    if (!waiting) return;
    const t = setTimeout(() => {
      router.refresh();
      setTries((n) => n + 1);
    }, INTERVAL_MS);
    return () => clearTimeout(t);
  }, [router, tries, waiting]);

  return (
    <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/70" aria-live="polite">
      {waiting ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden /> Checking your payment…
        </>
      ) : (
        <button
          type="button"
          onClick={() => setTries(0)}
          className="font-semibold text-gold-500 underline-offset-4 hover:underline"
        >
          Still waiting? Check again
        </button>
      )}
    </p>
  );
}
