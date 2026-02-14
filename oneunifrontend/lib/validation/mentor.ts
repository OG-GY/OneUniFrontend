// lib/validation/mentor.ts
import { z, ZodError, ZodObject } from "zod";
import { MentorProfileData } from "@/lib/schemas/mentor";

export type MentorInfoErrors = Partial<Record<keyof MentorProfileData | string, string>>;

function zodToInfoErrors(error: ZodError): MentorInfoErrors {
  const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
  const errors: MentorInfoErrors = {};
  for (const key in fieldErrors) {
    const msg = fieldErrors[key]?.[0];
    if (msg) {
      errors[key] = msg;
    }
  }
  return errors;
}

export function ValidateMentorPersonalInfo(data: Partial<MentorProfileData>): MentorInfoErrors {
  const errors: MentorInfoErrors = {};
  if (!data.fullName) errors.fullName = "Full Name Required";
  if (!data.email) errors.email = "Email Required";
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Invalid email";
  if (!data.phone) errors.phone = "Phone Required";
  return errors;
}

export function ValidateMentorProfessional(data: Partial<MentorProfileData>): MentorInfoErrors {
  const errors: MentorInfoErrors = {};
  if (!data.position) errors.position = "Position Required";
  if (!data.institution) errors.institution = "Institution Required";
  if (!data.experienceYears) errors.experienceYears = "Experience Required";
  if (!data.bio || data.bio.length < 10) errors.bio = "Bio must be at least 10 characters";
  return errors;
}

export function ValidateMentorGuidance(data: Partial<MentorProfileData>): MentorInfoErrors {
  const errors: MentorInfoErrors = {};
  if (!data.guidanceTopics || data.guidanceTopics.length === 0) {
    errors.guidanceTopics = "Select at least one topic";
  }
  return errors;
}

export function ValidateMentorAvailability(data: Partial<MentorProfileData>): MentorInfoErrors {
  const errors: MentorInfoErrors = {};
  if (!data.availableDays || data.availableDays.length === 0) {
    errors.availableDays = "Select at least one day";
  }
  return errors;
}
