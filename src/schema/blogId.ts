import { z } from "zod";

export const blogIdZodSchema = z
  .string({ message: "Id must be string" })
  .uuid({ message: "invalid id" });
