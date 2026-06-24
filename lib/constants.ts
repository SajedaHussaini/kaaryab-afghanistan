import type {
  OpportunityCategory,
  OpportunityFilters,
  OpportunityKind,
  OpportunityType,
} from "@/types/opportunity";

export const opportunityCategories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Remote Work",
  "Training Program",
  "Volunteer Work",
] as const satisfies readonly OpportunityCategory[];

export const opportunityTypes = [
  "Remote",
  "On-site",
  "Hybrid",
] as const satisfies readonly OpportunityType[];

export const opportunityKinds = [
  "Full-time",
  "Part-time",
  "Self-paced",
  "Cohort",
  "Fellowship",
  "Volunteer",
] as const satisfies readonly OpportunityKind[];

export const defaultFilters: OpportunityFilters = {
  query: "",
  category: "All",
  location: "All",
  type: "All",
  deadline: "All",
  opportunityType: "All",
};

export const storageKeys = {
  opportunities: "kaaryab-opportunities",
  saved: "kaaryab-saved-opportunities",
  theme: "kaaryab-theme",
  user: "kaaryab-user",
} as const;

export const appNavItems = [
  { href: "/", label: "Home" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/saved", label: "Saved" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/cv-builder", label: "CV Builder" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
