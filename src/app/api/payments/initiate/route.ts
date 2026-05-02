import { NextResponse } from "next/server";
import { PaystackProvider } from "@/app/lib/payments/paystack";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      amount?: number;
      currency?: string;
      email?: string;
      bookingId?: string;
    };

    const amount = Number(body.amount);
    const currency = body.currency?.trim() || "KES";
    const email = body.email?.trim() || "";
    const bookingId = body.bookingId?.trim() || "";

    if (!email || !bookingId || Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { message: "amount, email and bookingId are required." },
        { status: 400 }
      );
    }

    const provider = new PaystackProvider();
    const payment = await provider.initializePayment({ amount, currency, email, bookingId });

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json({ message: "Failed to initialize payment" }, { status: 500 });
  }
}
