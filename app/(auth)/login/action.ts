"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constant";
import { z } from "zod";
import { logUserIn } from "@/lib/session";
import { api } from "@/lib/fetchWrapper";

interface FormDataContent {
  email: string;
  password: string;
}

async function handleSignIn(formData: { email: string; password: string }) {
  const res = await api.public.post(
    process.env.API_URL + "/auth/sign-in",
    formData
  );

  if (!res.result) {
    console.log(res.message);
    return;
  }

  return res.payload;
}

const formSchema = z.object({
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: FormDataContent, formData: FormData) => {
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
    const user = await handleSignIn(result.data); // TODO Replace with actual password verification logic
    if (user) {
      return await logUserIn(user);
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
