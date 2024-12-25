import { useEffect, useState } from 'react'

import { TableListTemplate } from '@renderer/components/templates'
import { useGetInventoryStockRecordsByCriteria } from '@renderer/hooks/reports'
import { IDTOInventoryStockRecord } from '@renderer/interfaces/reports.dto'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'
import InventoryReportCriteriaMenu from './InventoryReportCriteriaMenu'
import { FieldValues } from 'react-hook-form'
import { IDateRangeValue } from '@renderer/interfaces/form.interface'
import { StockTransactionTypes } from '@renderer/interfaces/inventory.interface'

const tableCols = ['Product', 'Material', 'Material Qty.', 'Product Qty.', 'Type', 'Reason', 'Date']

const generateInventoryReportsRowConfig: (arg0: IDTOInventoryStockRecord) => IRowConfigs = (
  rowItem
) => {
  const {
    product,
    material,
    material_quantity,
    transaction_type,
    created_at,
    product_quantity,
    reason
  } = rowItem

  return [
    product,
    material,
    `${material_quantity}`,
    `${product_quantity}`,
    transaction_type,
    reason,
    created_at
  ]
}

const InventoryReportsList: React.FC = () => {
  const [inventoryRecord, setInventoryRecord] = useState<IDTOInventoryStockRecord[]>([])
  const { runGetInventoryStockRecordsByCriteria, fetchingInventoryReports } =
    useGetInventoryStockRecordsByCriteria({
      onCompleted: (response) => {
        setInventoryRecord(response.result)
      }
    })

  useEffect(() => {
    runGetInventoryStockRecordsByCriteria({
      productName: null,
      materialName: null,
      startDateRange: null,
      endDateRange: null
    })
  }, [])

  const onHandleSubmit: (formData: FieldValues) => void = (formData) => {
    const { product, shelfDateRange, transactionType } = formData as {
      product: string
      shelfDateRange: string | IDateRangeValue
      transactionType: StockTransactionTypes | null
    }
    const { start, end } = shelfDateRange as IDateRangeValue

    runGetInventoryStockRecordsByCriteria({
      productName: product,
      materialName: transactionType,
      startDateRange: start,
      endDateRange: end
    })
  }

  return (
    <div className="p-2 flex-grow flex flex-col overflow-auto">
      <TableListTemplate<IDTOInventoryStockRecord>
        listTitle="Inventory Transactions"
        columns={tableCols}
        data={inventoryRecord}
        rowConfig={generateInventoryReportsRowConfig}
        listLoading={fetchingInventoryReports}
      >
        <InventoryReportCriteriaMenu onHandleSubmit={onHandleSubmit} />
      </TableListTemplate>
    </div>
  )
}

export default InventoryReportsList
