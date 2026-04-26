"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "@/app/components/BookingForm";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  packageName?: string;
};

export default function BookingModal({ open, onClose, packageName }: BookingModalProps) {
  useEffect(() => {
    if (!open) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm px-4 py-6 md:py-10 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-auto w-full max-w-2xl rounded-2xl border bg-gradient-to-r shadow-2xl"
              style={{ borderColor: "var(--brand-primary-soft)", backgroundImage: "linear-gradient(90deg, var(--brand-primary-soft), #fffdf8)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-0">
              <div>
                  <p className="text-xs uppercase tracking-wide text-brand-primary font-semibold">Sauzi Tours</p>
                <h3 className="text-2xl font-bold text-gray-800 leading-tight">Book Your Adventure</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {packageName
                    ? `Complete your request for ${packageName}.`
                    : "Tell us your preferred package and date."}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking modal"
                className="rounded-full h-9 w-9 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <BookingForm
                initialPackageName={packageName}
                onSuccess={onClose}
                className="bg-white/95 border rounded-2xl shadow-md"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
