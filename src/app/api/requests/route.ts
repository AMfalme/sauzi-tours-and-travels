import { NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/app/lib/bookings";
import { getAllPackages, updatePackageById } from "@/app/lib/packages";

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

    // Check if package has available slots before creating booking
    const packages = await getAllPackages();
    const bookedPackage = packages.find(pkg => pkg.title === packageName);

    if (bookedPackage && bookedPackage.availableSlots !== undefined) {
      if (bookedPackage.availableSlots <= 0) {
        return NextResponse.json(
          { message: "This package is fully booked and no longer available." },
          { status: 400 }
        );
      }
    }

    const createdBooking = await createBooking({
      fullName,
      email,
      travelDate,
      packageName,
      notes: body.notes?.trim() ?? "",
    });

    // Update package slots if applicable
    try {
      if (bookedPackage && bookedPackage.availableSlots !== undefined && bookedPackage.availableSlots > 0) {
        const newAvailableSlots = bookedPackage.availableSlots - 1;
        await updatePackageById(bookedPackage.id, {
          availableSlots: newAvailableSlots
        });
      }
    } catch (slotUpdateError) {
      console.error("Error updating package slots:", slotUpdateError);
      // Don't fail the booking if slot update fails, just log it
    }

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