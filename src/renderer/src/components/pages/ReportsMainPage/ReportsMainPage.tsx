import { MyButton, MyTextInput } from '@renderer/components/common'
import { MainAppTemplate, TableListTemplate } from '@renderer/components/templates'
import { useGetShelfStockRecordsByCriteria } from '@renderer/hooks/reports'
import { IDTOShelfStockRecord } from '@renderer/interfaces/reports.dto'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'
import { useEffect, useState } from 'react'

const generateShelfReportRows: (shelfStockRecord: IDTOShelfStockRecord) => IRowConfigs = (
  shelfStockRecord
) => {
  const {
    display_name: productName,
    quantity,
    transaction_type: transactionType,
    reason,
    created_at: createdAt
  } = shelfStockRecord

  return [productName, `${quantity}`, transactionType, reason, createdAt]
}

const columns = ['Product', 'Qty.', 'type', 'Reason', 'Date']

const ReportsMainPage: React.FC = () => {
  const [shelfStockRecords, setShelfStockRecords] = useState<IDTOShelfStockRecord[]>([])
  const { fetchingShelfStockRecords, runGetShelfStockRecordsByCriteria } =
    useGetShelfStockRecordsByCriteria({
      onCompleted: (data) => {
        setShelfStockRecords(data.result)
      }
    })

  useEffect(() => {
    runGetShelfStockRecordsByCriteria({
      productName: 'uya',
      startDateRange: null,
      endDateRange: null,
      transactionType: null
    })
  }, [])

  return (
    <MainAppTemplate
      headerText="Reports"
      className="flex flex-col"
      loading={fetchingShelfStockRecords}
    >
      <div className="p-2 flex-grow flex flex-col overflow-auto">
        <div className="mb-2 flex justify-between">
          <div className="flex flex-row">
            <MyTextInput onChange={() => {}} placeholder="Product Name" />
            <MyButton label={`Generate Report`} className="ml-2" onClick={() => {}} />
          </div>
        </div>
        <TableListTemplate<IDTOShelfStockRecord>
          listTitle="Shelf Stock Transactions"
          columns={columns}
          data={shelfStockRecords}
          rowConfig={generateShelfReportRows}
          rowUniqueKey={'shelf_transaction_ID'}
        />
      </div>
    </MainAppTemplate>
  )
}

export default ReportsMainPage
