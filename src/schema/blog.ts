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

export type blogDisplayType = {
  id: string;
  title: string;
  createdAt: Date;
  author: {
    email: string;
    name: string | null;
  };
  contents: {
    id: number;
    blogId: string;
    contentType: "PARAGRAPH" | "IMAGE";
    contentOrder: number;
    text: string | null;
    imageUrl: string | null;
  }[];
};
