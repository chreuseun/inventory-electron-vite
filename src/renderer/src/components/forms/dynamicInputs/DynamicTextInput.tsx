/* eslint-disable react/prop-types */
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import PropTypes from 'prop-types'

const DynamicTextInput: React.FC<{
  input: IDynamicInput
  error: FiedErr
}> = ({ input, error, register }) => {
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
      {displayErrMessage ? <p className="border-error text-xs mt-1">{displayErrMessage}</p> : null}
    </div>
  )
}
