import { MATERIAL_FORM_INPUTS } from '@renderer/configs/forms/materialForm.config'
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form'

type MaterialFormData = {
  [key in (typeof MATERIAL_FORM_INPUTS)[number]['id']]: string | number
}

interface IUseMaterialForm {
  errors: FieldErrors<MaterialFormData>
  handleSubmit: UseFormHandleSubmit<MaterialFormData, undefined>
  onSubmit: SubmitHandler<MaterialFormData>
  register: UseFormRegister<MaterialFormData>
}

const useMaterialForm: () => IUseMaterialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MaterialFormData>({
    defaultValues: MATERIAL_FORM_INPUTS.reduce((acc, input) => {
      acc[input.id] = '' // Set the default value for each field
      return acc
    }, {} as MaterialFormData)
  })

  // Register each input dynamically with validation rules
  MATERIAL_FORM_INPUTS.forEach((input) => {
    register(input.id, {
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
    })
  })

  // Placeholder for form submit handler
  const onSubmit: SubmitHandler<MaterialFormData> = (data) => {
    console.log('Form submitted:', data)
  }

  return {
    handleSubmit,
    onSubmit,
    errors,
    register
  }
}

export default useMaterialForm
