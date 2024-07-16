import { z } from "zod";

export type contentType = {
  type: "PARAGRAPH" | "IMAGE";
  content?: string;
};

export const contentZodSchema = z.array(
  z.object({
    type: z.union([z.literal("PARAGRAPH"), z.literal("IMAGE")]),
    content: z.string({ message: "content must be a string" }).optional(),
  })
);
