import { MainAppTemplate } from '@renderer/components/templates'
import { MyButton, MyLoadingModal } from '@renderer/components/common'
import React from 'react'
import { useMaterialForm } from '@renderer/hooks/reactForms'
import { MATERIAL_FORM_INPUTS } from '@renderer/configs/forms/materialForm.config'
import { useCreateMaterial } from '@renderer/hooks/materials'
import { MaterialFormData } from '@renderer/hooks/reactForms/useMaterialForm'
import { showToast } from '@renderer/utils/reactToastify'

const MaterialForm1: React.FC = () => {
  const { errors, handleSubmit, register, reset } = useMaterialForm()
  const { runCreateMaterial, loading } = useCreateMaterial({
    onCompleted: (data) => {
      try {
        if (data.success && data.result.insertedCount > 0) {
          showToast({ type: 'info', message: `Material Added` })
          reset()
        }
      } catch (errMsg) {
        showToast({ type: 'error', message: `Material Add Error: ${errMsg}` })
      }
    },
    onError: (err) => {
      showToast({ type: 'error', message: `Material Add Error: ${err}` })
    }
  })

  const onSubmit: (data: MaterialFormData) => void = (data) => {
    runCreateMaterial({ newMaterial: data })
  }

  const handleFormSubmit: () => void = () => {
    handleSubmit(onSubmit)() // Call the handleSubmit function and invoke it manually
  }

  return (
    <React.Fragment>
      <MyLoadingModal show={loading} />
      <MyButton onClick={handleFormSubmit} label={'Save Material'} className="mt-4 w-32" />
      <div className=" border border-sectBorder p-4 mt-2 flex flex-wrap gap-x-2 overflow-auto gap-y-3 ">
        {MATERIAL_FORM_INPUTS.map((input) => {
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
    <MainAppTemplate allowGoBack headerText="Material Form" className="flex flex-col">
      <MaterialForm1 />
    </MainAppTemplate>
  )
}

export default MaterialFormPage
