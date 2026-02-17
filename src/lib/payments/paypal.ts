// PayPal Payment Handler
import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
const environment =
  process.env.PAYPAL_MODE === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(environment);

export interface PayPalOrderResponse {
  orderId: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

/**
 * Create a PayPal order
 */
export async function createPayPalOrder(
  amount: number,
  currency: string = 'USD',
  description: string = 'Donation to Shoe for Shoeless'
): Promise<PayPalOrderResponse> {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency.toUpperCase(),
          value: amount.toFixed(2),
        },
        description,
      },
    ],
    application_context: {
      brand_name: 'Shoe for Shoeless',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/verify`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?payment=cancelled`,
    },
  });

  try {
    const response = await client.execute(request);
    const result = response.result as {
      id: string;
      status: string;
      links: Array<{ href: string; rel: string; method: string }>;
    };

    return {
      orderId: result.id,
      status: result.status,
      links: result.links,
    };
  } catch (error) {
    console.error('PayPal order creation error:', error);
    throw new Error('Failed to create PayPal order');
  }
}

/**
 * Capture a PayPal order
 */
export async function capturePayPalOrder(orderId: string) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error('PayPal order capture error:', error);
    throw new Error('Failed to capture PayPal order');
  }
}

/**
 * Get PayPal order details
 */
export async function getPayPalOrderDetails(orderId: string) {
  const request = new paypal.orders.OrdersGetRequest(orderId);

  try {
    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error('PayPal order retrieval error:', error);
    throw new Error('Failed to retrieve PayPal order');
  }
}

export { client as paypalClient };
