import { NextResponse } from "next/server";
import { mockTransactions } from "@/lib/utils/mock-data";

export async function GET() {
  // In production, this would call PayPal's Transaction Search API
  // For now, return mock data for the dashboard
  return NextResponse.json({ transactions: mockTransactions });
}
