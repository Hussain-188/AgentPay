import { getAllApprovals } from "@/lib/store/approval-store";

export async function GET() {
  const approvals = getAllApprovals();
  return new Response(JSON.stringify({ approvals }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
