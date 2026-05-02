"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "";
  const paystackReference = searchParams.get("reference") || "";
  const trxref = searchParams.get("trxref") || "";
  const txRef =
    paystackReference || trxref || searchParams.get("tx_ref") || "";

  const isSuccess =
    status.toLowerCase() === "success" ||
    status.toLowerCase() === "successful";

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <div
        className={`rounded-2xl border p-6 ${
          isSuccess
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <h1 className="text-2xl font-bold text-slate-900">
          {isSuccess ? "Payment Completed" : "Payment Pending"}
        </h1>

        <p className="mt-2 text-sm text-slate-700">
          {isSuccess
            ? "Your booking payment was received successfully. Our team will contact you shortly."
            : "We could not confirm a successful payment yet. If you were charged, contact support with your reference."}
        </p>

        {txRef ? (
          <p className="mt-3 text-xs text-slate-600">
            Reference: {txRef}
          </p>
        ) : null}

        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <PaymentCallbackContent />
    </Suspense>
  );
}