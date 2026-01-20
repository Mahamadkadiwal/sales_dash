import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
  role: z.enum(["user", "admin"]),
});


export type LoginFormInputs = z.infer<typeof loginSchema>;