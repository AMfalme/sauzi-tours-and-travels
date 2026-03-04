import { NextResponse } from "next/server";

export async function POST() {}
export async function PUT() {}
export async function DELETE() {}


export async function GET() {
  return NextResponse.json({ message: "Notifications endpoint working" });
}