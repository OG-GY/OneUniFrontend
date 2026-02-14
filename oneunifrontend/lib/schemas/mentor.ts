// lib/schemas/mentor.ts
import { z } from "zod";

export const mentorProfileSchema = z.object({
  // Personal & Professional
  fullName: z.string().trim().min(1, "Full Name Required"),
  email: z.string().trim().min(1, "Email Required").email("Invalid email"),
  phone: z.string().trim().min(1, "Contact Number Required"),
  position: z.enum(["Student", "Teacher", "Administration", "Employee"]),
  institution: z.string().trim().min(1, "Company or Institute Required"),
  experienceYears: z.string().min(1, "Years of Experience Required"),
  bio: z.string().trim().min(10, "Bio should be at least 10 characters").max(500, "Bio too long"),
  photo: z.custom<File>().nullable(),

  // Guidance Area
  guidanceTopics: z.array(z.string()).min(1, "Select at least one guidance topic"),
  // Options: Admission, University Selection, General Guidance, Career, Technical

  // Availability
  availableDays: z.array(z.string()).min(1, "Select at least one available day"),
  timeRangeStart: z.string().min(1, "Start time required"),
  timeRangeEnd: z.string().min(1, "End time required"),

  // Documents
  cnicFront: z.custom<File | null>().refine((file) => !!file, { message: "CNIC Front Required" }),
  degreeDoc: z.custom<File | null>().refine((file) => !!file, { message: "Degree/Employment Proof Required" }),
});

export type MentorProfileData = z.infer<typeof mentorProfileSchema>;
