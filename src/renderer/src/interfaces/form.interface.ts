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
  pattern?: { message: string; value: RegExp }
  actions?: 'UPSERT' | 'INSERT'
}
