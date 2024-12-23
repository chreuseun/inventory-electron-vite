import { IDynamicInput } from '@renderer/interfaces/form.interface'

export const MATERIAL_FORM_INPUTS: IDynamicInput[] = [
  {
    label: 'Name',
    id: 'display_name',
    type: 'TEXT',
    required: true,
    minLength: 1,
    maxLength: 30,
    valueAsNumber: false,
    inputType: 'TEXT'
  },
  {
    label: 'Unit',
    id: 'unit',
    type: 'TEXT',
    required: true,
    minLength: 1,
    maxLength: 30,
    valueAsNumber: false,
    inputType: 'TEXT'
  },
  {
    label: 'Format',
    id: 'format',
    type: 'TEXT',
    required: true,
    minLength: 1,
    maxLength: 30,
    valueAsNumber: false,
    inputType: 'TEXT'
  },
  {
    label: 'Price',
    id: 'price',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999,
    valueAsNumber: true,
    inputType: 'NUMBER'
  },
  {
    label: 'Alert Threshold',
    id: 'alert_threshold',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999,
    valueAsNumber: true,
    inputType: 'NUMBER'
  },
  {
    label: 'Current Stock Quantity',
    id: 'current_stock_quantity',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999,
    valueAsNumber: true,
    inputType: 'NUMBER'
  },
  {
    label: 'Stock Base Quantity',
    id: 'stock_base_quantity',
    type: 'NUMBER',
    required: true,
    minLength: 1,
    maxLength: 30,
    max: 999999999,
    min: -999999999,
    valueAsNumber: true,
    inputType: 'NUMBER'
  }
]
