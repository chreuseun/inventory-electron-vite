import PropTypes from 'prop-types'
import MyTextInput from '../MyTextInput'
import MyButton from '../MyButton'
import { FuncVoid } from '@renderer/interfaces/common.interface'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { showToast } from '@renderer/utils/reactToastify'

interface IInputSearchQuantityInput {
  children?: React.ReactNode
  itemName?: string
  onClose: FuncVoid
  onProcessQuantity: (quantity: number) => void
}

const InputSearchQuantityInput: React.FC<IInputSearchQuantityInput> = ({
  children,
  itemName,
  onClose,
  onProcessQuantity
}) => {
  const [inputValue, setInputValue] = useState<null | number>(null)

  useEffect(() => {
    console.log('-- itemName: ', itemName)
  }, [])

  const onPressCTA: FuncVoid = () => {
    if ((inputValue || 0) > 0 && !!inputValue) {
      onProcessQuantity(inputValue)
    } else {
      showToast({ message: 'Must be above 0', type: 'warning' })
    }

    onClose()
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue: number | null = null
    try {
      newValue = Number(Number(event.target.value).toFixed())
    } catch {
      newValue = null
    }

    setInputValue(newValue || null)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-secondaryBackground p-8 rounded shadow-lg flex flex-col items-center">
        {children ? (
          children
        ) : (
          <div className="flex flex-col justify-center items-center">
            <MyTextInput
              onChange={onInputChange}
              label={`How many${itemName ? ` ${itemName}` : ''}?`}
              placeholder=""
              type="number"
              value={inputValue}
              autoFocus={true}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onPressCTA()
                }
              }}
            />
            <MyButton onClick={onPressCTA} label={'OK'} className="mt-2 w-2/3" />
          </div>
        )}
      </div>
    </div>
  )
}

InputSearchQuantityInput.propTypes = {
  children: PropTypes.element,
  itemName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onProcessQuantity: PropTypes.func.isRequired
}

export default InputSearchQuantityInput
