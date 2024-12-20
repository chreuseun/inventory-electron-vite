export interface IDTOProductPayload {
  reference_id: string
  display_name: string
  current_recipe_id: string
  shelf_quantity: number
  base_warehouse_quantity: number
  current_warehouse_quantity: number
  alert_threshold: number
  created_by: string
}

export interface IDTOProduct {
  id: string
  reference_id: string
  display_name: string
  shelf_quantity: string
  current_warehouse_quantity: number
  alert_threshold: number
}

export interface IDTOProductPotentialStock {
  id: string
  reference_id: string
  display_name: string
  shelf_quantity: string
  potential_stock: number
  alert_threshold: number
  material_ids?: string // "12,13,5,7,8"
  materials_count?: number
  current_warehouse_quantity?: number
}
