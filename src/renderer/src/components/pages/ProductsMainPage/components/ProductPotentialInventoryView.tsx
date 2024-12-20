/* eslint-disable react/prop-types */
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import React, { useState } from 'react'
import ProductEditQuantityModal from './ProductEditQuantityModal'

const ProductPotentialInventoryView: React.FC<{ product: IDTOProductPotentialStock }> = ({
  product
}) => {
  const [showEditQTY, setShowEditQTY] = useState(false)

  const onCloseModal: () => void = () => {
    setShowEditQTY(false)
  }

  const onClickUpdate: () => void = () => {
    setShowEditQTY(true)
  }

  const onConfirm: (qty: number) => void = (qty) => {
    console.log('--- ON UPDATE POTENTIAL VIEW: ', qty)
  }

  return (
    <React.Fragment>
      <div className="relative group">
        <div
          onClick={onClickUpdate}
          className="text-light text-lg font-bold p-2 rounded cursor-pointer hover:bg-dark"
        >
          {product.potential_stock}
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-secondaryBackground text-white text-center text-px9 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Click to update
        </div>
      </div>
      {showEditQTY ? (
        <ProductEditQuantityModal
          label="Update Stock of "
          product={product}
          onClose={onCloseModal}
          onConfirm={onConfirm}
        />
      ) : null}
    </React.Fragment>
  )
}

export default ProductPotentialInventoryView
