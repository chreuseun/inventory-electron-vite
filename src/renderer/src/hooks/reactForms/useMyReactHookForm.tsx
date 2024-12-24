import { MyButton } from '@renderer/components/common'
import {
  InputDateTimeRange,
  InputDropdownSelect,
  InputSearchableSelect,
  InputTextInput
} from '@renderer/components/common/formInputs'
import { IDateRangeValue, IDynamicInput } from '@renderer/interfaces/form.interface'
import React, { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'

const useMyReactHookForm: React.FC<{
  inputsConfig: IDynamicInput[]
  onHandleSubmit: (data: FieldValues) => void
  isFormReset?: boolean
  className?: string
  label?: string
}> = ({ inputsConfig, onHandleSubmit, isFormReset = true, className, label }) => {
  const { control, handleSubmit, reset } = useForm()
  const [remount, setRemount] = useState(false)

  const onSubmitHandler = handleSubmit((data) => {
    onHandleSubmit(data)

    const resetCallback: () => void = () => {
      if (isFormReset) {
        reset()
        setRemount(true)
        setTimeout(() => {
          setRemount(false)
        }, 100)
      }
    }

    resetCallback()
  })

  if (remount) {
    return null
  }

  return (
    <React.Fragment>
      <div
        className={
          className
            ? className
            : `border-b-sectBorder border-b flex flex-col overflow-auto gap-x-2 pb-2 shrink-0`
        }
      >
        {inputsConfig.map((input) => {
          if (input.inputType === 'SELECT_MULTIPLE' || input.inputType === 'SELECT_ONE') {
            const multiple = input.inputType === 'SELECT_MULTIPLE' ? true : false

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
                        multiple={multiple}
                        onChange={(selectedMaterialIDs) => {
                          onChange(
                            Object.keys(selectedMaterialIDs).length ? selectedMaterialIDs : null
                          )
                        }}
                        isQuantityIncluded={multiple}
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
          } else if (input.inputType === 'DATE_RANGE') {
            return (
              <Controller
                key={input.id}
                name={input.id}
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => {
                  const onChangeHandler: (dateRange: IDateRangeValue) => void = (dateRange) => {
                    field.onChange(dateRange)
                  }

                  return (
                    <InputDateTimeRange
                      key={input.id}
                      input={input}
                      onChange={onChangeHandler}
                      errorMsg={error?.message}
                    />
                  )
                }}
              />
            )
          } else if (input.inputType === 'DROPDOWN_SELECT') {
            return (
              <Controller
                key={input.id}
                name={input.id}
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => {
                  const onFieldChangeHandler: (value: string) => void = (value) => {
                    field.onChange(value)
                  }

                  return (
                    <InputDropdownSelect
                      key={input.id}
                      input={input}
                      onChange={onFieldChangeHandler}
                      errorMsg={error?.message || ''}
                    />
                  )
                }}
              />
            )
          }

          return (
            <div className="border border-sectBorder p-3" key={input.id}>
              Invalid input type: {input.inputType}
            </div>
          )
        })}

        <MyButton
          label={label ? label : 'Confirm'}
          onClick={onSubmitHandler}
          className="mb-2 w-32"
        />
      </div>
    </React.Fragment>
  )
}
export default useMyReactHookForm
