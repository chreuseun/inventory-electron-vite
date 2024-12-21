export interface IProductFormData {
  alert_threshold: string
  description: string
  display_name: string
  shelf_quantity: string
  recipe_id: {
    [recipeID: string]: {
      label: string
      value: number
    }
  }
}
