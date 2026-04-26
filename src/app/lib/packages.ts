import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export const PACKAGE_CATEGORIES = [
  "popular",
  "safari",
  "beach",
  "cultural",
  "destination",
  "honeymoon",
  "adventure",
  "group-tour",
  "corporate",
] as const;

export type PackageCategory = (typeof PACKAGE_CATEGORIES)[number];

export type PackageStatus = "active" | "inactive";

export type CreatePackageInput = {
  title: string;
  category: PackageCategory;
  starRating: number | null;
  location: string;
  price: number;
  currency: string;
  duration: string;
  featured: boolean;
  status: PackageStatus;
  images: string[];
  description: string;
  includes: string[];
};

export type PackageRecord = CreatePackageInput & {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type UpdatePackageInput = Partial<CreatePackageInput>;

function toIso(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const withDate = value as { toDate?: () => Date };
  if (typeof withDate.toDate === "function") {
    return withDate.toDate().toISOString();
  }
  return null;
}

function mapPackage(id: string, data: Record<string, unknown>): PackageRecord {
  const rawStarRating = data.starRating;
  const starRating =
    typeof rawStarRating === "number" && Number.isFinite(rawStarRating)
      ? rawStarRating
      : null;

  return {
    id,
    title: (data.title as string) ?? "",
    category: (data.category as PackageCategory) ?? "safari",
    starRating,
    location: (data.location as string) ?? "",
    price: Number(data.price ?? 0),
    currency: (data.currency as string) ?? "KES",
    duration: (data.duration as string) ?? "",
    featured: Boolean(data.featured),
    status: (data.status as PackageStatus) ?? "active",
    images: Array.isArray(data.images) ? (data.images as string[]) : [],
    description: (data.description as string) ?? "",
    includes: Array.isArray(data.includes) ? (data.includes as string[]) : [],
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export async function createPackage(input: CreatePackageInput): Promise<PackageRecord> {
  const createdRef = await addDoc(collection(db, "packages"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const createdSnap = await getDoc(doc(db, "packages", createdRef.id));
  if (!createdSnap.exists()) {
    throw new Error("Failed to create package");
  }

  const data = createdSnap.data();

  return mapPackage(createdSnap.id, data as Record<string, unknown>);
}

export async function getAllPackages(): Promise<PackageRecord[]> {
  const packagesQuery = query(collection(db, "packages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(packagesQuery);
  return snap.docs.map((item) => mapPackage(item.id, item.data() as Record<string, unknown>));
}

export async function updatePackageById(id: string, input: UpdatePackageInput): Promise<PackageRecord | null> {
  const packageRef = doc(db, "packages", id);

  await updateDoc(packageRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });

  const updatedSnap = await getDoc(packageRef);
  if (!updatedSnap.exists()) return null;

  return mapPackage(updatedSnap.id, updatedSnap.data() as Record<string, unknown>);
}

export async function deletePackageById(id: string): Promise<void> {
  await deleteDoc(doc(db, "packages", id));
}
