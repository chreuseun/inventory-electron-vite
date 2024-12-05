import { z } from 'zod'

const UserSchema = z.object({
  id: z.number().optional(), // Auto-incremented, so not required for insertion
  username: z.string().min(1, 'Username cannot be empty'), // At least 1 character
  password: z.string().min(8, 'Password must be at least 8 characters long'), // Enforce password length
  is_active: z.boolean().default(true), // Default to true if not provided
  created_at: z.string().optional(), // SQLite will auto-generate this
  updated_at: z.string().optional() // SQLite will auto-generate this
})

export { UserSchema }
