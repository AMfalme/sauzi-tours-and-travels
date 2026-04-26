import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const BOOKINGS_COLLECTION = "bookings";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type CreateBookingInput = {
  fullName: string;
  email: string;
  travelDate: string;
  packageName: string;
  notes?: string;
};

export type BookingRecord = {
  id: string;
  fullName: string;
  email: string;
  travelDate: string;
  packageName: string;
  notes: string;
  status: BookingStatus;
  createdAt: string | null;
  updatedAt: string | null;
};

function toIso(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return null;
}

function mapBooking(docSnap: QueryDocumentSnapshot<DocumentData>): BookingRecord {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    fullName: data.fullName ?? "",
    email: data.email ?? "",
    travelDate: data.travelDate ?? "",
    packageName: data.packageName ?? "",
    notes: data.notes ?? "",
    status: (data.status as BookingStatus) ?? "pending",
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export async function createBooking(input: CreateBookingInput): Promise<BookingRecord> {
  const createdRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...input,
    notes: input.notes ?? "",
    status: "pending" as BookingStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const createdSnap = await getDoc(doc(db, BOOKINGS_COLLECTION, createdRef.id));

  if (!createdSnap.exists()) {
    throw new Error("Booking creation failed");
  }

  const data = createdSnap.data();

  return {
    id: createdSnap.id,
    fullName: data.fullName ?? "",
    email: data.email ?? "",
    travelDate: data.travelDate ?? "",
    packageName: data.packageName ?? "",
    notes: data.notes ?? "",
    status: (data.status as BookingStatus) ?? "pending",
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  const bookingsQuery = query(
    collection(db, BOOKINGS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(bookingsQuery);

  return snap.docs.map(mapBooking);
}

export async function getBookingById(id: string): Promise<BookingRecord | null> {
  const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
  const bookingSnap = await getDoc(bookingRef);

  if (!bookingSnap.exists()) {
    return null;
  }

  const data = bookingSnap.data();

  return {
    id: bookingSnap.id,
    fullName: data.fullName ?? "",
    email: data.email ?? "",
    travelDate: data.travelDate ?? "",
    packageName: data.packageName ?? "",
    notes: data.notes ?? "",
    status: (data.status as BookingStatus) ?? "pending",
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}