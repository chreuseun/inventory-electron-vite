import React, { ChangeEventHandler, useState } from 'react'

// Common Props Interface for Inputs
interface ICommonInputProps {
  label?: string
  className?: string
}

// Select Input with Search
interface ISelectInput extends ICommonInputProps {
  options: { value: string; label: string }[]
  multiple?: boolean
  onChange?: (selectedValues: string[]) => void
}

const SearchableSelect: React.FC<ISelectInput> = ({
  label,
  options,
  multiple = false,
  className,
  onChange
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [selectedOpts, setSelectedOpts] = useState<{
    [key: string]: {
      value: string
      label: string
    }
  }>({})

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOptionChange: (arg: { value: string; label: string }) => void = ({
    value,
    label
  }) => {
    let updatedValues: string[]

    if (multiple) {
      if (selectedValues.includes(value)) {
        setSelectedOpts((prev) => {
          if (prev?.[value]) {
            delete prev[value]
          }
          return prev
        })
        updatedValues = selectedValues.filter((v) => v !== value)
      } else {
        updatedValues = [...selectedValues, value]

        setSelectedOpts((prev) => {
          return {
            ...prev,
            [value]: {
              label,
              value
            }
          }
        })
      }
    } else {
      updatedValues = [value]
    }

    if (onChange) {
      setSelectedValues(updatedValues)
      onChange(updatedValues)
    }
  }

  return (
    <div className={className}>
      {label ? <label className="text-light text-xs mb-1 block">{label}</label> : null}
      <div className="max-h-40 border border-sectBorder mb-2 text-light flex flex-wrap overflow-auto">
        {Object.values(selectedOpts).map((selectedMaterial) => (
          <span className=" w-1/3  px-4 py-1 border-sectBorder" key={selectedMaterial.value}>
            {selectedMaterial.label}
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="bg-light text-dark px-4 rounded-xs mb-2 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-light border rounded-lg max-h-48 overflow-y-auto p-2 flex flex-wrap">
        {!filteredOptions.length ? <div>No materials found</div> : null}
        {filteredOptions.map((option) => (
          <div
            key={option.value}
            className={`p-1 px-4 cursor-pointer flex items-center gap-2 ${
              selectedValues.includes(option.value) ? 'bg-primary text-dark' : 'hover:bg-gray-200'
            } w-40`}
            onClick={() => handleOptionChange(option)}
          >
            {multiple && (
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={selectedValues.includes(option.value)}
                readOnly
              />
            )}
            <span className="text-xs">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Timestamp Range Input
interface ITimestampRangeInput extends ICommonInputProps {
  fromLabel?: string
  toLabel?: string
  onFromChange?: ChangeEventHandler<HTMLInputElement>
  onToChange?: ChangeEventHandler<HTMLInputElement>
}

const TimestampRange: React.FC<ITimestampRangeInput> = ({
  label,
  fromLabel = 'From',
  toLabel = 'To',
  className,
  onFromChange,
  onToChange
}) => {
  return (
    <div className={className}>
      {label ? <label className="text-light text-xs mb-1 block">{label}</label> : null}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-light text-xs block mb-1">{fromLabel}</label>
          <input
            type="datetime-local"
            className="bg-light text-dark p-2 px-4 rounded-lg outline-border w-full"
            onChange={onFromChange}
          />
        </div>
        <div className="flex-1">
          <label className="text-light text-xs block mb-1">{toLabel}</label>
          <input
            type="datetime-local"
            className="bg-light text-dark p-2 px-4 rounded-lg outline-border w-full"
            onChange={onToChange}
          />
        </div>
      </div>
    </div>
  )
}

// Boolean Toggle Input
interface IBooleanInput extends ICommonInputProps {
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const BooleanToggle: React.FC<IBooleanInput> = ({
  label,
  checked = false,
  className,
  onChange
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {label ? <label className="text-light text-xs mr-2">{label}</label> : null}
      <input
        type="checkbox"
        className="appearance-none bg-light checked:bg-primary w-6 h-6 border rounded-md cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
    </div>
  )
}

export { SearchableSelect, TimestampRange, BooleanToggle }
