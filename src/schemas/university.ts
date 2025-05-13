import z from "zod";

export const universitySchema = z.object({
  _id: z.string().optional(),
  name: z.string({
    required_error: "University name is required",
    invalid_type_error: "University name must be a string",
  }),
  categoryIds: z
    .array(
      z.string().refine((val) => ({
        message: `Invalid category ID: ${val}`,
      }))
    )
    .optional(),
  code: z.string().optional(),
  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location must be a string",
  }),
  city: z.string().optional(),
  type: z.enum(["public", "private", "international"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be public, private, or international",
  }),
  establishedYear: z
    .number()
    .int()
    .min(1000)
    .max(new Date().getFullYear())
    .optional(),

  description: z.string().optional(),
  website: z.string().url("Website must be a valid URL").optional(),
  logo: z.string().url("Logo must be a valid URL").optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().optional(),

  admissionInfo: z
    .object({
      admissionMethod: z.array(z.string()).optional(),
      admissionLink: z
        .string()
        .url("Admission link must be a valid URL")
        .optional(),
    })
    .optional(),

  trainingFields: z.array(z.string()).optional(),

  tuition: z
    .object({
      min: z.number({
        required_error: "Minimum tuition is required",
      }),
      unit: z.string().default("VND/year"),
    })
    .optional(),

  rating: z.number().min(0).max(5).default(0),
  isFeatured: z.boolean().default(false),
});

export type UniversityType = z.infer<typeof universitySchema>;
