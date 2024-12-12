import { IDynamicInput } from '@renderer/interfaces/form.interface'

export const RECIPE_FORM_INPUTS: IDynamicInput[] = [
  {
    id: 'name',
    label: 'Recipe Name',
    type: 'text',
    inputType: 'TEXT',
    required: true,
    valueAsNumber: false,
    minLength: 2,
    maxLength: 45
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    inputType: 'TEXT',
    required: true,
    valueAsNumber: false,
    minLength: 2,
    maxLength: 45
  },
  {
    id: 'is_active',
    label: 'Is Active?',
    type: 'text',
    inputType: 'BOOLEAN',
    required: true,
    valueAsNumber: false,
    minLength: 2,
    maxLength: 45
  }
]
