import { MainAppTemplate, TableListTemplate } from '@renderer/components/templates'
import { useGetShelfStockRecordsByCriteria } from '@renderer/hooks/reports'
import { IDateFormats } from '@renderer/interfaces/dateFormat.interface'
import { IDTOShelfStockRecord } from '@renderer/interfaces/reports.dto'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'
import { formatDate } from '@renderer/utils/dateTime'
import { useEffect, useState } from 'react'
import { ReportShelfFilterMenu } from './components'

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

  return [
    productName,
    `${quantity}`,
    transactionType,
    reason,
    formatDate(createdAt, IDateFormats.YYYYMMDDhhmmss)
  ]
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
        <ReportShelfFilterMenu
          onHandleSubmit={(formData) => {
            console.log('-- SEARCH FORM DATA: ', formData)
          }}
        />
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
