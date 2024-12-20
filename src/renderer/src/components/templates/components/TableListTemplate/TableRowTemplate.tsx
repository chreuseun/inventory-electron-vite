/* eslint-disable react/prop-types */
import React from 'react'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'

export enum IRowExceptionKeys {
  ALERT_ROW = 'ALERT_ROW',
  ACTIVE_ROW = 'ACTIVE_ROW'
}

const TableRowTemplate: React.FC<{ row: IRowConfigs }> = ({ row }) => {
  const isShouldRenderAlertRow = row.some((item) => item === IRowExceptionKeys.ALERT_ROW)

  const renderRow: (arg: { renderRow: string | JSX.Element }) => JSX.Element | null = ({
    renderRow
  }) => {
    if (renderRow === IRowExceptionKeys.ALERT_ROW) {
      return null
    }

    return (
      <td className={`text-center px-2 py-2 ${isShouldRenderAlertRow ? 'bg-error' : ''}`}>
        {renderRow}
      </td>
    )
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
