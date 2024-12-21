import { IDynamicInput, IProductFormInput } from '@renderer/interfaces/form.interface'

const PRODUCT_FORM_INPUTS: IProductFormInput[] = [
  {
    id: 'display_name',
    label: 'Name',
    required: true,
    valueAsNumber: false,
    type: 'text',
    minLength: 2,
    maxLength: 45
  },
  {
    id: 'is_disabled',
    label: 'Enabled',
    required: true,
    valueAsNumber: false,
    type: 'text'
  },
  {
    id: 'is_out_of_stock',
    label: 'Out of stock',
    required: true,
    valueAsNumber: false,
    type: 'text'
  },
  {
    id: 'current_recipe_id',
    label: 'Recipe',
    required: true,
    valueAsNumber: false,
    type: 'text'
  },
  {
    id: 'shelf_quantity',
    label: 'Shelf Quantity',
    required: true,
    valueAsNumber: false,
    type: 'text'
  },
  {
    id: 'base_warehouse_quantity',
    label: 'Base Warehouse Quantity',
    required: true,
    valueAsNumber: false,
    type: 'text'
  },
  {
    id: 'current_warehouse_quantity',
    label: 'Warehouse Quantity',
    required: true,
    valueAsNumber: false,
    type: 'text'
  },
  {
    id: 'alert_threshold',
    label: 'Alert Quantity',
    required: true,
    valueAsNumber: false,
    type: 'text'
  }
]

const PRODUCT_FORM_INPUTS_V2: IDynamicInput[] = [
  {
    id: 'display_name',
    label: 'Name',
    type: 'text',
    inputType: 'TEXT',
    required: true,
    valueAsNumber: false,
    minLength: 2,
    maxLength: 60
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    inputType: 'TEXT',
    required: true,
    valueAsNumber: false,
    minLength: 2,
    maxLength: 60
  },
  {
    id: 'alert_threshold',
    label: 'Alert Threshold',
    type: 'number',
    inputType: 'NUMBER',
    required: true,
    valueAsNumber: true,
    min: 0,
    max: 1000000000
  },
  {
    id: 'shelf_quantity',
    label: 'Shelf Stock',
    type: 'number',
    inputType: 'NUMBER',
    required: true,
    valueAsNumber: true,
    min: 0,
    max: 1000000000
  }
]

export { PRODUCT_FORM_INPUTS, PRODUCT_FORM_INPUTS_V2 }
