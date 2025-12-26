// src/lib/auth.tsx (or wherever your auth.tsx lives)

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export async function getCurrentUser(): Promise<User | null> {
  /**
   * 🔒 DUMMY IMPLEMENTATION
   * This simulates an unauthenticated user.
   * Replace later with real auth logic.
   */

  return null;
}
