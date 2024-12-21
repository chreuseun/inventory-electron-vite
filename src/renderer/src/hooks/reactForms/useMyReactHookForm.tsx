import { MyButton } from '@renderer/components/common'
import { InputSearchableSelect, InputTextInput } from '@renderer/components/common/formInputs'
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'

const useMyReactHookForm: React.FC<{
  inputsConfig: IDynamicInput[]
  onHandleSubmit: (data: FieldValues) => void
  isFormReset?: boolean
}> = ({ inputsConfig, onHandleSubmit, isFormReset = true }) => {
  const { control, handleSubmit, reset } = useForm()
  const [remount, setRemount] = useState(false)

  const onSubmitHandler = handleSubmit((data) => {
    onHandleSubmit(data)
    isFormReset ? reset() : null
    setRemount(true)
    setTimeout(() => {
      setRemount(false)
    }, 100)
  })

  const onEnterKey: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      onSubmitHandler()
    }
  }

  if (remount) {
    return null
  }

  return (
    <React.Fragment>
      <div
        className="border-b-sectBorder border-b flex flex-col overflow-auto gap-x-2 pb-2 shrink-0"
        onKeyDown={onEnterKey}
      >
        {inputsConfig.map((input) => {
          if (input.inputType === 'SELECT_MULTIPLE') {
            return (
              <Controller
                key={input.id}
                name={input.id}
                control={control}
                defaultValue=""
                rules={{ required: `${input.label} is required` }}
                render={({ field, fieldState: { error } }) => {
                  const { onChange } = field

                  return (
                    <>
                      <InputSearchableSelect
                        key={input.id}
                        className="text-dark"
                        options={input?.options || []}
                        label={`${input.label}`}
                        multiple={true}
                        onChange={(selectedMaterialIDs) => {
                          onChange(
                            Object.keys(selectedMaterialIDs).length ? selectedMaterialIDs : null
                          )
                        }}
                        isQuantityIncluded
                        errorMessage={error?.message || null}
                      />
                    </>
                  )
                }}
              />
            )
          } else if (input.inputType === 'TEXT') {
            return <InputTextInput key={input.id} control={control} input={input} />
          } else if (input.inputType === 'BOOLEAN') {
            return <InputTextInput key={input.id} control={control} input={input} />
          } else if (input.inputType === 'NUMBER') {
            return <InputTextInput key={input.id} control={control} input={input} />
          }

          return (
            <div className="border border-sectBorder p-3" key={input.id}>
              Invalid input type: {input.inputType}
            </div>
          )
        })}
      </div>
      <MyButton label={'Save Recipe'} onClick={onSubmitHandler} className="mt-4 w-32" />
    </React.Fragment>
  )
}
export default useMyReactHookForm
