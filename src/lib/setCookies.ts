import { z } from "zod";
import { CustomError } from "./error";

export const cookieSchema = z.object({
  name: z
    .string({ required_error: "Cookie name is required." })
    .min(1, "Cookie name cannot be empty.")
    .max(255, "Cookie name cannot exceed 255 characters.")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Cookie name must consist of alphanumeric characters, hyphens, and underscores."
    ),

  value: z
    .string({ required_error: "Cookie value is required." })
    .min(1, "Cookie value cannot be empty.")
    .max(4096, "Cookie value cannot exceed 4096 characters."),
});

export const deleteCookiesSchema = cookieSchema.pick({ name: true });

export type ISetcookies = z.infer<typeof cookieSchema>;

export const cookiesApi = async <T>(data: T, endpoint: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new CustomError("Internal Server Error", 500);
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
