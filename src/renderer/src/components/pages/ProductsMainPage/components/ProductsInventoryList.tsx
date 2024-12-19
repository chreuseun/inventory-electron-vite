/* eslint-disable react/prop-types */
import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import ProductListItem from './ProductListItem'

const COL_NAMES = ['Product', 'Qty.', 'Shelf Qty.', '-']

const ProductsInventoryList: React.FC<{ products: IDTOProduct[] }> = ({ products }) => {
  const renderColumn: (arg: { name: string }) => JSX.Element = ({ name }) => {
    return (
      <th key={name} className="px-4 py-2 font-bold text-xs text-center">
        {name}
      </th>
    )
  }

  return (
    <div className="flex flex-col flex-grow overflow-auto">
      <table className="min-w-full table-auto border-collapse border-0 overflow-auto">
        <thead className="bg-gray-800 text-white">
          <tr>{COL_NAMES.map((colName) => renderColumn({ name: colName }))}</tr>
        </thead>
        <tbody className="text-xs border-collapse border-0">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsInventoryList
