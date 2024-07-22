import prisma from "../db";

export const getBlogByIdDb = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        createdAt: true,
        contents: {
          select: {
            id: true,
            contentOrder: true,
            contentType: true,
            text: true,
            imageUrl: true,
          },
          orderBy: { contentOrder: "asc" },
        },
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
