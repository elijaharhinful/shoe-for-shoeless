// USD -> GHS conversion for donations. Donors pick dollars; Paystack charges cedis so
// Mobile Money keeps working. The rate comes from open.er-api.com (free, no key, updates
// daily) and is cached for an hour. If the API is down we fall back to a fixed rate.
import 'server-only';

const RATE_URL = 'https://open.er-api.com/v6/latest/USD';

// Override in Vercel env when the cedi moves a lot. Used only if the live API fails.
const FALLBACK_RATE = Number(process.env.USD_GHS_FALLBACK_RATE) || 11.7;

// Reject obviously broken responses instead of charging a wild amount.
const SANE = { min: 3, max: 60 };

export type UsdGhsRate = { rate: number; live: boolean };

export async function getUsdToGhsRate(): Promise<UsdGhsRate> {
  try {
    const res = await fetch(RATE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { result?: string; rates?: Record<string, number> };
    const rate = data.rates?.GHS;
    if (data.result !== 'success' || typeof rate !== 'number' || rate < SANE.min || rate > SANE.max) {
      throw new Error(`Unexpected GHS rate: ${String(rate)}`);
    }
    return { rate, live: true };
  } catch (err) {
    console.warn('USD/GHS rate unavailable, using fallback:', err instanceof Error ? err.message : err);
    return { rate: FALLBACK_RATE, live: false };
  }
}

/** Dollars to cedis, rounded to the pesewa. */
export const usdToCedis = (usd: number, rate: number) => Math.round(usd * rate * 100) / 100;
