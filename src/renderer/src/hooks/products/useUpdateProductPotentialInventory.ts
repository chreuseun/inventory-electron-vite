import { handleError } from '@renderer/utils/api'
import {
  executeSQLiteQuery,
  ISqliteBulkInsertResponse,
  ISqliteCreateResponse,
  ISqliteListResponse,
  ISqliteReadResponse,
  ISqliteUpdateResponse
} from '@renderer/utils/sqlite'
import { useState } from 'react'
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import { showToast } from '@renderer/utils/reactToastify'
import { generateUUID } from '@renderer/utils/uuid'
import {
  ShelfTransactionTypes,
  StandardInventoryIntention,
  StandardInventoryReason,
  StandardTransactors,
  StockTransactionTypes
} from '@renderer/interfaces/inventory.interface'

const GET_PRODUCT_RECIPE_ID = `
SELECT 
    id,
    current_recipe_id

FROM products

WHERE id = @productID
`

const GET_RECIPE_ITEMS_BY_RECIPE_ID = `
SELECT 
	material_id,
	quantity_required
	
FROM  recipe_items

WHERE recipe_id = @recipeID
`

const MINUS_QUANTITY_FROM_MATERIALS = `
UPDATE 
  materials 

SET
  current_stock_quantity = current_stock_quantity - @quantity_required

WHERE 
  id = @material_id
`

const UPDATE_PRODUCT_SHELF_QUANTITY_AFTER_MATERIAL_REDUCTION = `
UPDATE 
  products 

SET
  shelf_quantity = shelf_quantity + @productQuantity

WHERE id = @productID
`

const INSERT_POTENTIAL_INVENTORY_TRANSACTION = `
INSERT INTO stock_transactions (
  reference_id,
  product_id,
  recipe_id,
  material_id,
  material_quantity,
  product_quantity,
  transaction_type,
  created_by,
  transacted_by,
  intention,
  reason
) VALUES (
  @referenceID,
  @productID,
  @recipeID,
  @materialID,
  @materialQuantity,
  @productQuantity,
  @transactionType,
  @createdBy,
  @transactedBy,
  @intention,
  @reason
)
`

