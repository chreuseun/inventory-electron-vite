import { MyButton } from '@renderer/components/common'
import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import React, { useState } from 'react'
import ProductEditQuantityModal from './ProductEditQuantityModal'

const ProductListItem: React.FC<{ product: IDTOProduct }> = ({ product }) => {
  const [showEditQTY, setShowEditQTY] = useState(false)

  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="text-center px-2 py-2">{renderRow}</td>
  }

  const onCloseUpdateStockModal: () => void = () => {
    setShowEditQTY(false)
  }

  const renderUpdateStockButton: () => JSX.Element = () => {
    const onClickUpdateStock: () => void = () => {
      setShowEditQTY(true)
    }

    return (
      <div>
        <MyButton className="m-1" label={'Update'} onClick={onClickUpdateStock} />
      </div>
    )
  }

  const {
    display_name: displayName,
    shelf_quantity: shelfQTY,
    current_warehouse_quantity: currentQty
  } = product
  return (
    <tr className="hover:bg-sectBorder border-collapse border-0 text-xs">
      {renderRow({ renderRow: displayName })}
      {renderRow({ renderRow: `${currentQty}` })}
      {renderRow({ renderRow: shelfQTY })}
      {renderRow({
        renderRow: renderUpdateStockButton()
      })}
      {showEditQTY ? (
        <ProductEditQuantityModal
          label="Produce "
          product={product}
          onClose={onCloseUpdateStockModal}
        />
      ) : null}
    </tr>
  )
}

export default ProductListItem
