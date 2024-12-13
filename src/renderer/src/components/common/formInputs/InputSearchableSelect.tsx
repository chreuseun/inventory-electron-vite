/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputSearchQuantityInput from './InputSearchQuantityInput'
import { boolean } from 'zod'

interface ICommonInputProps {
  label?: string
  className?: string
}

interface IOption {
  value: string
  label: string
  quantity?: number
}

interface ISelectInput extends ICommonInputProps {
  options: IOption[]
  multiple?: boolean
  onChange?: (selectedValues: string[]) => void
  isQuantityIncluded?: boolean
}

type OptionChangeHandler = (args: IOption) => () => void

type OptionCHangedFunc = (args: IOption) => void

const SearchSelectItem: React.FC<{
  multiple: boolean
  option: IOption
  handleOptionChange: OptionCHangedFunc
  selectedValues: string[]
  handleUpdateSelected: (args: IOption) => void
  isQuantityIncluded: boolean
}> = ({
  multiple,
  option,
  handleOptionChange,
  selectedValues,
  handleUpdateSelected,
  isQuantityIncluded
}) => {
  const [showQTYInput, setShowQTYInput] = useState<boolean>(false)

  // const isSelected = selectedValues.includes(option.value)

  const onPressUpdateQuantity: (quantity: number) => void = (quantity) => {
    handleUpdateSelected({
      ...option,
      quantity
    })
  }

  const onClickItem: OptionChangeHandler =
    ({ value, label }) =>
    () => {
      if (isQuantityIncluded) {
        setShowQTYInput(true)
      } else {
        handleOptionChange({
          value,
          label
        })
      }
    }

  return (
    <React.Fragment key={option.value}>
      <div
        className={`p-1 px-4 cursor-pointer flex items-center gap-2 ${
          selectedValues.includes(option.value) ? 'bg-primary text-dark' : 'hover:bg-gray-200'
        } w-40`}
        onClick={onClickItem(option)}
      >
        {multiple ? (
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={selectedValues.includes(option.value)}
            readOnly
          />
        ) : null}
        <span className="text-xs">{option.label}</span>
      </div>
      {showQTYInput ? (
        <InputSearchQuantityInput
          onClose={() => {
            setShowQTYInput(false)
          }}
          onProcessQuantity={onPressUpdateQuantity}
          itemName={option.label}
        />
      ) : null}
    </React.Fragment>
  )
}
const InputSearchableSelect: React.FC<ISelectInput> = ({
  label,
  options = [],
  multiple = false,
  className,
  onChange,
  isQuantityIncluded
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [selectedOpts, setSelectedOpts] = useState<{
    [key: string]: IOption
  }>({})

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateSelected: (args: IOption) => void = ({ value, label, quantity }) => {
    let updatedValues: string[] = []
    if (multiple) {
      if (selectedValues.includes(value) && !isQuantityIncluded) {
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
              value,
              ...(quantity ? { quantity } : {})
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
  const handleOptionChange: (a: IOption) => void = ({ value, label, quantity }) => {
    if (isQuantityIncluded) {
      return
    } else {
      handleUpdateSelected({
        label,
        value,
        quantity
      })
    }
  }

  const onDelete: (option: IOption) => void = (option) => {
    const { value } = option
    const updatedValues = selectedValues.filter((v) => v !== value)
    setSelectedValues(updatedValues)
    setSelectedOpts((prev) => {
      if (prev?.[option.value]) {
        delete prev[option.value]
      }
      return prev
    })
  }

  return (
    <div className={`border border-sectBorder ${className} p-2 shadow rounded-sm mb-2`}>
      {label ? <label className="text-light text-xs block">{label}</label> : null}
      <div className="max-h-28 mb-2 text-light flex flex-col flex-wrap overflow-auto">
        {Object.values(selectedOpts).map((selectedMaterial) => (
          <span
            className="px-1 py-1 border-sectBorder text-px9"
            key={selectedMaterial.value}
            onClick={() => {
              onDelete(selectedMaterial)
            }}
          >
            <span className="mr-1 px-1 border border-sectBorder text-error font-bold cursor-pointer">
              X
            </span>
            {selectedMaterial.quantity ? `${selectedMaterial.quantity}-` : ''}
            {selectedMaterial.label}
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="bg-light text-dark px-2 rounded-xs mb-2 rounded-sm text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-light border rounded-sm max-h-20 overflow-y-auto p-2 flex flex-wrap">
        {!filteredOptions.length ? <div>No materials found</div> : null}
        {filteredOptions.map((option) => (
          <SearchSelectItem
            key={option.value}
            multiple
            option={option}
            selectedValues={selectedValues}
            handleOptionChange={handleOptionChange}
            handleUpdateSelected={handleUpdateSelected}
            isQuantityIncluded={isQuantityIncluded || false}
          />
        ))}
      </div>
    </div>
  )
}

export default InputSearchableSelect
