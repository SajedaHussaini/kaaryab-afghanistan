import { Badge } from "@/components/ui/Badge";
import type { OpportunityStatus } from "@/types/opportunity";

const toneByStatus: Record<OpportunityStatus, "green" | "amber" | "rose"> = {
  approved: "green",
  pending: "amber",
  rejected: "rose",
};

export function StatusBadge({ status }: { status: OpportunityStatus }) {
  return <Badge tone={toneByStatus[status]}>{status}</Badge>;
}
