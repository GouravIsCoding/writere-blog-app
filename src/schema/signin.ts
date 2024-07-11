import { z } from "zod";

export const signinZodSchema = z.object({
  email: z
    .string({ message: "name must be a string" })
    .email({ message: "Must be a valid email" }),

  password: z
    .string({ message: "password must be a string" })
    .min(6, { message: "password must be atleast 6 characters" })
    .max(50, "password must be within 50 characters"),
});
