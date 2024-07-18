"use server";

import { totalBlogCountDb } from "@/db/blog/totalCount";
import { asyncHandler } from "@/utils/asyncHandler";

export async function getBlogCountAction() {
  return asyncHandler(async () => {
    const count = await totalBlogCountDb();

    return {
      data: { count },
      message: "Blog count!",
    };
  });
}
