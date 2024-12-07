import { z } from 'zod'

// Users Table Schema
const UserSchema = z.object({
  id: z.number().optional(), // Optional because it's auto-incremented
  uuid: z.string(),
  username: z.string(),
  password: z.string(),
  is_active: z.boolean().default(true),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  created_by: z.string(),
  updated_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  updated_by: z.string().nullable()
})

// Products Table Schema
const ProductSchema = z.object({
  id: z.number().optional(),
  uuid: z.string(),
  display_name: z.string(),
  is_disabled: z.boolean().default(false),
  is_out_of_stock: z.boolean().default(false),
  current_recipe_id: z.string(),
  shelf_quantity: z.number().int().default(0),
  base_warehouse_quantity: z.number().int().default(0),
  current_warehouse_quantity: z.number().int().default(0),
  alert_threshold: z.number().int().default(5),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  created_by: z.string(),
  updated_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  updated_by: z.string().nullable()
})

// Materials Table Schema
const MaterialSchema = z.object({
  id: z.number().optional(),
  uuid: z.string(),
  display_name: z.string(),
  unit: z.string(),
  format: z.string(),
  price: z.number().default(0.0),
  category_id: z.string(),
  sub_category_id: z.string(),
  brand_id: z.string(),
  alert_threshold: z.number().int().default(5),
  current_stock_quantity: z.number().int().default(0),
  stock_base_quantity: z.number().int().default(0),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  created_by: z.string(),
  updated_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  updated_by: z.string().nullable()
})

// Recipes Table Schema
const RecipeSchema = z.object({
  id: z.number().optional(),
  uuid: z.string(),
  product_id: z.string(),
  name: z.string(),
  description: z.string(),
  is_active: z.boolean().default(true),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  created_by: z.string(),
  updated_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  updated_by: z.string().nullable()
})

// Exports
export { UserSchema, ProductSchema, MaterialSchema, RecipeSchema }
