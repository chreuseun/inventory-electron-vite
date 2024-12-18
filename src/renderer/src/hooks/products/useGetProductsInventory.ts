import { IDTOProduct } from '@renderer/interfaces/dtos/products.dto'
import { executeSQLiteQuery, ISqliteListResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const GET_ALL_PRODUCT = `
SELECT 
    id,
    reference_id,
    display_name,
    shelf_quantity,
    current_warehouse_quantity,
    alert_threshold
FROM products 

LIMIT 30
`

type IRunGetProductsInventory = () => Promise<void>

type IUseGetProductsInventory = (args?: {
  onCompleted?: (data: ISqliteListResponse<IDTOProduct>) => void
  onError?: (err: string) => void
}) => {
  fetchingProducts: boolean
  runGetProductsInventory: IRunGetProductsInventory
  products: IDTOProduct[]
}

const useGetProductsInventory: IUseGetProductsInventory = (args) => {
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [products, setProducts] = useState<IDTOProduct[]>([])

  const handleCompleted: (data: ISqliteListResponse<IDTOProduct>) => void = (data) => {
    const { result } = data
    setProducts(result)

    if (args?.onCompleted) {
      args.onCompleted(data)
    }
  }
  const handleError: (errMsg: string) => void = (errMsg) => {
    if (args?.onError) {
      args.onError(errMsg)
    }
  }

  const runGetProductsInventory: IRunGetProductsInventory = async () => {
    setFetchingProducts(true)
    try {
      const results = (await executeSQLiteQuery({
        sql: GET_ALL_PRODUCT,
        params: [],
        operationName: 'useGetProductsInventory',
        action: 'list'
      })) as ISqliteListResponse<IDTOProduct>

      const { error: sqlError } = results
      if (sqlError) {
        handleError(sqlError)
      } else {
        handleCompleted(results)
      }
    } catch (error) {
      handleError(`${error}`)
    }

    setFetchingProducts(false)
  }

  return {
    fetchingProducts,
    runGetProductsInventory,
    products
  }
}

export default useGetProductsInventory
