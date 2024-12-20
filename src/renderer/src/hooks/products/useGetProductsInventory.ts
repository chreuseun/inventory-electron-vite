import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import { executeSQLiteQuery, ISqliteListResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const GET_PRODUCTS_MATERIALS_POTENTIAL_STOCK = `
SELECT 
	pd.id AS 'id',
  pd.reference_id AS 'reference_id',
	pd.display_name AS 'display_name',
  pd.shelf_quantity,
	MIN(
    CASE  
      WHEN mt.current_stock_quantity>= rt.quantity_required THEN  FLOOR(mt.current_stock_quantity/rt.quantity_required)
      ELSE 0 
    END
	) AS 'potential_stock',
  pd.alert_threshold,
	GROUP_CONCAT(rt.material_id,',')  AS 'material_ids',
	COUNT(rt.material_id) AS 'materials_count'


FROM products AS pd
 
JOIN recipe_items AS rt ON rt.recipe_id = pd. current_recipe_id 

JOIN materials AS mt  ON mt.id =rt.recipe_id

GROUP BY pd.id
`

type IRunGetProductsInventory = () => Promise<void>

type IUseGetProductsInventory = (args?: {
  onCompleted?: (data: ISqliteListResponse<IDTOProductPotentialStock>) => void
  onError?: (err: string) => void
}) => {
  fetchingProducts: boolean
  runGetProductsInventory: IRunGetProductsInventory
  products: IDTOProductPotentialStock[]
}

const useGetProductsInventory: IUseGetProductsInventory = (args) => {
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [products, setProducts] = useState<IDTOProductPotentialStock[]>([])

  const handleCompleted: (data: ISqliteListResponse<IDTOProductPotentialStock>) => void = (
    data
  ) => {
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
        sql: GET_PRODUCTS_MATERIALS_POTENTIAL_STOCK,
        params: [],
        operationName: 'useGetProductsInventory',
        action: 'list'
      })) as ISqliteListResponse<IDTOProductPotentialStock>

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
