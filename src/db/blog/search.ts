import prisma from "../db";
const blogLimit = 10;
export const searchBlogsDb = async (name: string) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        contents: true,
        author: true,
        createdAt: true,
      },
      skip: 0,
      take: blogLimit,
    });

    return blogs;
  } catch (error) {
    throw error;
  }
};
