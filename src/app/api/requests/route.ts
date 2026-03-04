
export async function POST() {}
export async function PUT() {}
export async function DELETE() {}

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Request endpoint working" });
}