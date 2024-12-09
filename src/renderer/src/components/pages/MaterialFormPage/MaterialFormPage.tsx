import { MainAppTemplate } from '@renderer/components/templates'
import { MyButton } from '@renderer/components/common'
import React from 'react'
import { useMaterialForm } from '@renderer/hooks/reactForms'
import { MATERIAL_FORM_INPUTS } from '@renderer/configs/forms/materialForm.config'

const MaterialForm1: React.FC = () => {
  const { errors, handleSubmit, register } = useMaterialForm()

  // Function to handle form submission manually
  const onSubmit: (arg: unknown) => void = (data: unknown) => {
    console.log('Form submitted:', data)
  }

  const handleFormSubmit: () => void = () => {
    handleSubmit(onSubmit)() // Call the handleSubmit function and invoke it manually
  }

  return (
    <React.Fragment>
      <MyButton onClick={handleFormSubmit} label={'Save Material'} className="mt-4 w-32" />
      <div className=" border border-sectBorder p-4 mt-2 flex flex-wrap gap-x-2 overflow-auto">
        {MATERIAL_FORM_INPUTS.map((input) => {
          return (
            <div key={input.id} className="flex flex-col mb-2 w-full sm:w-perc48">
              <label htmlFor={input.id} className="text-xs font-extrabold text-primaryText">
                {input.label}
              </label>
              <input
                id={input.id}
                {...register(input.id)}
                type={input.type.toLowerCase()}
                className={`text-dark mt-1 px-2 border rounded ${
                  errors[input.id] ? 'border-error border-2' : 'border-border'
                }`}
              />
              {errors[input.id] && (
                <p className="border-error text-xs mt-1">{errors[input.id]?.message}</p>
              )}
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

const MaterialFormPage: React.FC = () => {
  return (
    <MainAppTemplate headerText="Material Form" className="flex flex-col">
      <MaterialForm1 />
    </MainAppTemplate>
  )
}

export default MaterialFormPage
