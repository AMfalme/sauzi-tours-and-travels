// /app/api/payments/webhook/route.ts
import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { PaystackProvider } from "../paystack";
import { updateBookingStatus } from "@/app/lib/bookings";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;
    const signature = req.headers.get("x-paystack-signature");

    if (!secretKey || !signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const rawBody = await req.text();
    const computedSignature = createHmac("sha512", secretKey).update(rawBody).digest("hex");

    if (computedSignature !== signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as {
      event?: string;
      data?: {
        reference?: string;
      };
    };

    if (payload.event !== "charge.success") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    const reference = payload.data?.reference ?? "";
    const provider = new PaystackProvider();

    if (!reference) {
      return NextResponse.json({ message: "Missing transaction data" }, { status: 400 });
    }

    const verification = await provider.verifyTransaction(reference);
    if (!verification.success) {
      return NextResponse.json({ message: "Transaction verification failed" }, { status: 400 });
    }

    const bookingId = verification.bookingId;
    if (!bookingId) {
      return NextResponse.json({ message: "Missing booking reference" }, { status: 400 });
    }

    await updateBookingStatus(bookingId, "confirmed");

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Webhook handling failed:", error);
    return NextResponse.json({ message: "Webhook handling failed" }, { status: 500 });
  }
}