export type PaymentProvider = "paystack";

export interface PaymentRequest {
  amount: number;
  currency: string;
  email: string;
  bookingId: string;
}

export interface PaymentResponse {
  paymentUrl: string;
}

export interface PaymentProviderInterface {
  initializePayment(data: PaymentRequest): Promise<PaymentResponse>;
}