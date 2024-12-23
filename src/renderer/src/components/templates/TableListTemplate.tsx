import React from 'react'
import TableRowTemplate from './components/TableListTemplate/TableRowTemplate'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'

interface ITableListTemplateProps<T> {
  listTitle?: string
  columns: string[]
  data: T[]
  rowConfig: (rowItem: T) => IRowConfigs
  children?: React.ReactNode
  rowUniqueKey?: string
}

const TableListTemplate = <T,>({
  listTitle,
  columns,
  data,
  rowConfig,
  children,
  rowUniqueKey
}: ITableListTemplateProps<T>): React.ReactElement => {
  const renderColumn: (arg: { name: string }) => JSX.Element = ({ name }) => {
    return (
      <th key={name} className="px-4 py-2 font-bold text-xs text-center">
        {name}
      </th>
    )
  }

  const isListEmpty = !data.length

  return (
    <React.Fragment>
      {listTitle ? <div className="border-b-sectBorder border-b-2 mb-2">{listTitle}</div> : null}
      {children}
      <div className="border border-sectBorder p-4 rounded-xs flex-grow flex flex-col overflow-auto">
        <div className="flex flex-col flex-grow overflow-auto">
          <table className="min-w-full table-auto border-collapse border-0 overflow-auto">
            {isListEmpty ? (
              <div className="text-center text-lg font-bold p-4 text-light">List Empty</div>
            ) : (
              <thead className="bg-gray-800 text-white">
                <tr>{columns.map((colName) => renderColumn({ name: colName }))}</tr>
              </thead>
            )}

            <tbody className="text-xs border-collapse border-0">
              {data.map((rowRecord) => {
                const row = rowRecord as unknown as { id: string }

                const itemKey = rowUniqueKey ? row?.[rowUniqueKey] : row?.id

                if (itemKey) {
                  return <TableRowTemplate key={itemKey} row={rowConfig(rowRecord)} />
                }

                return null
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TableListTemplate
