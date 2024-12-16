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
      rules={{ required: `${input.label} is required` }}
      render={({ field, fieldState: { error } }) => {
        const isError = !!error?.message
        return (
          <div className={`p-2  text-dark mb-1 rounded-md ${className || ''}`}>
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
  )
}

export default InputTextInput
