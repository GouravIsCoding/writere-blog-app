"use server";

import { asyncHandler } from "@/utils/asyncHandler";
import { blogIdZodSchema } from "@/schema/blogId";
import { getBlogByIdDb } from "@/db/blog/getById";

export async function getBlogByIdAction(blogId: string) {
  return asyncHandler(async () => {
    blogIdZodSchema.parse(blogId);

    const blog = await getBlogByIdDb(blogId);

    if (!blog) return { error: "No blog with such Id" };

    return {
      data: { blog },
      message: "Blog creation Successful!",
    };
  });
}
