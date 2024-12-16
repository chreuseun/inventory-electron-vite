import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { PRODUCT_FORM_INPUTS } from '@renderer/configs/forms/productForm.config'
import { IProductFormInput } from '@renderer/interfaces/form.interface'
import React, { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'

const ProductForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    control
  } = useForm()

  const renderFormItem: (args: { input: IProductFormInput }) => JSX.Element = ({ input }) => {
    const displayErrMessage = (
      errors[input.id]?.message ? errors[input.id]?.message : null
    ) as ReactNode

    return (
      <Controller
        key={input.id}
        name={input.id}
        control={control}
        defaultValue=""
        rules={{ required: `${input.label} is required` }}
        render={({ field, fieldState: { error } }) => {
          const isError = !!error?.message
          return (
            <div className="border-sectBorder p-2 border text-dark">
              <div className="text-white text-xs mb-1">{input.label}</div>
              <input
                className={`px-2 ${isError ? `border-error border` : `border-none`}`}
                {...field}
              />
              {isError ? <div className="text-error text-xs">{error?.message}</div> : null}
            </div>
          )
        }}
      />

      // <div key={input.id} className="flex flex-col w-full sm:w-perc48">
      //   <label htmlFor={input.id} className="text-sm font-extrabold text-primaryText">
      //     {input.label}
      //   </label>
      //   <input
      //     id={input.id}
      //     {...register(input.id as (typeof PRODUCT_FORM_INPUTS)[number]['id'], {
      //       required: input.required,
      //       valueAsNumber: input.valueAsNumber,
      //       minLength: input.minLength,
      //       maxLength: input.maxLength,
      //       max: input.max,
      //       min: input.min
      //     })}
      //     type={input.type.toLowerCase()}
      //     className={`text-dark mt-1 px-2 border rounded ${
      //       errors[input.id] ? 'border-error border-2' : 'border-border'
      //     }`}
      //   />
      //   {displayErrMessage ? (
      //     <p className="border-error text-xs mt-1">{displayErrMessage}</p>
      //   ) : null}
      // </div>
    )
  }

  return (
    <React.Fragment>
      <div className="border-b-sectBorder border-b flex flex-wrap overflow-auto gap-x-2 pb-2">
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
    <MainAppTemplate headerText="Add Product" className="flex flex-col" allowGoBack>
      <ProductForm />
    </MainAppTemplate>
  )
}

export default ProductFormPage
