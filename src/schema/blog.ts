import { z } from "zod";

export type contentType = {
  type: "PARAGRAPH" | "IMAGE";
  content: string | null;
};

export type editContentType = {
  id?: number;
  type: "PARAGRAPH" | "IMAGE";
  content: string | null;
  order: number;
};

export const contentZodSchema = z.array(
  z.object({
    id: z.number().optional(),
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
    name: string;
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

export type blogListType = {
  para: string | undefined;
  image: string | undefined;
  id: string;
  createdAt: string;
  title: string;
  author: {
    name: string;
  };
};
