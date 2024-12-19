/* eslint-disable react/prop-types */
import { MinusCircleIcon, PlusCircleIcon, XIcon } from '@renderer/components/icons'
import { ModalTemplate } from '@renderer/components/templates'
import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import { useState } from 'react'

const ProductEditQuantityModal: React.FC<{ product: IDTOProduct; onClose?: () => void }> = ({
  product,
  onClose
}) => {
  const [warehouseQTY, setWarehouseQTY] = useState(product.current_warehouse_quantity)

  const renderPlusButton: () => JSX.Element = () => {
    const incrementQTY: () => void = () => {
      setWarehouseQTY((prev) => prev + 1)
    }

    return (
      <button
        title="Add New"
        onClick={incrementQTY}
        className="group cursor-pointer outline-none  duration-300"
      >
        <PlusCircleIcon className="size-14" />
      </button>
    )
  }

  const renderMinusButton: () => JSX.Element = () => {
    const decrementQTY: () => void = () => {
      setWarehouseQTY((prev) => prev - 1)
    }

    return (
      <button
        title="Remove"
        onClick={decrementQTY}
        className="group cursor-pointer outline-none  duration-300"
      >
        <MinusCircleIcon className="size-14" />
      </button>
    )
  }

  return (
    <ModalTemplate>
      <div className="p-2 bg-white rounded-sm text-dark m-auto">
        <XIcon className="cursor-pointer size-9" onClick={onClose} />
        <div className="pt-4">
          <div className="pb-2 text-center text-sm">{product.display_name}</div>
          <div className="flex-row flex">
            {renderMinusButton()}
            <input
              className="p-2 pl-4 border-secondaryText border-4 text- w-32 text-center text-xl font-bold rounded-md"
              type="number"
              value={warehouseQTY}
              onChange={(e) => setWarehouseQTY(parseInt(e.target.value))}
            />
            {renderPlusButton()}
          </div>
        </div>
      </div>
    </ModalTemplate>
  )
}

export default ProductEditQuantityModal
