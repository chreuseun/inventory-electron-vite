/* eslint-disable react/prop-types */

import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import React, { useState } from 'react'
import ProductEditQuantityModal from './ProductEditQuantityModal'
import { useUpdateProductPotentialInventory } from '@renderer/hooks/products'
import { MyLoadingModal } from '@renderer/components/common'
import { showToast } from '@renderer/utils/reactToastify'

const ProductPotentialInventoryView: React.FC<{ product: IDTOProductPotentialStock }> = ({
  product
}) => {
  const [showEditQTY, setShowEditQTY] = useState(false)
  const { updatingPotentialInventory, runUpdateProductPotentialInventory } =
    useUpdateProductPotentialInventory({
      onCompleted: () => {
        onCloseModal()
      }
    })

  const onCloseModal: () => void = () => {
    setShowEditQTY(false)
  }

  const onClickUpdate: () => void = () => {
    setShowEditQTY(true)
  }

  const onConfirm: (productQuantity: number) => void = (productQuantity) => {
    if (!product.id) {
      showToast({
        type: 'error',
        message: 'Invalid Product payload'
      })
    }

    runUpdateProductPotentialInventory({
      product,
      productQuantity: productQuantity
    })
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
          label={
            <div className="text-md font-semibold bg-success text-dark px-2">
              Generate then add to shelf
            </div>
          }
          product={product}
          onClose={onCloseModal}
          onConfirm={onConfirm}
        />
      ) : null}
      <MyLoadingModal show={updatingPotentialInventory} />
    </React.Fragment>
  )
}

export default ProductPotentialInventoryView
