import { ApprovalRequest } from '@/lib/types';

const approvals: Map<string, ApprovalRequest> = new Map();

export function addApproval(approval: ApprovalRequest): void {
  approvals.set(approval.id, approval);
}

export function getApproval(id: string): ApprovalRequest | undefined {
  return approvals.get(id);
}

export function updateApproval(id: string, status: 'approved' | 'rejected'): ApprovalRequest | undefined {
  const approval = approvals.get(id);
  if (approval) {
    approval.status = status;
    approval.resolvedAt = new Date().toISOString();
    approvals.set(id, approval);
  }
  return approval;
}

export function getAllApprovals(): ApprovalRequest[] {
  return Array.from(approvals.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPendingApprovals(): ApprovalRequest[] {
  return getAllApprovals().filter((a) => a.status === 'pending');
}

export function getApprovalsByStatus(status: ApprovalRequest['status']): ApprovalRequest[] {
  return getAllApprovals().filter((a) => a.status === status);
}
