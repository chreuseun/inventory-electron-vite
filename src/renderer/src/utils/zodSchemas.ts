import { z } from 'zod'

// Users Table Schema
const UserSchema = z.object({
  id: z.number().optional(), // Primary key, auto-increment
  reference_id: z.string().uuid(), // Unique, non-null
  username: z.string().min(1), // Unique, non-null
  password: z.string().min(1), // Non-null
  is_active: z.boolean().default(true), // Defaults to 1
  created_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  created_by: z.string().min(1), // Non-null
  updated_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  updated_by: z.string().nullable() // Can be null
})

// Products Table Schema
const ProductSchema = z.object({
  id: z.number().optional(), // Primary key, auto-increment
  reference_id: z.string().uuid(), // Unique, non-null
  display_name: z.string().min(1), // Non-null
  is_disabled: z.boolean().default(false), // Defaults to 0
  is_out_of_stock: z.boolean().default(false), // Defaults to 0
  current_recipe_id: z.string().min(1), // Non-null
  shelf_quantity: z.number().int().default(0), // Defaults to 0
  base_warehouse_quantity: z.number().int().default(0), // Defaults to 0
  current_warehouse_quantity: z.number().int().default(0), // Defaults to 0
  alert_threshold: z.number().int().default(5), // Defaults to 5
  created_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  created_by: z.string().min(1), // Non-null
  updated_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  updated_by: z.string().nullable() // Can be null
})

// Materials Table Schema
const MaterialSchema = z.object({
  display_name: z.string().min(1), // Non-null
  unit: z.string().min(1), // Non-null
  format: z.string().min(1), // Non-null
  price: z.number().nonnegative().default(0.0), // Defaults to 0.00
  alert_threshold: z.number().int().default(5), // Defaults to 5
  current_stock_quantity: z.number().int().default(0), // Defaults to 0
  stock_base_quantity: z.number().int().default(0) // Defaults to 0
})

// Recipes Table Schema
const RecipeSchema = z.object({
  id: z.number().optional(), // Primary key, auto-increment
  reference_id: z.string().uuid(), // Unique, non-null
  product_id: z.string().min(1), // Non-null
  name: z.string().min(1), // Non-null
  description: z.string().min(1), // Non-null
  is_active: z.boolean().default(true), // Defaults to 1
  created_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  created_by: z.string().min(1), // Non-null
  updated_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  updated_by: z.string().nullable() // Can be null
})

// Recipe Items Table Schema
const RecipeItemSchema = z.object({
  id: z.number().optional(), // Primary key, auto-increment
  reference_id: z.string().uuid(), // Unique, non-null
  recipe_id: z.string().min(1), // Non-null
  material_id: z.string().min(1), // Non-null
  quantity_required: z.string().min(1), // Non-null
  unit: z.boolean().default(true), // Defaults to 1
  is_active: z.boolean().default(true), // Defaults to 1
  created_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  created_by: z.string().min(1), // Non-null
  updated_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  updated_by: z.string().nullable() // Can be null
})

// Stock Transactions Table Schema
const StockTransactionSchema = z.object({
  id: z.number().optional(), // Primary key, auto-increment
  reference_id: z.string().uuid(), // Unique, non-null
  transacted_by: z.string().min(1), // Non-null
  recipe_id: z.string().min(1), // Non-null
  product_id: z.string().min(1), // Non-null
  material_id: z.string().min(1), // Non-null
  reason: z.string().min(1), // Non-null
  transaction_type: z.string().min(1), // Non-null
  intention: z.string().min(1), // Non-null
  quantity: z.number().int(), // Non-null
  created_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  created_by: z.string().min(1), // Non-null
  updated_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  updated_by: z.string().nullable() // Can be null
})

// Shelf Stock Transactions Table Schema
const ShelfStockTransactionSchema = z.object({
  id: z.number().optional(), // Primary key, auto-increment
  reference_id: z.string().uuid(), // Unique, non-null
  transacted_by: z.string().min(1), // Non-null
  product_id: z.string().min(1), // Non-null
  reason: z.string().min(1), // Non-null
  transaction_type: z.string().min(1), // Non-null
  intention: z.string().min(1), // Non-null
  current_shelf_quantity: z.number().int().nullable(), // Nullable
  quantity: z.number().int(), // Non-null
  created_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  created_by: z.string().min(1), // Non-null
  updated_at: z.date().optional(), // Defaults to CURRENT_TIMESTAMP
  updated_by: z.string().nullable() // Can be null
})

export {
  UserSchema,
  ProductSchema,
  MaterialSchema,
  RecipeSchema,
  RecipeItemSchema,
  StockTransactionSchema,
  ShelfStockTransactionSchema
}
