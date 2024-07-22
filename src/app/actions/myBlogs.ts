"use server";

import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";
import { myBlogsDb } from "@/db/blog/myBlogs";

export async function myBlogsAction(page: number) {
  return asyncHandler(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) return { error: "User not logged in!" };

    const blogs = await myBlogsDb(page, session.user.id);

    if (!blogs.length) return { error: "No blogs available at the moment" };

    const filteredBlogs = blogs.map((blog) => {
      let para: string | undefined, image: string | undefined;
      for (let content of blog.contents) {
        if (para && image) break;
        if (content.contentType === "IMAGE" && !image && content.imageUrl)
          image = content.imageUrl;
        else if (content.contentType === "PARAGRAPH" && !para && content.text)
          para = content.text;
      }
      return {
        para,
        image,
        id: blog.id,
        createdAt: blog.createdAt,
        title: blog.title,
        author: { name: blog.author.name },
      };
    });

    return {
      data: { blogs: filteredBlogs },
      message: "Blogs fetched succesfully",
    };
  });
}
