/* eslint-disable react/prop-types */
import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import ProductListItem from './ProductListItem'

const COL_NAMES = ['Product', 'Qty.', 'Shelf Qty.']

const ProductsInventoryList: React.FC<{ products: IDTOProduct[] }> = ({ products }) => {
  const renderColumn: (arg: { name: string }) => JSX.Element = ({ name }) => {
    return (
      <th key={name} className="px-4 py-2 border  font-bold text-xs">
        {name}
      </th>
    )
  }

  return (
    <div className="flex flex-col flex-grow">
      <table className="min-w-full table-auto border-sectBorder">
        <thead className="bg-gray-800 text-white">
          <tr className="border-b-2">
            {COL_NAMES.map((colName) => renderColumn({ name: colName }))}
          </tr>
        </thead>
        <tbody className="text-xs">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsInventoryList
