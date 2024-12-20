import { handleError } from '@renderer/utils/api'
import { showToast } from '@renderer/utils/reactToastify'
import { executeSQLiteQuery, ISqliteUpdateResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const UPDATE_PRODUCT_SHELF_BY_ID = `
UPDATE products
SET
	shelf_quantity=@shelfQuantity
WHERE
  id=@productID
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
        sql: UPDATE_PRODUCT_SHELF_BY_ID,
        params: [args],
        operationName: 'runUpdateProductShelfInventory',
        action: 'update'
      })) as ISqliteUpdateResponse
      response.result

      if (response.error) {
        handleError(response.error, props?.onError)
      } else {
        showToast({
          type: `success`,
          message: `Product Shelf Stock Updated`
        })

        if (props?.onCompleted) {
          props.onCompleted(response)
        }
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
