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
  current_warehose_quantity: number
  alert_threshold: number
}
