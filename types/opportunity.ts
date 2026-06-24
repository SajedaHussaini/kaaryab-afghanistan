export type OpportunityCategory =
  | "Job"
  | "Internship"
  | "Scholarship"
  | "Online Course"
  | "Remote Work"
  | "Training Program"
  | "Volunteer Work";

export type OpportunityType = "Remote" | "On-site" | "Hybrid";

export type OpportunityKind =
  | "Full-time"
  | "Part-time"
  | "Self-paced"
  | "Cohort"
  | "Fellowship"
  | "Volunteer";

export type OpportunityStatus = "approved" | "pending" | "rejected";

export type UserRole = "student" | "organization" | "admin";

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  location: string;
  type: OpportunityType;
  opportunityType: OpportunityKind;
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  featured: boolean;
  status: OpportunityStatus;
  source: "demo" | "user";
  createdAt: string;
  updatedAt: string;
  submittedBy?: string;
};

export type OpportunityInput = Omit<
  Opportunity,
  "id" | "createdAt" | "updatedAt" | "source"
>;

export type OpportunityFilters = {
  query: string;
  category: "All" | OpportunityCategory;
  location: string;
  type: "All" | OpportunityType;
  deadline: "All" | "7" | "14" | "30" | "Expired";
  opportunityType: "All" | OpportunityKind;
};

export type DashboardStats = {
  total: number;
  jobs: number;
  scholarships: number;
  internships: number;
  remote: number;
  expiringSoon: number;
  pending: number;
  featured: number;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export type CvProfile = {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: string;
  skills: string;
  experience: string;
  links: string;
};
