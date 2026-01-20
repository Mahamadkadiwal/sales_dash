import {z} from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(val => Number(val) > 0, "Price must be greater than 0"),
  image: z.string().min(1, "Image is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;