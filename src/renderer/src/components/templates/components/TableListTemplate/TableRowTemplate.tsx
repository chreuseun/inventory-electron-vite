/* eslint-disable react/prop-types */

const TableRowTemplate: React.FC<{ row: (string | JSX.Element)[] }> = ({ row }) => {
  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="text-center px-2 py-2">{renderRow}</td>
  }

  return (
    <tr className="hover:bg-sectBorder border-collapse border-0 text-xs">
      {row.map((rowItem) => renderRow({ renderRow: rowItem }))}
    </tr>
  )
}

export default TableRowTemplate
