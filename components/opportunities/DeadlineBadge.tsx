import { Badge } from "@/components/ui/Badge";
import { daysUntil } from "@/lib/utils";

export function DeadlineBadge({ deadline }: { deadline: string }) {
  const remaining = daysUntil(deadline);

  if (remaining < 0) {
    return <Badge tone="rose">Expired</Badge>;
  }

  if (remaining === 0) {
    return <Badge tone="rose">Due today</Badge>;
  }

  if (remaining <= 7) {
    return <Badge tone="amber">{remaining} days left</Badge>;
  }

  if (remaining <= 14) {
    return <Badge tone="sky">Expiring soon</Badge>;
  }

  return <Badge tone="neutral">{remaining} days left</Badge>;
}
