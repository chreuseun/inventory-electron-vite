import { IDTOProductPayload } from '@renderer/interfaces/dtos/products.dto'
import { handleError } from '@renderer/utils/api'
import { showToast } from '@renderer/utils/reactToastify'
import { executeSQLiteQuery, ISqliteBulkInsertResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const INSERT_PRODUCTS = `
    INSERT INTO products (
        reference_id,
        display_name,
        current_recipe_id,
        shelf_quantity,
        base_warehouse_quantity,
        current_warehouse_quantity,
        alert_threshold,
        created_by
    ) VALUES (
        @reference_id,
        @display_name,
        @current_recipe_id,
        @shelf_quantity,
        @base_warehouse_quantity,
        @current_warehouse_quantity,
        @alert_threshold,
        @created_by
    )
`

type IRunCreateProducts = (args: { products: IDTOProductPayload[] }) => Promise<void>

type IUseCreateProducts = (args?: {
  onCompleted?: (response: ISqliteBulkInsertResponse) => void
  onError?: (error: string) => void
}) => {
  isCreatingProducts: boolean
  runCreateProducts: IRunCreateProducts
}

const useCreateProducts: IUseCreateProducts = (args) => {
  const [isCreatingProducts, setCreatingProducts] = useState<boolean>(false)

  const runCreateProducts: IRunCreateProducts = async ({ products }) => {
    setCreatingProducts(true)

    try {
      const response = (await executeSQLiteQuery({
        sql: INSERT_PRODUCTS,
        action: 'bulkUpsert',
        params: products,
        operationName: 'useCreateProducts'
      })) as ISqliteBulkInsertResponse

      const { error: sqlError, result } = response

      if (sqlError) {
        throw new Error(sqlError)
      }

      showToast({
        message: `New Products Added: ${result.insertedCount}`,
        type: 'success'
      })
      args?.onCompleted && args?.onCompleted(response)
    } catch (errMsg) {
      if (args?.onError) {
        handleError(`${errMsg}`)
        args?.onError && args?.onError(`${errMsg}`)
      }
    }

    setCreatingProducts(false)
  }

  return {
    runCreateProducts,
    isCreatingProducts
  }
}

export default useCreateProducts
