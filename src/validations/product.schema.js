import { z } from "zod";

export const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId");

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  inStock: z.boolean().optional().default(true),
  description: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  inStock: z.boolean().optional(),
  description: z.string().optional(),
});

export const productIdParamSchema = z.object({
  id: objectIdSchema,
});

export const productQuerySchema = z.object({
  inStock: z.enum(["true", "false"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});
