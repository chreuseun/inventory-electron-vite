import { ValidationRule } from 'react-hook-form'

export type IFormInputTypes = 'TEXT' | 'TIMESTAMP' | 'DATE' | 'NUMBER' //  TIMESTAMP_RANGE

export type MyDynamicFormInput = {
  label: string
  id: string
  type: IFormInputTypes
  required: boolean
  maxLength?: number
  minLength?: number
  max?: number
  min?: number
  pattern?: ValidationRule<RegExp>
  actions?: 'UPSERT' | 'INSERT'
  valueAsNumber?: boolean
}
