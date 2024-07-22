"use server";

import { contentType, contentZodSchema, editContentType } from "@/schema/blog";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";
import { editBlogDb } from "@/db/blog/edit";

export async function editBlogAction(
  title: string,
  contents: editContentType[],
  blogId: string
) {
  return asyncHandler(async () => {
    contentZodSchema.parse(contents);

    const session = await getServerSession(authOptions);

    if (!session?.user.id) return { error: "User not logged in!" };

    contents = contents.map((item, index) => ({
      ...item,
      order: index,
    }));
    const createContents = contents.filter((item) => !item.id);
    const updateContents = contents.filter((item) => item.id);

    const updated = await editBlogDb(
      title,
      session.user.id,
      blogId,
      createContents,
      updateContents
    );
    if (!updated) return { error: "Blog update failed" };
    return {
      message: "Blog update Successful!",
    };
  });
}