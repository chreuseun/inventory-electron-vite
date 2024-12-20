/* eslint-disable react/prop-types */
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import React, { useState } from 'react'
import ProductEditQuantityModal from './ProductEditQuantityModal'

const ProductShelfInventoryUpdateView: React.FC<{ product: IDTOProductPotentialStock }> = ({
  product
}) => {
  const [showEditQTY, setShowEditQTY] = useState(false)

  const onCloseModal: () => void = () => {
    setShowEditQTY(false)
  }

  const onClickUpdate: () => void = () => {
    setShowEditQTY(true)
  }

  return (
    <React.Fragment>
      <div className="relative group">
        <div
          onClick={onClickUpdate}
          className="text-light text-lg font-bold p-2 rounded cursor-pointer hover:bg-dark"
        >
          {product.shelf_quantity}
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-secondaryBackground text-white text-center text-px9 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Click to update
        </div>
      </div>
      {showEditQTY ? (
        <ProductEditQuantityModal
          label="Update Shelf Count of "
          product={product}
          onClose={onCloseModal}
        />
      ) : null}
    </React.Fragment>
  )
}

export default ProductShelfInventoryUpdateView
