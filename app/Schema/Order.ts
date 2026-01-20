
import { z } from "zod";

export const StatusEnum = z.enum([
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
]);

export type Status = z.infer<typeof StatusEnum>;

export const orderSchema = z.object({
  id: z.string().optional(),
  customer_name: z.string().min(1, "Customer name is required"),
  product_name: z.string().min(1, "Product is required"),
  amount: z.string().min(1, "Amount is required"),
  order_date: z.string().min(1, "Order date is required"),
  status: StatusEnum.default("Pending"),
  isNew: z.boolean().default(true),
});

export type OrderFormData = z.infer<typeof orderSchema>;
