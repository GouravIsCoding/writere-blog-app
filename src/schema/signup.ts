import { z } from "zod";

export const signupZodSchema = z.object({
  email: z
    .string({ message: "name must be a string" })
    .email({ message: "Must be a valid email" }),
  name: z
    .string({ message: "name must be a string" })
    .min(2, { message: "name must be atleast 2 characters" })
    .max(50, "name must be within 50 characters"),
  password: z
    .string({ message: "password must be a string" })
    .min(6, { message: "password must be atleast 6 characters" })
    .max(50, "password must be within 50 characters"),
  bio: z
    .string({ message: "bio must be a string" })
    .min(12, { message: "bio must be atleast 12 characters" })
    .max(300, "bio must be within 300 characters")
    .optional()
    .or(z.literal("")),
});

export type signupZodType = z.infer<typeof signupZodSchema>;
