import { z } from "zod";
import {
  opportunityCategories,
  opportunityKinds,
  opportunityTypes,
} from "@/lib/constants";

export const opportunityFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters."),
  organization: z
    .string()
    .trim()
    .min(2, "Organization must be at least 2 characters."),
  category: z.enum(opportunityCategories),
  location: z.string().trim().min(2, "Location is required."),
  type: z.enum(opportunityTypes),
  opportunityType: z.enum(opportunityKinds),
  deadline: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Choose a valid deadline.",
  }),
  description: z
    .string()
    .trim()
    .min(25, "Description must be at least 25 characters."),
  requirements: z
    .string()
    .trim()
    .min(5, "Add at least one requirement."),
  applyLink: z.string().trim().url("Enter a valid apply link."),
  tags: z.string().trim().min(2, "Add at least one tag."),
  featured: z.boolean(),
  status: z.enum(["approved", "pending", "rejected"]),
  submittedBy: z.string().trim().optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  topic: z.string().trim().min(3, "Topic is required."),
  message: z.string().trim().min(20, "Message must be at least 20 characters."),
});

export const authSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  role: z.enum(["student", "organization", "admin"]),
});

export const cvSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  headline: z.string().trim().min(3, "Headline is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(5, "Phone is required."),
  location: z.string().trim().min(2, "Location is required."),
  summary: z.string().trim().min(20, "Summary must be at least 20 characters."),
  education: z.string().trim().min(5, "Education is required."),
  skills: z.string().trim().min(5, "Skills are required."),
  experience: z.string().trim().min(5, "Experience is required."),
  links: z.string().trim().optional(),
});

export type OpportunityFormValues = z.infer<typeof opportunityFormSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type AuthFormValues = z.infer<typeof authSchema>;
export type CvFormValues = z.infer<typeof cvSchema>;
