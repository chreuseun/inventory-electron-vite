import React from 'react'

import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import {
  PRODUCT_FORM_INPUTS,
  PRODUCT_FORM_INPUTS_V2
} from '@renderer/configs/forms/productForm.config'
import { IProductFormInput } from '@renderer/interfaces/form.interface'
import { Controller, FieldValue, FieldValues, useForm } from 'react-hook-form'
import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'

// const ProductForm: React.FC = () => {
//   const { control } = useForm()

//   const renderFormItem: (args: { input: IProductFormInput }) => JSX.Element = ({ input }) => {
//     return (
//       <Controller
//         key={input.id}
//         name={input.id}
//         control={control}
//         defaultValue=""
//         rules={{ required: `${input.label} is required` }}
//         render={({ field, fieldState: { error } }) => {
//           const isError = !!error?.message
//           return (
//             <div className="border-sectBorder p-2 border text-dark">
//               <div className="text-white text-xs mb-1">{input.label}</div>
//               <input
//                 className={`px-2 ${isError ? `border-error border` : `border-none`}`}
//                 {...field}
//               />
//               {isError ? <div className="text-error text-xs">{error?.message}</div> : null}
//             </div>
//           )
//         }}
//       />

//       // <div key={input.id} className="flex flex-col w-full sm:w-perc48">
//       //   <label htmlFor={input.id} className="text-sm font-extrabold text-primaryText">
//       //     {input.label}
//       //   </label>
//       //   <input
//       //     id={input.id}
//       //     {...register(input.id as (typeof PRODUCT_FORM_INPUTS)[number]['id'], {
//       //       required: input.required,
//       //       valueAsNumber: input.valueAsNumber,
//       //       minLength: input.minLength,
//       //       maxLength: input.maxLength,
//       //       max: input.max,
//       //       min: input.min
//       //     })}
//       //     type={input.type.toLowerCase()}
//       //     className={`text-dark mt-1 px-2 border rounded ${
//       //       errors[input.id] ? 'border-error border-2' : 'border-border'
//       //     }`}
//       //   />
//       //   {displayErrMessage ? (
//       //     <p className="border-error text-xs mt-1">{displayErrMessage}</p>
//       //   ) : null}
//       // </div>
//     )
//   }

//   return (
//     <React.Fragment>
//       <div className="border-b-sectBorder border-b flex flex-wrap overflow-auto gap-x-2 pb-2">
//         {PRODUCT_FORM_INPUTS.map((input) =>
//           renderFormItem({
//             input
//           })
//         )}
//       </div>
//       <MyButton label={'Save Product'} onClick={() => {}} className="mt-4 w-32" />
//     </React.Fragment>
//   )
// }

const ProductFormPage: React.FC = () => {
  const onSubmitProduct: (formData: FieldValues) => void = (formData) => {
    console.log('--- FORM DATA OF PRODUCTS SUBMIT: ', formData)
  }

  return (
    <MainAppTemplate headerText="Add Product" className="flex flex-col" allowGoBack>
      <MyReactHookForm inputsConfig={PRODUCT_FORM_INPUTS_V2} onHandleSubmit={onSubmitProduct} />
    </MainAppTemplate>
  )
}

export default ProductFormPage
