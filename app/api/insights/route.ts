import { NextResponse } from "next/server";
import { mockInsights } from "@/lib/utils/mock-data";

export async function GET() {
  // In production, this would use the LLM to analyze real PayPal data
  // For now, return mock insights
  return NextResponse.json({ insights: mockInsights });
}
