import { CustomError } from "@/lib/error";
import { z, ZodSchema } from "zod";

export const validateData = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new CustomError(
      "Validation Error",
      400,
      result.error.errors.map((err) => err.message)
    );
  }
  return result.data;
};

export const isObjectId = (fieldName: string = "ID") =>
  z
    .string({
      required_error: `${fieldName} must be a string`,
      invalid_type_error: `${fieldName} must be a string`,
    })
    .refine(
      (val) => typeof val === "string" && /^[a-fA-F0-9]{24}$/.test(val),
      (val) => {
        return {
          message: `Invalid ${fieldName}: ${val}`,
        };
      }
    );
