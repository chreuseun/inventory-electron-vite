import { HTMLInputTypeAttribute } from 'react'
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

export type CustomFormInputType =
  | 'TEXT'
  | 'NUMBER'
  | 'TIMESTAMP'
  | 'DATE'
  | 'TIMESTAMP_FROM_TO'
  | 'BOOLEAN'
  | 'SELECT_MULTIPLE'
  | 'SELECT_ONE'
  | 'DROPDOWN_SELECT'
  | 'DATE_RANGE'

export interface IDynamicInput {
  id: string
  type: HTMLInputTypeAttribute
  label: string
  required: boolean
  valueAsNumber: boolean
  minLength?: number
  maxLength?: number
  max?: number
  min?: number
  inputType: CustomFormInputType
  options?: IOption[]
}

export interface IOption {
  value: string
  label: string
  quantity?: number
}

export type IDateRangeValue = {
  end: string | null
  start: string | null
}
