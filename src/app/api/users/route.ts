import { NextResponse } from "next/server";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

type UserRole = "user" | "admin";

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { id?: string; role?: string };

    const id = normalizeText(body.id);
    const role = normalizeText(body.role) as UserRole;

    if (!id) {
      return NextResponse.json({ message: "id is required." }, { status: 400 });
    }

    if (role !== "user" && role !== "admin") {
      return NextResponse.json({ message: "role must be user or admin." }, { status: 400 });
    }

    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const currentRole = normalizeText((userSnap.data() as { role?: string }).role) as UserRole;
    if (currentRole === role) {
      return NextResponse.json({ message: "User already has this role.", role }, { status: 200 });
    }

    if (currentRole === "admin" && role === "user") {
      const adminsQuery = query(collection(db, "users"), where("role", "==", "admin"));
      const adminsSnap = await getDocs(adminsQuery);

      if (adminsSnap.size <= 1) {
        return NextResponse.json(
          { message: "Cannot demote the last admin user." },
          { status: 400 }
        );
      }
    }

    await updateDoc(userRef, {
      role,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "User role updated.", role }, { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ message: "Failed to update user role" }, { status: 500 });
  }
}
