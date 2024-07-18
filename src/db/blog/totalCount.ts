import prisma from "../db";

export const totalBlogCountDb = async () => {
  try {
    const num = await prisma.blog.count({});
    return num;
  } catch (error) {
    throw error;
  }
};
