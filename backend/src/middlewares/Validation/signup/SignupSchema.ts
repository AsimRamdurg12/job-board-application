import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["recruiter", "employee"]),
    profile: z
      .object({
        // name: z.string().min(1, 'Company name is required'),
        // website: z.string().url('Invalid website URL').optional(),
        // address: z.string().optional(),
        bio: z.string().min(10, "please add a bio"),
        skills: z.array(z.string()),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "recruiter" && !data) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company", "name"], // Correctly points to the company.name field
        message: "Company name is required for employers",
      });
    }
  });
