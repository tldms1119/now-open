"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constant";

import { z } from "zod";
import { redirect } from "next/navigation";
import { api } from "@/lib/fetchWrapper";

interface FormDataContent {
  email: string;
  username: string;
  password: string;
  confirm: string;
}

async function handleSignUp(formData: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await api.public.post(
    process.env.API_URL + "/auth/sign-up",
    formData
  );

  if (!res.result) {
    console.log(res.message);
    return;
  }

  return redirect("/login");
}

async function isEmailTaken(email: string) {
  const res = await (
    await fetch(process.env.API_URL + `/auth/check-email?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return res.result;
}

// 1단계: 기본 스키마
const baseSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .trim()
    .refine((username) => !username.includes("XXX"), "XXX Not allowed"),
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm: z.string().min(6),
});

// 2단계: password === confirm 검사
const matchPasswordSchema = baseSchema.refine(
  (data) => data.password === data.confirm,
  {
    path: ["confirm"],
    message: "Both passwords should be the same!",
  }
);

// 3단계: email 존재 검사
const finalFormSchema = matchPasswordSchema.transform(async (data, ctx) => {
  const isAvailable = await isEmailTaken(data.email);
  if (!isAvailable) {
    ctx.addIssue({
      path: ["email"],
      code: "custom",
      message: "This email is already taken.",
    });
    return z.NEVER;
  }
  return data;
});

export async function createAccount(
  prevState: FormDataContent,
  formData: FormData
) {
  const data = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirm: formData.get("confirm") as string,
  };
  const result = await finalFormSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      ...data,
      error: result.error.flatten(),
    };
  } else {
    return await handleSignUp({
      username: result.data.username,
      email: result.data.email,
      password: result.data.password,
    });
  }
}
