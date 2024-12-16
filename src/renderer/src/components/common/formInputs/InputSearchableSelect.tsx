/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
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
  onChange?: (selectedValues: { [id: string]: IOption }) => void
  isQuantityIncluded?: boolean
  errorMessage?: null | string
}

type OptionChangeHandler = (args: IOption) => () => void

type OptionCHangedFunc = (args: IOption) => void

const SearchSelectItem: React.FC<{
  multiple: boolean
  option: IOption
  handleOptionChange: OptionCHangedFunc
  selectedValues: { [id: string]: IOption }
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

  const isSelected = !!selectedValues?.[option.value]

  return (
    <React.Fragment key={option.value}>
      <div
        className={`p-1 px-4 cursor-pointer flex items-center gap-2 ${
          isSelected ? 'bg-primary text-dark' : 'hover:bg-gray-200'
        } w-40`}
        onClick={onClickItem(option)}
      >
        {multiple ? (
          <input type="checkbox" className="cursor-pointer" checked={isSelected} readOnly />
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
  isQuantityIncluded,
  errorMessage = null
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOpts, setSelectedOpts] = useState<{
    [id: string]: IOption
  }>({})

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onChangeHandler: (args: { [id: string]: IOption }) => void = (args: {
    [id: string]: IOption
  }) => {
    if (onChange) {
      onChange(args)
    }
  }

  const handleUpdateSelected: (args: IOption) => void = ({ value, label, quantity }) => {
    let updatedValues: {
      [key: string]: IOption
    } = {}

    if (multiple) {
      if (!isQuantityIncluded) {
        selectedOpts

        setSelectedOpts((prev1) => {
          const prev = { ...prev1 }
          if (prev?.[value]) {
            delete prev[value]
          }

          updatedValues = prev

          return prev
        })
      } else {
        setSelectedOpts((prev1) => {
          const prev = { ...prev1 }

          const newOpts = {
            ...prev,
            [value]: {
              label,
              value,
              ...(quantity ? { quantity } : {})
            }
          }
          updatedValues = newOpts

          return newOpts
        })
      }
    } else {
      updatedValues = {
        [value]: { value, label, quantity }
      }
    }

    onChangeHandler(updatedValues)
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
    let selectedVals: {
      [id: string]: IOption
    } = {}

    setSelectedOpts((prev1) => {
      const prev = { ...prev1 }

      if (prev?.[option.value]) {
        delete prev[option.value]
      }

      selectedVals = prev

      return prev
    })

    onChangeHandler(selectedVals)
  }

  return (
    <div className={`border border-sectBorder ${className} p-2 shadow rounded-sm mb-2`}>
      {label ? <label className="text-light text-xs block">{label}</label> : null}
      <div className="max-h-28 mb-1 text-light flex flex-col flex-wrap overflow-auto">
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
            selectedValues={selectedOpts}
            handleOptionChange={handleOptionChange}
            handleUpdateSelected={handleUpdateSelected}
            isQuantityIncluded={isQuantityIncluded || false}
          />
        ))}
      </div>
      {errorMessage ? <div className="text-error text-xs">{errorMessage}</div> : null}
    </div>
  )
}

export default InputSearchableSelect
