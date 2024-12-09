import { MATERIAL_FORM_INPUTS } from '@renderer/configs/forms/materialForm.config'
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset
} from 'react-hook-form'

export type MaterialFormData = {
  alert_threshold: number
  current_stock_quantity: number
  display_name: string
  format: string
  price: number
  stock_base_quantity: number
  unit: string
}

interface IUseMaterialForm {
  errors: FieldErrors<MaterialFormData>
  handleSubmit: UseFormHandleSubmit<MaterialFormData, undefined>
  onSubmit: SubmitHandler<MaterialFormData>
  register: UseFormRegister<MaterialFormData>
  reset: UseFormReset<MaterialFormData>
}

const useMaterialForm: () => IUseMaterialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MaterialFormData>({
    defaultValues: MATERIAL_FORM_INPUTS.reduce((acc, input) => {
      acc[input.id] = '' // Set the default value for each field
      return acc
    }, {} as MaterialFormData)
  })

  // Register each input dynamically with validation rules
  MATERIAL_FORM_INPUTS.forEach((input) => {
    register(
      input.id as
        | 'alert_threshold'
        | 'current_stock_quantity'
        | 'display_name'
        | 'format'
        | 'price'
        | 'stock_base_quantity'
        | 'unit',
      {
        required: input.required ? `${input.label} is required` : false,
        minLength: input.minLength
          ? { value: input.minLength, message: `Minimum length is ${input.minLength}` }
          : undefined,
        maxLength: input.maxLength
          ? { value: input.maxLength, message: `Maximum length is ${input.maxLength}` }
          : undefined,
        min:
          input.min !== undefined
            ? { value: input.min, message: `Minimum value is ${input.min}` }
            : undefined,
        max:
          input.max !== undefined
            ? { value: input.max, message: `Maximum value is ${input.max}` }
            : undefined,
        pattern: input.pattern
      }
    )
  })

  // Placeholder for form submit handler
  const onSubmit: SubmitHandler<MaterialFormData> = (data) => {
    console.log('Form submitted:', data)
  }

  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    reset
  }
}

export default useMaterialForm
