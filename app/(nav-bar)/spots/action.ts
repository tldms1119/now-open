"use server";

import { TIME_REGEX, TIME_REGEX_ERROR } from "@/lib/constant";
import { api } from "@/lib/fetchWrapper";
import { redirect } from "next/navigation";
import { z } from "zod";

interface FormDataContent {
  name: string;
  desc: string;
  longitude: string;
  latitude: string;
  businessHours: object[];
}

const spotSchema = z.object({
  name: z.string().min(3).max(30),
  desc: z.string().optional(),
  longitude: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= -180 && val <= 180, {
      message: "Longitude must be between -180 and 180.",
    }),
  latitude: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= -90 && val <= 90, {
      message: "Latitude must be between -90 and 90.",
    }),
  businessHours: z
    .array(
      z.object({
        dayOfWeek: z.number().int().min(0).max(6),
        openTime: z.string().regex(TIME_REGEX, TIME_REGEX_ERROR),
        closeTime: z.string().regex(TIME_REGEX, TIME_REGEX_ERROR),
      })
    )
    .optional(),
});

export async function createSpot(prev: FormDataContent, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    desc: formData.get("desc") as string,
    longitude: formData.get("longitude") as string,
    latitude: formData.get("latitude") as string,
    businessHours: JSON.parse(formData.get("businessHours") as string) || [],
  };
  const result = spotSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      ...data,
    };
  } else {
    console.log("Validated data:", result.data);
    // TODO start from here
    // fix select default check and time defaults values
    const res = await api.public.post(
      process.env.API_URL + "/spots/register",
      result.data
    );
    if (!res.result) {
      return {
        ...data,
        error: {
          fieldErrors: {
            name: [],
            desc: [],
            latitude: [],
            longitude: [],
            businessHours: [],
          },
          formErrors: [res.message || "An error occurred."],
        },
      };
    } else {
      return redirect("/spots");
    }
  }
}
