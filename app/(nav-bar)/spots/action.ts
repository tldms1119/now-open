"use server";

import { TIME_REGEX, TIME_REGEX_ERROR } from "@/lib/constant";
import { api } from "@/lib/fetchWrapper";
import { saveImage } from "@/lib/file-utils";
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
        dayOfWeek: z.string(),
        openTime: z.string().regex(TIME_REGEX, TIME_REGEX_ERROR),
        closeTime: z.string().regex(TIME_REGEX, TIME_REGEX_ERROR),
      })
    )
    .optional()
    .refine(
      (arr) => !arr || arr.length === new Set(arr.map((v) => v.dayOfWeek)).size,
      {
        message: "Duplicated day Of week.",
        path: ["businessHours"],
      }
    ),
  photos: z.array(z.string()).optional(),
});

export async function createSpot(prev: FormDataContent, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    desc: formData.get("desc") as string,
    longitude: formData.get("longitude") as string,
    latitude: formData.get("latitude") as string,
    businessHours: JSON.parse(formData.get("businessHours") as string) || [],
    photos: formData.getAll("photos") as File[],
  };

  // upload photos to s3 and create urls
  // TODO change saveImage to uploadToS3
  let photoUrls: string[] = [];
  if (data.photos && data.photos.length > 0) {
    photoUrls = await Promise.all(data.photos.map((file) => saveImage(file)));
  }

  // add urls to validated data
  const result = await spotSchema.safeParseAsync({
    ...data,
    photos: photoUrls,
  });
  if (!result.success) {
    console.log("Validation Data:", data);
    console.error("Validation failed:", result.error.flatten());
    return {
      error: {
        ...result.error.flatten(),
        formErrors: [
          result.error.flatten().fieldErrors?.businessHours?.[0] || "",
        ],
      },
      ...data,
    };
  } else {
    console.log("Validated data:", result);
    const res = await api.auth.post(
      process.env.API_URL + "/spots",
      result.data
    );
    console.log("API Response:", res);
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
