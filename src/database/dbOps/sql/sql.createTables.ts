import { ISQLite3TableNames } from '@src/database/dbInterfaces/database.interfaces'

const SQL_CREATE_USERS_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.USERS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

const SQL_CREATE_PRODUCTS_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.PRODUCTS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  display_name TEXT NOT NULL,
  is_disabled BOOLEAN DEFAULT 0,
  is_out_of_stock BOOLEAN DEFAULT 0,
  current_recipe_id TEXT,
  shelf_quantity INTEGER NOT NULL DEFAULT 0,
  base_warehouse_quantity INTEGER NOT NULL DEFAULT 0,
  current_warehouse_quantity INTEGER NOT NULL DEFAULT 0,
  alert_threshold INTEGER NOT NULL DEFAULT 5,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

const SQL_CREATE_MATERIALS_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.MATERIALS} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  display_name TEXT NOT NULL,
  unit TEXT NOT NULL, -- gr, 100 grams, 100 ml
  format TEXT NOT NULL, -- ex. sachet bottle , L , XL, mid, 

  price REAL NOT NULL DEFAULT 0.00,

  category_id TEXT NOT NULL,
  sub_category_id TEXT NOT NULL,
  brand_id TEXT NOT NULL,

  alert_threshold INTEGER NOT NULL DEFAULT 5,
  current_stock_quantity INTEGER NOT NULL DEFAULT 0 ,
  stock_base_quantity INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

const SQL_CREATE_RECIPES_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.RECIPES_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  product_id TEXT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

const SQL_CREATE_RECIPE_ITEMS_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.RECIPES_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  recipe_id TEXT NOT NULL,
  material_id TEXT NOT NULL,
  quantity_required TEXT NOT NULL,
  unit BOOLEAN DEFAULT 1,
  is_active BOOLEAN DEFAULT 1,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

const SQL_CREATE_STOCK_TRANSACTIONS_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.STOCK_TRANSACTIONS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  transacted_by TEXT NOT NULL,
  recipe_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  material_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  intention TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

const SQL_CREATE_SHELF_STOCK_TRANSACTION_TABLE_IF_EXIST = `
CREATE TABLE IF NOT EXISTS ${ISQLite3TableNames.SHELF_STOCK_TRANSACTIONS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  transacted_by TEXT NOT NULL,
  product_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  intention TEXT NOT NULL,
  current_shelf_quantity INTEGER,
  quantity INTEGER,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT NULL
);
`

export {
  SQL_CREATE_USERS_TABLE_IF_EXIST,
  SQL_CREATE_PRODUCTS_TABLE_IF_EXIST,
  SQL_CREATE_MATERIALS_TABLE_IF_EXIST,
  SQL_CREATE_RECIPES_TABLE_IF_EXIST,
  SQL_CREATE_RECIPE_ITEMS_TABLE_IF_EXIST,
  SQL_CREATE_STOCK_TRANSACTIONS_TABLE_IF_EXIST,
  SQL_CREATE_SHELF_STOCK_TRANSACTION_TABLE_IF_EXIST
}
