"use server";

import { contentType, contentZodSchema } from "@/schema/blog";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";
import { createBlogDb } from "@/db/blog/create";
import { revalidatePath } from "next/cache";

export async function createBlogAction(title: string, contents: contentType[]) {
  return asyncHandler(async () => {
    contentZodSchema.parse(contents);

    const session = await getServerSession(authOptions);

    if (!session?.user.id) return { error: "User not logged in!" };

    const createdBlog = await createBlogDb(title, session?.user.id, contents);

    revalidatePath("/blogs");
    revalidatePath("/dashboard/myblog");

    return {
      data: { blogId: createdBlog.id },
      message: "Blog creation Successful!",
    };
  });
}
