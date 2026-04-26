import { NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/app/lib/bookings";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      travelDate?: string;
      packageName?: string;
      notes?: string;
    };

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const travelDate = body.travelDate?.trim() ?? "";
    const packageName = body.packageName?.trim() ?? "";

    if (!fullName || !email || !travelDate || !packageName) {
      return NextResponse.json(
        { message: "fullName, email, travelDate and packageName are required." },
        { status: 400 }
      );
    }

    const createdBooking = await createBooking({
      fullName,
      email,
      travelDate,
      packageName,
      notes: body.notes?.trim() ?? "",
    });

    return NextResponse.json(
      { message: "Booking created successfully", booking: createdBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ message: "Failed to create booking" }, { status: 500 });
  }
}

export async function PUT() {}
export async function DELETE() {}

export async function GET() {
  try {
    const bookings = await getAllBookings();
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
  }
}