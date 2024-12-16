import React from 'react'

const ProductListItem: React.FC = () => {
  const renderColumn: (arg: { name: string }) => JSX.Element = ({ name }) => {
    return <th className="px-4 py-2 border  font-bold text-xs">{name}</th>
  }

  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="px-4 py-2 border">{renderRow}</td>
  }

  return (
    <div className="flex flex-col flex-grow">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b-2">
            {renderColumn({ name: 'Product' })}
            {renderColumn({ name: 'Qty.' })}
            {renderColumn({ name: 'Shelf Qty.' })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {renderRow({ renderRow: 'data 1' })}
            {renderRow({ renderRow: 'data 2' })}
            {renderRow({ renderRow: 'data 3' })}
          </tr>
          <tr>
            {renderRow({ renderRow: 'data 11' })}
            {renderRow({ renderRow: 'data 22' })}
            {renderRow({ renderRow: 'data 33' })}
          </tr>
        </tbody>
      </table>
    </div>
  )

  //   return (
  //     <div className="m-2 flex flex-grow">
  //       <div className="border-red-300 border flex-grow">x</div>
  //       <div className="border-green-400 border flex-grow">y</div>
  //     </div>
  //   )

  //   return (
  // <React.Fragment>
  //   <div className="shadow-md rounded-sm border-b-sectBorder border-b px-2 mx-4">
  //     {renderColumn({ name: 'Product Name' })}
  //     {renderColumn({ name: 'Potential Count' })}
  //     {renderColumn({ name: 'Shelf Count' })}
  //   </div>
  //   <div className="shadow-md rounded-sm border-b-sectBorder border-b px-2 mx-4">
  //     {renderRow({ name: 'Product Name' })}
  //     {renderRow({ name: 'Potential Count' })}
  //     {renderRow({ name: 'Shelf Count' })}
  //   </div>
  // </React.Fragment>
  //   )
}

export default ProductListItem
