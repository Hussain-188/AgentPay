import { NextResponse } from "next/server";
import { seedSandboxData } from "@/lib/paypal/seed";

export async function POST() {
  try {
    const results = await seedSandboxData();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
