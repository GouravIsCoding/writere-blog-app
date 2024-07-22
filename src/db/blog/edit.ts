import { editContentType } from "@/schema/blog";
import prisma from "../db";

export const editBlogDb = async (
  title: string,
  authorId: string,
  blogId: string,
  createContents: editContentType[],
  updateContents: editContentType[]
) => {
  try {
    const blog = await prisma.blog.update({
      where: { authorId, id: blogId },
      data: {
        title,
        contents: {
          createMany: {
            data: createContents.map((item) => ({
              contentType: item.type,
              contentOrder: item.order,
              text: item.type === "PARAGRAPH" ? item.content : null,
              imageUrl: item.type === "IMAGE" ? item.content : null,
            })),
          },
          updateMany: updateContents.map((item) => ({
            where: {
              id: item.id,
            },
            data: {
              contentOrder: item.order,
            },
          })),
        },
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
