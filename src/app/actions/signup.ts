"use server";

import { signupZodSchema } from "@/schema/signup";
import { asyncHandler } from "@/utils/asyncHandler";
import { signupZodType } from "@/schema/signup";
import { hashPassword } from "@/utils/bcrypt";
import { signupDb } from "@/db/auth/signup";

export async function signupAction(userDetails: signupZodType) {
  return asyncHandler(async () => {
    const user = signupZodSchema.parse(userDetails);

    const hashedPassword = await hashPassword(user.password);

    user.password = hashedPassword;

    const signedUpUser = await signupDb(user);

    return { data: signedUpUser, message: "Signup Successful!" };
  });
}
