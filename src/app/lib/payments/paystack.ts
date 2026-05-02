import type { PaymentProviderInterface, PaymentRequest } from "./payments";

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url?: string;
    reference?: string;
  };
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    status?: string;
    reference?: string;
    metadata?: {
      bookingId?: string;
    };
  };
};

function getPaystackSecretKey() {
  const secret = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;
  if (!secret) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }
  return secret;
}

function buildReference(bookingId: string) {
  return `booking_${bookingId}_${Date.now()}`;
}

export class PaystackProvider implements PaymentProviderInterface {
  async initializePayment(data: PaymentRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
    }

    const secret = getPaystackSecretKey();
    const reference = buildReference(data.bookingId);

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: Math.round(data.amount * 100),
        currency: data.currency,
        callback_url: `${baseUrl}/payment/callback`,
        reference,
        metadata: {
          bookingId: data.bookingId,
        },
      }),
    });

    const payload = (await response.json()) as PaystackInitializeResponse;

    if (!response.ok || !payload.status || !payload.data?.authorization_url) {
      throw new Error(payload.message || "Failed to initialize Paystack checkout");
    }

    return {
      paymentUrl: payload.data.authorization_url,
    };
  }

  async verifyTransaction(reference: string) {
    const secret = getPaystackSecretKey();

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      }
    );

    const payload = (await response.json()) as PaystackVerifyResponse;

    const bookingId = payload.data?.metadata?.bookingId;
    const success = Boolean(response.ok && payload.status && payload.data?.status === "success");

    return {
      success,
      bookingId: bookingId ?? "",
      reference: payload.data?.reference ?? reference,
    };
  }
}
