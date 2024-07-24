"use server";

import { asyncHandler } from "@/utils/asyncHandler";

import { searchNameZodSchema } from "@/schema/search";
import { searchBlogsDb } from "@/db/blog/search";

export async function searchBlogAction(name: string) {
  return asyncHandler(async () => {
    searchNameZodSchema.parse(name);

    const blogs = await searchBlogsDb(name);

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
      message: "Blog creation Successful!",
    };
  });
}
