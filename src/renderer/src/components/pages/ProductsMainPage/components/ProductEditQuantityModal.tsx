/* eslint-disable react/prop-types */
import { MinusCircleIcon, PlusCircleIcon, XIcon } from '@renderer/components/icons'
import { ModalTemplate } from '@renderer/components/templates'
import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import { useState } from 'react'

const ProductEditQuantityModal: React.FC<{
  label?: string
  product: IDTOProduct
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
          <div className="text-center text-lg text-light">
            {label}
            {product.display_name}
          </div>
          <div className=" mb-1 text-center text-lg text-light">
            Current Stock: {product.current_warehouse_quantity}
          </div>
          <div className="shadow-md  flex-row flex justify-center">
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
        </div>
      </div>
    </ModalTemplate>
  )
}

export default ProductEditQuantityModal
