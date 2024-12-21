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

export enum IFormProduct {
  display_name = 'display_name',
  description = 'description',
  alert_threshold = 'alert_threshold',
  shelf_quantity = 'shelf_quantity',
  recipe_id = 'recipe_id'
}
