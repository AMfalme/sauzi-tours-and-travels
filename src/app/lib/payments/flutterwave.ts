import Flutterwave from "flutterwave-node-v3";
import type { PaymentProviderInterface, PaymentRequest } from "./payments";

function getFlutterwaveClient() {
  const publicKey = process.env.FLW_PUBLIC_KEY;
  const secretKey = process.env.FLW_SECRET_KEY;

  if (!publicKey || !secretKey) {
    throw new Error("Flutterwave keys are not configured.");
  }

  return new Flutterwave(publicKey, secretKey);
}

export class FlutterwaveProvider implements PaymentProviderInterface {
  async initializePayment(data: PaymentRequest) {
    const flw = getFlutterwaveClient();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
    }

    const payload = {
      tx_ref: data.bookingId,
      amount: data.amount,
      currency: data.currency,
      redirect_url: `${baseUrl}/payment/callback`,
      customer: {
        email: data.email,
      },
      customizations: {
        title: "Sauzi Tours & Travels",
        description: `Payment for booking ${data.bookingId}`,
      },
      payment_options: "card,mobilemoney,mpesa",
    };

    const response = await flw.Payment.initiate(payload);

    if (!response?.data?.link) {
      throw new Error("Flutterwave did not return a checkout link.");
    }

    return {
      paymentUrl: response.data.link,
    };
  }

  async verifyTransaction(transactionId: number | string) {
    const flw = getFlutterwaveClient();
    const response = await flw.Transaction.verify({ id: Number(transactionId) });

    return {
      success: response.status === "success" && response.data?.status === "successful",
      txRef: response.data?.tx_ref ?? "",
    };
  }
}