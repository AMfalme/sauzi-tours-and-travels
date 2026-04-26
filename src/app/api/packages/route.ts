import { NextResponse } from "next/server";
import {
  createPackage,
  deletePackageById,
  getAllPackages,
  PACKAGE_CATEGORIES,
  type CreatePackageInput,
  type PackageStatus,
  updatePackageById,
} from "@/app/lib/packages";

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseStarRating(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return parsed;
}

function isValidStarRating(value: number): boolean {
  return value >= 0 && value <= 5;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreatePackageInput>;

    const title = normalizeText(body.title);
    const category = normalizeText(body.category) as CreatePackageInput["category"];
    const location = normalizeText(body.location);
    const price = Number(body.price);
    const currency = normalizeText(body.currency) || "KES";
    const duration = normalizeText(body.duration);
    const featured = Boolean(body.featured);
    const status = normalizeText(body.status) as PackageStatus;
    const description = normalizeText(body.description);
    const starRating = parseStarRating(body.starRating);

    const images = Array.isArray(body.images)
      ? body.images.map((item) => normalizeText(item)).filter(Boolean)
      : [];

    const includes = Array.isArray(body.includes)
      ? body.includes.map((item) => normalizeText(item)).filter(Boolean)
      : [];

    if (!title || !category || !location || !duration || !description) {
      return NextResponse.json(
        { message: "title, category, location, duration and description are required." },
        { status: 400 }
      );
    }

    if (!PACKAGE_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { message: "Invalid category." },
        { status: 400 }
      );
    }

    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json(
        { message: "price must be a valid positive number." },
        { status: 400 }
      );
    }

    if (status !== "active" && status !== "inactive") {
      return NextResponse.json(
        { message: "status must be active or inactive." },
        { status: 400 }
      );
    }

    if (category === "popular") {
      if (starRating === null || !isValidStarRating(starRating)) {
        return NextResponse.json(
          { message: "starRating is required for popular packages and must be between 0 and 5." },
          { status: 400 }
        );
      }
    } else if (starRating !== null && !isValidStarRating(starRating)) {
      return NextResponse.json(
        { message: "starRating must be between 0 and 5." },
        { status: 400 }
      );
    }

    const created = await createPackage({
      title,
      category,
      starRating,
      location,
      price,
      currency,
      duration,
      featured,
      status,
      images,
      description,
      includes,
    });

    return NextResponse.json(
      { message: "Package created successfully", package: created },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json({ message: "Failed to create package" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const packages = await getAllPackages();
    return NextResponse.json({ packages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ message: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreatePackageInput> & { id?: string };
    const id = normalizeText(body.id);

    if (!id) {
      return NextResponse.json({ message: "id is required." }, { status: 400 });
    }

    const updates: Partial<CreatePackageInput> = {};

    if (body.title !== undefined) updates.title = normalizeText(body.title);
    if (body.location !== undefined) updates.location = normalizeText(body.location);
    if (body.duration !== undefined) updates.duration = normalizeText(body.duration);
    if (body.currency !== undefined) updates.currency = normalizeText(body.currency);
    if (body.description !== undefined) updates.description = normalizeText(body.description);
    if (body.featured !== undefined) updates.featured = Boolean(body.featured);

    if (body.starRating !== undefined) {
      if (body.starRating === null) {
        updates.starRating = null;
      } else {
        const starRating = parseStarRating(body.starRating);
        if (starRating === null || !isValidStarRating(starRating)) {
          return NextResponse.json(
            { message: "starRating must be between 0 and 5." },
            { status: 400 }
          );
        }
        updates.starRating = starRating;
      }
    }

    if (body.price !== undefined) {
      const price = Number(body.price);
      if (Number.isNaN(price) || price < 0) {
        return NextResponse.json(
          { message: "price must be a valid positive number." },
          { status: 400 }
        );
      }
      updates.price = price;
    }

    if (body.category !== undefined) {
      const category = normalizeText(body.category) as CreatePackageInput["category"];
      if (!PACKAGE_CATEGORIES.includes(category)) {
        return NextResponse.json({ message: "Invalid category." }, { status: 400 });
      }
      updates.category = category;
    }

    if (body.status !== undefined) {
      const status = normalizeText(body.status) as PackageStatus;
      if (status !== "active" && status !== "inactive") {
        return NextResponse.json(
          { message: "status must be active or inactive." },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    if (body.images !== undefined) {
      updates.images = Array.isArray(body.images)
        ? body.images.map((item) => normalizeText(item)).filter(Boolean)
        : [];
    }

    if (body.includes !== undefined) {
      updates.includes = Array.isArray(body.includes)
        ? body.includes.map((item) => normalizeText(item)).filter(Boolean)
        : [];
    }

    const updated = await updatePackageById(id, updates);
    if (!updated) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Package updated", package: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json({ message: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = normalizeText(searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ message: "id query param is required." }, { status: 400 });
    }

    await deletePackageById(id);
    return NextResponse.json({ message: "Package deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json({ message: "Failed to delete package" }, { status: 500 });
  }
}
