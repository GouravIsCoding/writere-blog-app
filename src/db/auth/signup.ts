import { signupZodType } from "@/schema/signup";
import prisma from "../db";

export const signupDb = async (user: signupZodType) => {
  try {
    const signedupUser = await prisma.user.create({
      data: user,
    });

    return {
      id: signedupUser.id,
      name: signedupUser.name,
      email: signedupUser.email,
      bio: signedupUser.bio,
    };
  } catch (error) {
    throw error;
  }
};
