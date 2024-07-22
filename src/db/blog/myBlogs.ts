import prisma from "../db";
const blogPerPage = 6;
export const myBlogsDb = async (page: number, authorId: string) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId,
      },
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
