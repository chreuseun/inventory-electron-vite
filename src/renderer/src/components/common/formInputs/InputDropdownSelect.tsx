/* eslint-disable react/prop-types */
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import { useState } from 'react'

const InputDropdown: React.FC<{
  className?: string
  input: IDynamicInput
  onChange?: (value: string) => void
  errorMsg?: string
}> = ({ className, input, onChange, errorMsg }) => {
  const [value, setValue] = useState<string | null>('')

  const onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const changeValue = e.target.value
    setValue(changeValue)
    onChange && onChange(changeValue)
  }

  return (
    <div className={`p-2 text-dark mb-1 ${className || ''}`}>
      <div className="text-white text-xs mb-1">{input.label}</div>
      <div className="flex flex-col">
        <select
          id="dropdown"
          name={input.label || 'dropdown'}
          className="p-1 border border-gray-300 text-black text-sm"
          value={value || ''}
          onChange={onChangeHandler}
        >
          {input.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errorMsg ? <div className="text-error text-xs">{errorMsg}</div> : null}
    </div>
  )
}

export default InputDropdown
