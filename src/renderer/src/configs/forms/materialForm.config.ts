import { MyDynamicFormInput } from '@renderer/interfaces/form.interface'

export const MATERIAL_FORM_INPUTS: MyDynamicFormInput[] = [
  {
    label: 'Name',
    id: 'display_name',
    type: 'TEXT',
    required: true,
    minLength: 1,
    maxLength: 30
  },
  {
    label: 'Unit',
    id: 'unit',
    type: 'TEXT',
    required: true,
    minLength: 1,
    maxLength: 30
  },
  {
    label: 'Format',
    id: 'format',
    type: 'TEXT',
    required: true,
    minLength: 1,
    maxLength: 30
  },
  {
    label: 'Price',
    id: 'price',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999
  },
  {
    label: 'Alert Threshold',
    id: 'alert_threshold',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999
  },
  {
    label: 'Current Stock Quantity',
    id: 'current_stock_quantity',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999
  },
  {
    label: 'Stock Base Quantity',
    id: 'stock_base_quantity',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999
  }
]
