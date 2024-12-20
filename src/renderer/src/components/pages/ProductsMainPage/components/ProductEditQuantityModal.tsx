/* eslint-disable react/prop-types */
import { MyButton } from '@renderer/components/common'
import { MinusCircleIcon, PlusCircleIcon, XIcon } from '@renderer/components/icons'
import { ModalTemplate } from '@renderer/components/templates'
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import { useState } from 'react'

const ProductEditQuantityModal: React.FC<{
  label?: string
  product: IDTOProductPotentialStock
  onClose?: () => void
}> = ({ product, onClose, label = '' }) => {
  const [warehouseQTY, setWarehouseQTY] = useState(0)

  const incrementQTY: () => void = () => {
    setWarehouseQTY((prev) => prev + 1)
  }

  const decrementQTY: () => void = () => {
    setWarehouseQTY((prev) => prev - 1)
  }

  const renderQtyButton: (args: { type: 'add' | 'minus'; onClick?: () => void }) => JSX.Element = ({
    type,
    onClick
  }) => {
    return (
      <button
        title="Add New"
        onClick={onClick}
        className="group cursor-pointer outline-none border-2 border-light p-2"
      >
        {type === 'add' ? (
          <PlusCircleIcon className="size-16" />
        ) : (
          <MinusCircleIcon className="size-16" />
        )}
      </button>
    )
  }

  const onEscape: () => void = () => {
    onClose && onClose()
  }

  return (
    <ModalTemplate>
      <div
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onEscape()
          }
        }}
        className="flex flex-col p-2 bg-secondaryBackground  rounded-sm  m-auto text-light"
      >
        <XIcon className="cursor-pointer size-7 text-light" onClick={onClose} />
        <div className="pt-4 ">
          <div className="text-center text-lg text-light mb-2">
            <div>
              {label}
              {product.display_name}
            </div>
          </div>
          <div className="flex-row flex justify-center">
            {renderQtyButton({
              type: 'minus',
              onClick: decrementQTY
            })}
            <input
              className="p-2 pl-4  border-2 border-light text-dark w-32 text-center text-2xl font-bold"
              type="number"
              value={warehouseQTY}
              onChange={(e) => setWarehouseQTY(parseInt(e.target.value))}
            />
            {renderQtyButton({ type: 'add', onClick: incrementQTY })}
          </div>
          <MyButton onClick={() => {}} label={'Confirm'} className="text-xl mt-4" />
        </div>
      </div>
    </ModalTemplate>
  )
}

export default ProductEditQuantityModal