const INSERT_IN_SHELF_TRANSACTION = `
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

type ProductWithRecipeID = {
  id: string
  current_recipe_id: string
}

type IRunUpdateProductPotentialInventory = (args: {
  product: IDTOProductPotentialStock
  productQuantity: number
}) => Promise<void>
type UseUpdateProductPotentialInventory = (args?: {
  onCompleted?: (data: ISqliteBulkInsertResponse) => void
  onError?: (errMsg: string) => void
}) => {
  updatingPotentialInventory
  runUpdateProductPotentialInventory: IRunUpdateProductPotentialInventory
}

/**
 * useUpdateProductPotentialInventory hook
 *
 * This hook is used to update the potential inventory of a product. It takes in the product and the quantity to be added as arguments.
 *
 * Here is the step-by-step process of the hook:
 * 1. Get the current_recipe_id of the product
 * 2. Get the recipe_items by recipe_id
 * 3. Get the materials by material_id with quantity_required
 * 4. Bulk update the record in the material table
 * 5. Reload the page
 *
 * The hook returns an object with two properties: `updatingPotentialInventory` and `runUpdateProductPotentialInventory`.
 * `updatingPotentialInventory` is a boolean that indicates whether the hook is currently updating the potential inventory.
 * `runUpdateProductPotentialInventory` is a function that takes in the product and the quantity to be added as arguments and updates the potential inventory.
 *
 * The hook also takes in two optional arguments: `onCompleted` and `onError`. `onCompleted` is a function that is called when the hook is completed successfully. `onError` is a function that is called when the hook encounters an error.
 */
const useUpdateProductPotentialInventory: UseUpdateProductPotentialInventory = (args = {}) => {
  const [updatingPotentialInventory, setUpdatingPotentialInventory] = useState(false)

  const runUpdateProductPotentialInventory: IRunUpdateProductPotentialInventory = async ({
    product,
    productQuantity
  }) => {
    setUpdatingPotentialInventory(true)
    try {
      const stockTransactionReferenceID = generateUUID()

      // STEP 1: get the current_recipe_id
      const getProductRecipeID = (await executeSQLiteQuery({
        sql: GET_PRODUCT_RECIPE_ID,
        params: [
          {
            productID: product.id
          }
        ],
        operationName: 'runUpdateProductPotentialInventory',
        action: 'read'
      })) as ISqliteReadResponse<ProductWithRecipeID>

      if (getProductRecipeID.error) {
        throw new Error(getProductRecipeID.error)
      }

      // STEP 2: find in server what is the `current_recipe_id`
      const recipeID = getProductRecipeID.result.current_recipe_id

      // STEP 3: Get Recipe_items by recipe_id
      const recipeItems = (await executeSQLiteQuery({
        sql: GET_RECIPE_ITEMS_BY_RECIPE_ID,
        params: [
          {
            recipeID
          }
        ],
        operationName: 'runUpdateProductPotentialInventory',
        action: 'list'
      })) as ISqliteListResponse<{
        material_id: string
        quantity_required: number
      }>

      if (recipeItems.error) {
        throw new Error(recipeItems.error)
      }
      // STEP 4: Get materials by material_id with quantity_required
      const materialsList = recipeItems.result

      // STEP 5 bulk update record in material table
      const updateMaterialsQuantity = (await executeSQLiteQuery({
        sql: MINUS_QUANTITY_FROM_MATERIALS,
        params: materialsList.map((material) => {
          return {
            material_id: material.material_id,
            quantity_required: material.quantity_required * productQuantity
          }
        }),
        action: 'bulkUpsert',
        operationName: 'runUpdateProductPotentialInventory'
      })) as ISqliteBulkInsertResponse

      if (updateMaterialsQuantity.error) {
        throw new Error(updateMaterialsQuantity.error)
      }

      //STEP 6 update products.shelf_quantity
      const updateProductNewShelfQuantity = (await executeSQLiteQuery({
        sql: UPDATE_PRODUCT_SHELF_QUANTITY_AFTER_MATERIAL_REDUCTION,
        params: [
          {
            productID: product.id,
            productQuantity
          }
        ],
        action: 'update',
        operationName: 'updateProductNewShelfQuantity'
      })) as ISqliteUpdateResponse

      if (updateProductNewShelfQuantity.error) {
        throw new Error(updateProductNewShelfQuantity.error)
      }

      // STEP 7: Append transaction record to shelf_stock_transactions
      const addToShelfTxnResponse = (await executeSQLiteQuery({
        sql: INSERT_IN_SHELF_TRANSACTION,
        params: [
          {
            referenceID: generateUUID(),
            productID: Number(product.id).toFixed(),
            shelfQuantity: productQuantity,
            transactionType: ShelfTransactionTypes.IN,
            createdBy: StandardTransactors.SYSTEM,
            transactedBy: StandardTransactors.SYSTEM,
            reason: StandardInventoryReason.RESTOCK_SHELF,
            intention: StandardInventoryIntention.TRANSFER
          }
        ],
        operationName: 'addToShelfTxnResponse',
        action: 'create'
      })) as ISqliteCreateResponse

      if (addToShelfTxnResponse.error) {
        throw new Error(addToShelfTxnResponse.error)
      }

      // STEP 8 Append transaction record to stock_transactions
      const insertStockTransactions = (await executeSQLiteQuery({
        sql: INSERT_POTENTIAL_INVENTORY_TRANSACTION,
        params: materialsList.map((material) => {
          return {
            referenceID: stockTransactionReferenceID,
            productID: Number(product.id).toFixed(),
            materialID: material.material_id,
            materialQuantity: material.quantity_required * productQuantity,
            productQuantity: productQuantity,
            recipeID: recipeID,
            transactionType: StockTransactionTypes.IN,
            createdBy: StandardTransactors.SYSTEM,
            transactedBy: StandardTransactors.SYSTEM,
            reason: StandardInventoryReason.SALE,
            intention: StandardInventoryIntention.PURCHASE
          }
        }),
        action: 'bulkUpsert',
        operationName: 'insertStockTransactions'
      })) as ISqliteBulkInsertResponse

      if (insertStockTransactions.error) {
        throw new Error(insertStockTransactions.error)
      }

      showToast({
        type: 'success',
        message: `Product Potential Inventory Updated`
      })
      args?.onCompleted?.(updateMaterialsQuantity)

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      handleError(`${error}`, args?.onError)
      setUpdatingPotentialInventory(false)
    }
  }

  return { updatingPotentialInventory, runUpdateProductPotentialInventory }
}

export default useUpdateProductPotentialInventory
