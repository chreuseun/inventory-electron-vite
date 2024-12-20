import { MyButton } from '@renderer/components/common'
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import React from 'react'

import ProductShelfInventoryUpdateView from './ProductShelfInventoryUpdateView'
import ProductPotentialInventoryView from './ProductPotentialInventoryView'

const ProductListItem: React.FC<{ product: IDTOProductPotentialStock }> = ({ product }) => {
  const { display_name: displayName } = product

  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="text-center px-2 py-2">{renderRow}</td>
  }

  return (
    <tr className="hover:bg-sectBorder border-collapse border-0 text-xs">
      {renderRow({ renderRow: displayName })}
      {renderRow({ renderRow: <ProductPotentialInventoryView product={product} /> })}
      {renderRow({
        renderRow: <ProductShelfInventoryUpdateView product={product} />
      })}
      {renderRow({
        renderRow: (
          <div>
            <MyButton className="m-1" label={'Update'} onClick={() => {}} />
          </div>
        )
      })}
    </tr>
  )
}

export default ProductListItem
