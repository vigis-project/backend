import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string()
    .email('Некорректный формат email')
    .min(1, 'Email обязателен')
    .max(50, 'Email не должен превышать 50 символов')
    .trim(),
    
  username: z.string()
    .min(1, 'Имя пользователя обязательно')
    .max(25, 'Имя пользователя не должно превышать 25 символов')
    .trim(),
    
  password: z.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(100, 'Пароль слишком длинный')
    .regex(/[A-Z]/, 'Пароль должен содержать минимум одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать минимум одну цифру'),
    
  firstName: z.string()
    .min(1, 'Имя обязательно')
    .max(25, 'Имя не должно превышать 25 символов')
    .trim(),
    
  lastName: z.string()
    .min(1, 'Фамилия обязательна')
    .max(50, 'Фамилия не должна превышать 50 символов')
    .trim(),
    
  secondName: z.string()
    .max(25, 'Отчество не должно превышать 25 символов')
    .trim()
    .optional()
    .nullable(),
    
  rating: z.number().int().min(0).default(0),
  enabled: z.boolean().default(false),
  banned: z.boolean().default(false),
  
  roles: z.array(z.object({
    id: z.number(),
    value: z.string(),
    description: z.string()
  })).optional(),
  
  reviews: z.array(z.object({
    id: z.number(),
    content: z.string(),
    rating: z.number()
  })).optional(),
  
  address: z.object({
    city: z.string(),
    street: z.string(),
    house: z.string()
  }).optional().nullable()
});

export const CreateUserSchema = UserSchema.pick({
  email: true,
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  secondName: true
}).extend({
  password: UserSchema.shape.password
});

export const UpdateUserSchema = UserSchema.partial()
  .omit({ id: true, roles: true, reviews: true, address: true })
  .extend({
    password: UserSchema.shape.password.optional()
  });

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
