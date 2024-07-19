import prisma from "../db";
const blogPerPage = 6;
export const getBlogsDb = async (page: number) => {
  try {
    const blogs = await prisma.blog.findMany({
      skip: (page - 1) * blogPerPage,
      take: blogPerPage,
      select: {
        id: true,
        title: true,
        contents: true,
        author: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return blogs;
  } catch (error) {
    throw error;
  }
};
