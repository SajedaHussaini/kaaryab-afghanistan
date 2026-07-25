import type {
  DashboardStats,
  Opportunity,
  OpportunityFilters,
} from "@/types/opportunity";

const DAY_IN_MS = 86_400_000;

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const sortByDeadline = (a: Opportunity, b: Opportunity) =>
  a.deadline.localeCompare(b.deadline);

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function createId(prefix = "opp") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export function daysUntil(deadline: string) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const end = new Date(`${deadline}T00:00:00`);

  return Math.ceil((end.getTime() - start.getTime()) / DAY_IN_MS);
}

export function isExpiringSoon(deadline: string, days = 14) {
  const remaining = daysUntil(deadline);
  return remaining >= 0 && remaining <= days;
}

export function isExpired(deadline: string) {
  return daysUntil(deadline) < 0;
}

export function splitLines(value: string) {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinLines(value: string[]) {
  return value.join("\n");
}

function getApprovedOpportunities(opportunities: Opportunity[]) {
  return opportunities.filter(
    (item) => item.status === "approved",
  );
}

function groupOpportunities(
  opportunities: Opportunity[],
  selector: (item: Opportunity) => string,
) {
  const grouped = opportunities.reduce<Record<string, number>>(
    (acc, item) => {
      const key = selector(item);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getUniqueLocations(opportunities: Opportunity[]) {
  return Array.from(new Set(opportunities.map((item) => item.location))).sort();
}

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: OpportunityFilters,
  includePending = false,
) {
  const query = filters.query.trim().toLowerCase();

  return opportunities
    .filter((opportunity) => includePending || opportunity.status === "approved")
    .filter((opportunity) => {
      const searchableText = [
        opportunity.title,
        opportunity.organization,
        opportunity.description,
        opportunity.location,
        opportunity.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !query || searchableText.includes(query);

      const matchesCategory =
        filters.category === "All" || opportunity.category === filters.category;
      const matchesLocation =
        filters.location === "All" || opportunity.location === filters.location;
      const matchesType =
        filters.type === "All" || opportunity.type === filters.type;
      const matchesKind =
        filters.opportunityType === "All" ||
        opportunity.opportunityType === filters.opportunityType;

      const remainingDays = daysUntil(opportunity.deadline);
      const matchesDeadline =
        filters.deadline === "All" ||
        (filters.deadline === "Expired" && remainingDays < 0) ||
        (filters.deadline !== "Expired" &&
          remainingDays >= 0 &&
          remainingDays <= Number(filters.deadline));

      return (
        matchesQuery &&
        matchesCategory &&
        matchesLocation &&
        matchesType &&
        matchesKind &&
        matchesDeadline
      );
    })
    .sort(sortByDeadline);
}

export function getDashboardStats(opportunities: Opportunity[]): DashboardStats {
  const approved = getApprovedOpportunities(opportunities);

  return {
    total: opportunities.length,
    jobs: approved.filter((item) => item.category === "Job").length,
    scholarships: approved.filter((item) => item.category === "Scholarship")
      .length,
    internships: approved.filter((item) => item.category === "Internship")
      .length,
    remote: approved.filter((item) => item.type === "Remote").length,
    expiringSoon: approved.filter((item) => isExpiringSoon(item.deadline)).length,
    pending: opportunities.filter((item) => item.status === "pending").length,
    featured: approved.filter((item) => item.featured).length,
  };
}

export function getCategoryChartData(opportunities: Opportunity[]) {
  return groupOpportunities(
    getApprovedOpportunities(opportunities),
    (item) => item.category,
  );
}

export function getTypeChartData(opportunities: Opportunity[]) {
  return groupOpportunities(
    getApprovedOpportunities(opportunities),
    (item) => item.type,
  );
}

export function getRecentOpportunities(opportunities: Opportunity[], limit = 6) {
  return [...opportunities]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getFeaturedOpportunities(opportunities: Opportunity[]) {
  return opportunities
    .filter((item) => item.status === "approved" && item.featured)
    .sort(sortByDeadline);
}

export function getExpiringOpportunities(opportunities: Opportunity[]) {
  return opportunities
    .filter((item) => item.status === "approved" && isExpiringSoon(item.deadline))
    .sort(sortByDeadline);
};
