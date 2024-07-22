"use server";

import { totalBlogCountDb } from "@/db/blog/totalCount";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";

export async function getBlogCountAction(authorId: boolean) {
  return asyncHandler(async () => {
    const session = await getServerSession(authOptions);

    const count = await totalBlogCountDb(authorId ? session?.user.id : null);

    return {
      data: { count },
      message: "Blog count!",
    };
  });
}
