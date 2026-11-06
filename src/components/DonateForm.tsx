'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Loader2, Smartphone } from 'lucide-react';
import { donation, site } from '@/content/site';
import { cx } from './ui';

const schema = z.object({
  amount: z
    .number({ error: 'Enter an amount' })
    .min(donation.min, `Minimum is ${donation.currency} ${donation.min}`)
    .max(1_000_000, 'That is above our online limit. Please contact us.'),
  donorName: z.string().trim().min(2, 'Please enter your name'),
  donorEmail: z.email('Enter a valid email for your receipt'),
});

type Values = z.infer<typeof schema>;

const fmt = (n: number) => n.toLocaleString('en-GH');

export default function DonateForm() {
  const [custom, setCustom] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { amount: donation.defaultAmount, donorName: '', donorEmail: '' },
  });

  const amount = watch('amount');

  const onSubmit = async (values: Values) => {
    setServerError(null);
    try {
      const res = await fetch('/api/donations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, currency: donation.currency, paymentMethod: 'paystack' }),
      });
      const data = await res.json();
      if (!res.ok || !data.paymentUrl) throw new Error(data.error || 'Could not start payment');
      window.location.assign(data.paymentUrl);
    } catch {
      setServerError(
        `We couldn't open the secure checkout. Please try again, or send Mobile Money to ${site.contact.momo.number}.`,
      );
    }
  };

  const field =
    'w-full rounded-xl border border-maroon-700/15 bg-white px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-700/15';

  return (
    <form
      id="donate"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full rounded-[var(--radius-card)] bg-blush-50 p-6 text-ink shadow-2xl shadow-maroon-950/40 sm:p-8"
    >
      <h2 className="font-display text-2xl font-extrabold text-maroon-800">Put a child in shoes</h2>

      <fieldset className="mt-6">
        <legend className="sr-only">Choose an amount</legend>
        <div className="grid grid-cols-3 gap-2.5">
          {donation.presets.map((p) => {
            const active = !custom && amount === p;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setCustom(false);
                  setValue('amount', p, { shouldValidate: true });
                }}
                className={cx(
                  'rounded-xl border-2 py-3 font-display text-[0.95rem] font-bold transition-[background-color,border-color,color,scale] duration-200 active:scale-95',
                  active
                    ? 'border-maroon-700 bg-maroon-700 text-white'
                    : 'border-maroon-700/15 bg-white text-maroon-800 hover:border-maroon-700/50',
                )}
              >
                ₵{fmt(p)}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={custom}
            onClick={() => setCustom(true)}
            className={cx(
              'rounded-xl border-2 py-3 font-display text-[0.95rem] font-bold transition-[background-color,border-color,color,scale] duration-200 active:scale-95',
              custom
                ? 'border-maroon-700 bg-maroon-700 text-white'
                : 'border-maroon-700/15 bg-white text-maroon-800 hover:border-maroon-700/50',
            )}
          >
            Other
          </button>
        </div>
      </fieldset>

      {custom && (
        <div className="mt-3">
          <label htmlFor="amount" className="sr-only">
            Amount in cedis
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-bold text-maroon-800">₵</span>
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              min={donation.min}
              autoFocus
              placeholder="Enter amount"
              className={cx(field, 'pl-9')}
              {...register('amount', { valueAsNumber: true })}
            />
          </div>
        </div>
      )}
      {errors.amount && <p className="mt-2 text-sm font-medium text-flame-700">{errors.amount.message}</p>}

      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor="donorName" className="mb-1.5 block text-sm font-semibold text-maroon-900">
            Full name
          </label>
          <input id="donorName" autoComplete="name" className={field} {...register('donorName')} />
          {errors.donorName && <p className="mt-1.5 text-sm font-medium text-flame-700">{errors.donorName.message}</p>}
        </div>
        <div>
          <label htmlFor="donorEmail" className="mb-1.5 block text-sm font-semibold text-maroon-900">
            Email <span className="font-normal text-ink-muted">(for your receipt)</span>
          </label>
          <input id="donorEmail" type="email" autoComplete="email" className={field} {...register('donorEmail')} />
          {errors.donorEmail && <p className="mt-1.5 text-sm font-medium text-flame-700">{errors.donorEmail.message}</p>}
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-4 rounded-xl bg-flame-500/10 px-4 py-3 text-sm font-medium text-flame-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-flame-500 py-4 font-display text-lg font-extrabold text-white shadow-[0_12px_30px_-12px] shadow-flame-600/80 transition-[background-color,translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-flame-600 active:translate-y-0 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden /> Opening secure checkout…
          </>
        ) : (
          <>Donate {Number.isFinite(amount) && amount > 0 ? `₵${fmt(amount)}` : ''}</>
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
        <Lock className="size-3.5" aria-hidden /> Secured by Paystack · Card, Mobile Money, bank
      </p>
      <p className="mt-3 flex items-start gap-2 border-t border-maroon-700/10 pt-3 text-xs text-ink-muted">
        <Smartphone className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <span>
          Prefer direct MoMo? Send to <strong className="text-maroon-800">{site.contact.momo.number}</strong> (
          {site.contact.momo.name}).
        </span>
      </p>
    </form>
  );
}
