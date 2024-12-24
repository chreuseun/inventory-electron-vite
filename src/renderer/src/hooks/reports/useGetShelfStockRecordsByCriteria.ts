import { ShelfTransactionTypes } from '@renderer/interfaces/inventory.interface'
import { IDTOShelfStockRecord } from '@renderer/interfaces/reports.dto'
import { handleError } from '@renderer/utils/api'
import { showToast } from '@renderer/utils/reactToastify'
import { executeSQLiteQuery, ISqliteListResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const GET_SHELF_STOCK_RECORDS_BY_CRITERIA = `
SELECT 
	shTXN.id AS shelf_transaction_ID,
	shTXN.transacted_by,
	shTXN.product_id,
	pd.display_name,
	shTXN.quantity,
	shTXN.transaction_type,
	shTXN.reason,
	shTXN.intention,
	STRFTIME('%Y-%m-%d %H:%M:%S ', DATETIME( shTXN.created_at, '+8 hours' )) as created_at
	
FROM shelf_stock_transactions as shTXN
LEFT JOIN  products as pd on pd.id= shTXN.product_id

WHERE  
    ( @productName  IS NULL OR pd.display_name LIKE '%' || @productName || '%')  
    AND ( @transactionType IS NULL OR shTXN.transaction_type LIKE '%' || @transactionType || '%')

ORDER BY shTXN.created_at DESC
`

type IRunGetShelfStockRecordsByCriteriaSQLParams = {
  productName: string | null
  transactionType: ShelfTransactionTypes | null
  startDateRange: string | null
  endDateRange: string | null
}

type IRunGetShelfStockRecordsByCriteria = (
  arg0: IRunGetShelfStockRecordsByCriteriaSQLParams
) => Promise<void>

type IUseGetShelfSockRecordsByCriteria = (arg0: {
  onCompleted?: (response: ISqliteListResponse<IDTOShelfStockRecord>) => void
  onError?: (errMsg: string) => void
}) => {
  fetchingShelfStockRecords: boolean
  runGetShelfStockRecordsByCriteria: IRunGetShelfStockRecordsByCriteria
}

const useGetShelfStockRecordsByCriteria: IUseGetShelfSockRecordsByCriteria = (args) => {
  const [fetchingShelfStockRecords, setFetchingShelfStockRecords] = useState(false)

  const runGetShelfStockRecordsByCriteria: IRunGetShelfStockRecordsByCriteria = async ({
    productName,
    transactionType,
    startDateRange,
    endDateRange
  }) => {
    setFetchingShelfStockRecords(true)

    try {
      const paramsItem = {
        productName,
        transactionType,
        startDateRange,
        endDateRange
      }

      const shelfStockRecordsList = (await executeSQLiteQuery({
        sql: GET_SHELF_STOCK_RECORDS_BY_CRITERIA,
        action: 'list',
        params: [paramsItem],
        operationName: 'shelfStockRecordsList'
      })) as ISqliteListResponse<IDTOShelfStockRecord>

      if (shelfStockRecordsList.error) {
        throw new Error(shelfStockRecordsList.error)
      }

      args.onCompleted && args?.onCompleted(shelfStockRecordsList)
    } catch (error) {
      handleError(`${error}`, args?.onError)
    }

    setFetchingShelfStockRecords(false)
  }

  return {
    fetchingShelfStockRecords,
    runGetShelfStockRecordsByCriteria
  }
}

export default useGetShelfStockRecordsByCriteria
