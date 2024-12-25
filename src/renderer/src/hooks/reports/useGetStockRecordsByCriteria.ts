import { IDTOInventoryStockRecord } from '@renderer/interfaces/reports.dto'
import { handleError } from '@renderer/utils/api'
import { executeSQLiteQuery, ISqliteListResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const GET_STOCK_RECORD_BY_CRITERIA = `
SELECT 

	st.id AS id,
	st.reference_id,
	p.display_name AS product,
	m.display_name AS material,
	st.material_quantity,
	st.product_quantity,
	st.reason,
	st.intention,
  st.transaction_type,
	st.transacted_by,
	STRFTIME('%Y-%m-%d %H:%M:%S ', DATETIME( st.created_at, '+8 hours' )) as created_at,
  st.product_id,
  st.material_id

FROM stock_transactions as st
LEFT JOIN products AS p ON p.id = st.product_id
LEFT JOIN materials AS m ON m.id = st.material_id

WHERE 
    ( @productName IS NULL OR p.display_name LIKE '%' || @productName || '%')
    AND ( @materialName IS NULL OR m.display_name LIKE '%' || @materialName || '%')
    AND ( @startDateRange IS NULL OR @endDateRange IS NULL OR 
      STRFTIME('%Y-%m-%d %H:%M:%S ', DATETIME( st.created_at, '+8 hours' )) >= @startDateRange 
      AND STRFTIME('%Y-%m-%d %H:%M:%S ', DATETIME( st.created_at, '+8 hours' )) <= @endDateRange 
    )


ORDER BY st.created_at DESC
`

type IRunGetInventoryStockRecordsByCriteria = (arg0: {
  productName: string | null
  materialName: string | null
  startDateRange: string | null
  endDateRange: string | null
}) => Promise<void>

type IUseGetInventoryStockRecordsByCriteria = (arg0?: {
  onCompleted?: (response: ISqliteListResponse<IDTOInventoryStockRecord>) => void
  onError?: (err: string) => void
}) => {
  fetchingInventoryReports: boolean
  runGetInventoryStockRecordsByCriteria: IRunGetInventoryStockRecordsByCriteria
}

const useGetInventoryStockRecordsByCriteria: IUseGetInventoryStockRecordsByCriteria = (props) => {
  const [fetchingInventoryReports, setFetchingInventoryReports] = useState(false)

  const runGetInventoryStockRecordsByCriteria: IRunGetInventoryStockRecordsByCriteria = async ({
    materialName,
    productName,
    startDateRange,
    endDateRange
  }) => {
    console.log('--- ', {
      startDateRange,
      endDateRange
    })
    setFetchingInventoryReports(true)
    try {
      const responseGetStockRecordsByCriteria = (await executeSQLiteQuery({
        sql: GET_STOCK_RECORD_BY_CRITERIA,
        params: [
          {
            materialName,
            productName,
            startDateRange,
            endDateRange
          }
        ],
        operationName: 'runGetInventoryStockRecordsByCriteria',
        action: 'list'
      })) as ISqliteListResponse<IDTOInventoryStockRecord>

      if (responseGetStockRecordsByCriteria.error) {
        throw new Error(responseGetStockRecordsByCriteria.error)
      }

      props?.onCompleted && props?.onCompleted(responseGetStockRecordsByCriteria)
    } catch (err) {
      handleError(`${err}`, props?.onError)
    }

    setFetchingInventoryReports(false)
  }

  return {
    fetchingInventoryReports,
    runGetInventoryStockRecordsByCriteria
  }
}

export default useGetInventoryStockRecordsByCriteria
