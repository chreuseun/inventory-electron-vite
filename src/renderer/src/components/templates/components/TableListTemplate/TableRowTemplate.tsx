/* eslint-disable react/prop-types */
import React from 'react'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'

const TableRowTemplate: React.FC<{ row: IRowConfigs }> = ({ row }) => {
  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element = ({ renderRow }) => {
    return <td className="text-center px-2 py-2">{renderRow}</td>
  }

  return (
    <tr className="hover:bg-sectBorder border-collapse border-0 text-xs">
      {row.map((rowItem, index) => (
        <React.Fragment key={`${rowItem}-${index}`}>
          {renderRow({
            renderRow: rowItem
          })}
        </React.Fragment>
      ))}
    </tr>
  )
}

export default TableRowTemplate
