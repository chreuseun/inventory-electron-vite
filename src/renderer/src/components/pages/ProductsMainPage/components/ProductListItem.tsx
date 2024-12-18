import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import React from 'react'

const ProductListItem: React.FC<{ product: IDTOProduct }> = ({ product }) => {
  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="px-2 py-2">{renderRow}</td>
  }

  const {
    display_name: displayName,
    shelf_quantity: shelfQTY,
    current_warehouse_quantity: currentQty
  } = product
  return (
    <tr className="hover:bg-sectBorder border-collapse border-0">
      {renderRow({ renderRow: displayName })}
      {renderRow({ renderRow: `${currentQty}` })}
      {renderRow({ renderRow: shelfQTY })}
    </tr>
  )
}

export default ProductListItem
