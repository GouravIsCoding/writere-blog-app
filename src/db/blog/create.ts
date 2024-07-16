import { contentType } from "@/schema/blog";
import prisma from "../db";

export const createBlogDb = async (
  title: string,
  authorId: string,
  contents: contentType[]
) => {
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        authorId,
        contents: {
          create: contents.map((block, index) => ({
            contentType: block.type,
            contentOrder: index,
            text: block.type === "PARAGRAPH" ? block.content : null,
            imageUrl: block.type === "IMAGE" ? block.content : null,
          })),
        },
      },
    });

    return { id: blog.id };
  } catch (error) {
    throw error;
  }
};
