import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, serverTimestamp, orderBy, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      destination?: string;
      date?: string;
      guests?: string;
      childrenAges?: string;
      name?: string;
      email?: string;
      phone?: string;
    };

    const destination = body.destination?.trim() ?? "";
    const date = body.date?.trim() ?? "";
    const guests = body.guests?.trim() ?? "";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";

    if (!destination || !date || !guests || !name || !email) {
      return NextResponse.json(
        { message: "destination, date, guests, name and email are required." },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "tour_requests"), {
      destination,
      date,
      guests,
      childrenAges: body.childrenAges?.trim() ?? "",
      name,
      email,
      phone: body.phone?.trim() ?? "",
      createdAt: serverTimestamp(),
      status: "new",
      source: "multi_step_form",
    });

    return NextResponse.json(
      { message: "Tour request created successfully", requestId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tour request:", error);
    return NextResponse.json({ message: "Failed to create tour request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const q = query(collection(db, "tour_requests"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const requests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tour requests:", error);
    return NextResponse.json({ message: "Failed to fetch tour requests" }, { status: 500 });
  }
}