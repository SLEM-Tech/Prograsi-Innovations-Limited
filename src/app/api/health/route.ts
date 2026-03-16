import { NextResponse } from "next/server";
import { queryOne } from "@src/lib/db";

// GET /api/health
export async function GET() {
  try {
    await queryOne("SELECT 1");
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", db: "disconnected", detail: error.message },
      { status: 500 },
    );
  }
}
