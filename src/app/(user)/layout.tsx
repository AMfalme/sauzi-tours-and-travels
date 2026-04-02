"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeToAuthChanges } from "@/app/lib/auth";
import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        setIsAuthed(true);
      } else {
        setIsAuthed(false);
        router.replace("/login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return <>{children}</>;
}

