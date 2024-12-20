/* eslint-disable react/prop-types */
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import React, { useState } from 'react'
import ProductEditQuantityModal from './ProductEditQuantityModal'
import { useUpdateProductShelfInventory } from '@renderer/hooks/products'
import { MyLoadingModal } from '@renderer/components/common'

const ProductShelfInventoryUpdateView: React.FC<{ product: IDTOProductPotentialStock }> = ({
  product
}) => {
  const [showEditQTY, setShowEditQTY] = useState(false)
  const { runUpdateProductShelfInventory, updatingShelf } = useUpdateProductShelfInventory({
    onCompleted: () => {
      window.location.reload()
    }
  })

  const onCloseModal: () => void = () => {
    setShowEditQTY(false)
  }

  const onClickUpdate: () => void = () => {
    setShowEditQTY(true)
  }
  const onConfirmQty: (qty: number) => void = (qty) => {
    runUpdateProductShelfInventory({
      productID: product.id,
      shelfQuantity: qty
    })
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
          label={<div className="text-md font-semibold bg-error text-dark">Remove from Shelf</div>}
          product={product}
          onClose={onCloseModal}
          onConfirm={onConfirmQty}
        />
      ) : null}
      <MyLoadingModal show={updatingShelf} />
    </React.Fragment>
  )
}

export default ProductShelfInventoryUpdateView
