import prisma from "../db";

export const totalBlogCountDb = async (authorId: string | null) => {
  try {
    const num = await prisma.blog.count({
      where: {
        authorId: authorId || undefined,
      },
    });
    return num;
  } catch (error) {
    throw error;
  }
};
