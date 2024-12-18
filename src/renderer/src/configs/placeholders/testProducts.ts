/*
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
*/

export interface IDTOProduct {
  reference_id: string
  display_name: string
  current_recipe_id: string
  shelf_quantity: number
  base_warehouse_quantity: number
  alert_threshold: number
  created_by: string
}

const testProducts: IDTOProduct[] = [
  {
    reference_id: 'Garlic_Butter_Shrimp',
    display_name: 'Garlic Butter Shrimp',
    current_recipe_id: '',
    shelf_quantity: 30,
    base_warehouse_quantity: 150,
    alert_threshold: 20,
    created_by: 'system'
  },
  {
    reference_id: 'Spaghetti_Bolognese',
    display_name: 'Spaghetti Bolognese',
    current_recipe_id: '',
    shelf_quantity: 30,
    base_warehouse_quantity: 150,
    alert_threshold: 20,
    created_by: 'system'
  },
  {
    reference_id: 'Chicken_Adobo',
    display_name: 'Chicken Adobo',
    current_recipe_id: '',
    shelf_quantity: 30,
    base_warehouse_quantity: 150,
    alert_threshold: 20,
    created_by: 'system'
  },
  {
    reference_id: 'Vegetable_Stir_Fry',
    display_name: 'Vegetable Stir Fry',
    current_recipe_id: '',
    shelf_quantity: 30,
    base_warehouse_quantity: 150,
    alert_threshold: 20,
    created_by: 'system'
  },
  {
    reference_id: 'Beef_Steak',
    display_name: 'Beef Steak',
    current_recipe_id: '',
    shelf_quantity: 30,
    base_warehouse_quantity: 150,
    alert_threshold: 20,
    created_by: 'system'
  }
]

export { testProducts }
