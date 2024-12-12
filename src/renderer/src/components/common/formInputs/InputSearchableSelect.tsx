import { useState } from 'react'
import PropTypes from 'prop-types'
// Common Props Interface for Inputs
interface ICommonInputProps {
  label?: string
  className?: string
}

interface IOptions {
  value: string
  label: string
}

interface ISelectInput extends ICommonInputProps {
  options: IOptions[]
  multiple?: boolean
  onChange?: (selectedValues: string[]) => void
}

const InputSearchableSelect: React.FC<ISelectInput> = ({
  label,
  options = [],
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

const optionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
})

InputSearchableSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(optionShape),
  multiple: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
}

export default InputSearchableSelect
