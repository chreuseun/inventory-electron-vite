import { IDynamicInput } from '@renderer/interfaces/form.interface'

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

export { PRODUCT_FORM_INPUTS_V2 }
