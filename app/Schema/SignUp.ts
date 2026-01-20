import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(1, { message: 'Username is required'}),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
  role: z.enum(["user", "admin"]),
});


export type RegisterFormInputs = z.infer<typeof registerSchema>;