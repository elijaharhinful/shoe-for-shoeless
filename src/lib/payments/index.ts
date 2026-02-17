// Unified Payment Interface
export type PaymentMethod = 'paystack' | 'stripe' | 'paypal' | 'card' | 'google_pay';

export interface PaymentInitializationData {
  amount: number;
  currency: string;
  email?: string;
  reference: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentInitializationResult {
  success: boolean;
  paymentUrl?: string;
  clientSecret?: string;
  orderId?: string;
  reference: string;
  error?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  status: 'completed' | 'pending' | 'failed';
  amount?: number;
  currency?: string;
  reference: string;
  error?: string;
}

/**
 * Generate a unique transaction reference
 */
export function generateTransactionReference(prefix: string = 'TXN'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Format amount for display
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

/**
 * Validate payment amount
 */
export function validatePaymentAmount(amount: number, minAmount: number = 1): boolean {
  return amount >= minAmount && amount <= 1000000; // Max $1M
}

/**
 * Get payment method display name
 */
export function getPaymentMethodName(method: PaymentMethod): string {
  const names: Record<PaymentMethod, string> = {
    paystack: 'Paystack',
    stripe: 'Credit/Debit Card',
    paypal: 'PayPal',
    card: 'Credit/Debit Card',
    google_pay: 'Google Pay',
  };
  return names[method] || method;
}

/**
 * Determine which payment method to use based on user selection
 * Maps user-friendly names to actual payment providers
 */
export function resolvePaymentProvider(method: PaymentMethod): {
  provider: 'paystack' | 'stripe' | 'paypal';
  method: PaymentMethod;
} {
  // Card and Google Pay are handled through Stripe
  if (method === 'card' || method === 'google_pay') {
    return { provider: 'stripe', method };
  }
  
  // Direct provider mapping
  return { provider: method as 'paystack' | 'stripe' | 'paypal', method };
}
