/* eslint-disable react/prop-types */
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import { Control, Controller } from 'react-hook-form'

const InputTextInput: React.FC<{
  input: IDynamicInput
  control: Control
  className?: string
}> = ({ input, control, className }) => {
  return (
    <Controller
      key={input.id}
      name={input.id}
      control={control}
      defaultValue=""
      rules={{ required: input.required ? `${input.label} is required` : false }}
      render={({ field, fieldState: { error } }) => {
        const isError = !!error?.message
        const onFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
          if (input.inputType === 'NUMBER' || input.type === 'number') {
            const numberValue = event.target.value || ''
            field.onChange(numberValue)
          } else {
            field.onChange(event)
          }
        }

        return (
          <div className={`p-2  text-dark mb-1 rounded-md ${className || ''}`}>
            <div className="text-white text-xs mb-1">{input.label}</div>
            <input
              className={`px-2 ${isError ? `border-error border` : `border-none`}`}
              {...field}
              onChange={onFieldChange}
              type={input.type}
            />
            {isError ? <div className="text-error text-xs">{error?.message}</div> : null}
          </div>
        )
      }}
    />
  )
}

export default InputTextInput
