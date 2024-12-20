import {
  ShelfTransactionTypes,
  StandardInventoryIntention,
  StandardInventoryReason,
  StandardTransactors
} from '@renderer/interfaces/inventroy.interface'
import { handleError } from '@renderer/utils/api'
import { showToast } from '@renderer/utils/reactToastify'
import { executeSQLiteQuery, ISqliteUpdateResponse } from '@renderer/utils/sqlite'
import { generateUUID } from '@renderer/utils/uuid'
import { useState } from 'react'

const MINUS_PRODUCT_SHELF_BY_ID = `
UPDATE products
SET
	shelf_quantity=shelf_quantity - @shelfQuantity
WHERE
  id=@productID
`

const INSERT_DEBIT_SHELF_TRANSACTION = `
INSERT INTO shelf_stock_transactions (
reference_id,
  product_id,
  quantity,
  transaction_type,
  created_by,
  transacted_by,
  intention,
  reason
) VALUES (
  @referenceID, 
  @productID,
  @shelfQuantity,
  @transactionType,
  @createdBy,
  @transactedBy,
  @reason,
  @intention
)
`

type IRunUpdateProductShelfInventory = (arg: {
  productID: string
  shelfQuantity: number
}) => Promise<void>

type UseUpdateProductShelfInventory = (args?: {
  onCompleted?: (response: ISqliteUpdateResponse) => void
  onError?: (errMsg: string) => void
}) => {
  updatingShelf: boolean
  runUpdateProductShelfInventory: IRunUpdateProductShelfInventory
}

const useUpdateProductShelfInventory: UseUpdateProductShelfInventory = (props) => {
  const [updatingShelf, setUpdatingShelf] = useState(false)

  const runUpdateProductShelfInventory: IRunUpdateProductShelfInventory = async (args) => {
    setUpdatingShelf(true)

    try {
      const response = (await executeSQLiteQuery({
        sql: MINUS_PRODUCT_SHELF_BY_ID,
        params: [args],
        operationName: 'runUpdateProductShelfInventory',
        action: 'update'
      })) as ISqliteUpdateResponse

      if (response.error) {
        throw new Error(response.error)
      }

      const addToShelfTxnResponse = (await executeSQLiteQuery({
        sql: INSERT_DEBIT_SHELF_TRANSACTION,
        params: [
          {
            referenceID: generateUUID(),
            productID: Number(args.productID).toFixed(),
            shelfQuantity: args.shelfQuantity,
            transactionType: ShelfTransactionTypes.OUT,
            createdBy: StandardTransactors.SYSTEM,
            transactedBy: StandardTransactors.SYSTEM,
            reason: StandardInventoryReason.SALE,
            intention: StandardInventoryIntention.PURCHASE
          }
        ],
        operationName: 'addToShelfResponse',
        action: 'create'
      })) as ISqliteUpdateResponse

      if (addToShelfTxnResponse.error) {
        throw new Error(addToShelfTxnResponse.error)
      }

      showToast({
        type: `success`,
        message: `Product Shelf Stock Updated`
      })

      if (props?.onCompleted) {
        props.onCompleted(response)
      }
    } catch (sqlError) {
      handleError(`${sqlError}`, props?.onError)
    }

    setUpdatingShelf(false)
  }

  return {
    updatingShelf,
    runUpdateProductShelfInventory
  }
}

export default useUpdateProductShelfInventory
