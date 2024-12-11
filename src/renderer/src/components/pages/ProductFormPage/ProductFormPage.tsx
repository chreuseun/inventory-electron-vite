import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { PRODUCT_FORM_INPUTS } from '@renderer/configs/forms/productForm.config'
import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

const ProductForm: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useForm()

  const renderFormItem: (args: {
    input: {
      id: string
      label: string
      required: boolean
      valueAsNumber: boolean
      type: string // type of input TIMESTAMP | TIMESTAMP RANGE | NUMBER |TEXT | SINGLE_SELECT | MULTIPLE_SELECT
      minLength?: number
      maxLength?: number
      max?: number
      min?: number
    }
  }) => JSX.Element = ({ input }) => {
    const displayErrMessage = (
      errors[input.id]?.message ? errors[input.id]?.message : null
    ) as ReactNode

    return (
      <div key={input.id} className="flex flex-col mb-2 w-full sm:w-perc48">
        <label htmlFor={input.id} className="text-sm font-extrabold text-primaryText">
          {input.label}
        </label>
        <input
          id={input.id}
          {...register(
            input.id as
              | 'alert_threshold'
              | 'current_stock_quantity'
              | 'display_name'
              | 'format'
              | 'price'
              | 'stock_base_quantity'
              | 'unit',
            {
              required: input.required,
              valueAsNumber: input.valueAsNumber,
              minLength: input.minLength,
              maxLength: input.maxLength,
              max: input.max,
              min: input.min
            }
          )}
          type={input.type.toLowerCase()}
          className={`text-dark mt-1 px-2 border rounded ${
            errors[input.id] ? 'border-error border-2' : 'border-border'
          }`}
        />
        {displayErrMessage ? (
          <p className="border-error text-xs mt-1">{displayErrMessage}</p>
        ) : null}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="border-b-sectBorder border-b p-4 flex flex-wrap gap-x-2 overflow-auto gap-y-3">
        {PRODUCT_FORM_INPUTS.map((input) =>
          renderFormItem({
            input
          })
        )}
      </div>
      <MyButton label={'Save Product'} onClick={() => {}} className="mt-4 w-32" />
    </React.Fragment>
  )
}

const ProductFormPage: React.FC = () => {
  return (
    <MainAppTemplate headerText="Add Product" className="flex flex-col">
      <ProductForm />
    </MainAppTemplate>
  )
}

export default ProductFormPage
