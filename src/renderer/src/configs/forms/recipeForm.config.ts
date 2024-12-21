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
    id: 'materials',
    label: 'Materials',
    type: 'text',
    inputType: 'SELECT_MULTIPLE',
    required: true,
    valueAsNumber: false
  }
]
