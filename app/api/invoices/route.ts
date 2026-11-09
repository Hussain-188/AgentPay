import { NextResponse } from "next/server";
import { mockInvoices } from "@/lib/utils/mock-data";

export async function GET() {
  // In production, this would call PayPal's Invoicing API
  // For now, return mock data for the dashboard
  return NextResponse.json({ invoices: mockInvoices });
}
