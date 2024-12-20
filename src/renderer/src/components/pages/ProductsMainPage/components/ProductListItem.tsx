import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import React from 'react'

import ProductShelfInventoryUpdateView from './ProductShelfInventoryUpdateView'
import ProductPotentialInventoryView from './ProductPotentialInventoryView'

const ProductListItem: React.FC<{ product: IDTOProductPotentialStock }> = ({ product }) => {
  const { display_name: displayName } = product

  const rowConfig: (string | JSX.Element)[] = [
    displayName,
    <ProductPotentialInventoryView key={'potential_stock'} product={product} />,
    <ProductShelfInventoryUpdateView key={'shelf_stock'} product={product} />
  ]

  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="text-center px-2 py-2">{renderRow}</td>
  }

  return (
    <tr className="hover:bg-sectBorder border-collapse border-0 text-xs">
      {rowConfig.map((row) => renderRow({ renderRow: row }))}
    </tr>
  )
}

export default ProductListItem
