"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constant";
import { z } from "zod";
import { SessionContent, signUserIn } from "@/lib/session";
import { api } from "@/lib/fetchWrapper";

interface FormDataContent {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const signIn = async (
  prevState: FormDataContent,
  formData: FormData
) => {
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
    const res = await api.public.post(
      process.env.API_URL + "/auth/sign-in",
      result.data
    );
    if (!res.result) {
      return {
        ...data,
        error: {
          fieldErrors: {
            password: [res.message || "An error occurred."],
            email: [],
          },
        },
      };
    } else {
      return await signUserIn(res.payload as SessionContent);
    }
  }
};
