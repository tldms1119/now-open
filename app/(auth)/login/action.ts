"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constant";
import { z } from "zod";
import { logUserIn } from "@/lib/session";

const formSchema = z.object({
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      ...data,
      error: result.error.flatten(),
    };
  } else {
    // 0. if the user is found, check password hash
    const ok = true; // TODO Replace with actual password verification logic
    if (ok) {
      return await logUserIn(0); // TODO Replace with actual session management logic
    } else {
      return {
        ...data,
        error: {
          fieldErrors: {
            password: ["Wrong password."],
            email: [],
          },
        },
      };
    }
  }
};
