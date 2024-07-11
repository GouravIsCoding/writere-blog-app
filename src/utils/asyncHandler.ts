import { formatZodError } from "@/utils/zodFormatter";
import { ZodError } from "zod";

export const asyncHandler = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ZodError) return { error: formatZodError(error) };
    if (error instanceof Error) {
      console.error(error.message);
      return { error: "Something went wrong" };
    }
  }
};
