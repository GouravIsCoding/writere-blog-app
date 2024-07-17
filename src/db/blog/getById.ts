import prisma from "../db";

export const getBlogByIdDb = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        createdAt: true,
        contents: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return blog;
  } catch (error) {
    throw error;
  }
};
