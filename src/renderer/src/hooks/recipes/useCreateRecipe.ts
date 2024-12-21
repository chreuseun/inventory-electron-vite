import { handleError } from '@renderer/utils/api'
import { showToast } from '@renderer/utils/reactToastify'
import {
  executeSQLiteQuery,
  ISqliteBulkInsertResponse,
  ISqliteCreateResponse
} from '@renderer/utils/sqlite'
import { useState } from 'react'
const CREATE_NEW_RECIPE = `
INSERT INTO recipes (
    reference_id,
    name,
    description,
    created_by
)

VALUES (
    @reference_id,
    @name,
    @description,
    @created_by
)
`

const CREATE_NEW_RECIPE_ITEM = `
INSERT INTO recipe_items (
    recipe_id,
    material_id,
    quantity_required,
    created_by,
    is_active
)

VALUES (
    @recipe_id,
    @material_id,
    @quantity_required,
    @created_by,
    1
)
`

type IRunCreateRecipe = (args: {
  name: string
  description: string
  recipeItems: { value: string; quantity: number }[]
}) => Promise<void>

type IUseCreateRecipe = (args?: {
  onCompleted?: (data: ISqliteBulkInsertResponse) => void
  onError?: (err: string) => void
}) => {
  creatingRecipe: boolean
  runCreateRecipe: IRunCreateRecipe
}

const useCreateRecipe: IUseCreateRecipe = (args = {}) => {
  const [creatingRecipe, setCreatingRecipe] = useState(false)

  const runCreateRecipe: IRunCreateRecipe = async ({ name, description, recipeItems }) => {
    setCreatingRecipe(true)

    try {
      const params = [
        {
          reference_id: name.toLowerCase(),
          name,
          description,
          created_by: 'admin'
        }
      ]

      const response = (await executeSQLiteQuery({
        sql: CREATE_NEW_RECIPE,
        params,
        operationName: 'runCreateRecipe',
        action: 'create'
      })) as ISqliteCreateResponse

      const newRecipeID = response?.result?.lastInsertRowid

      if (response.error) {
        throw new Error(response.error)
      } else if (!newRecipeID) {
        throw new Error(`No recipeID found`)
      }

      const resultRecipeItems = (await executeSQLiteQuery({
        sql: CREATE_NEW_RECIPE_ITEM,
        action: 'bulkUpsert',
        params: recipeItems.map(({ quantity, value }) => {
          return {
            recipe_id: Number(newRecipeID).toFixed(),
            material_id: value,
            quantity_required: quantity,
            created_by: 'admin'
          }
        }),
        operationName: 'useCreateRecipe_AddRecipeItems'
      })) as ISqliteBulkInsertResponse

      if (resultRecipeItems.error) {
        throw new Error(resultRecipeItems.error)
      } else {
        showToast({
          type: 'success',
          message: `New Recipe Added: ${resultRecipeItems.result.insertedCount} items for recipe ${name}`
        })
      }

      if (args?.onCompleted) {
        args.onCompleted(resultRecipeItems)
      }
    } catch (error) {
      handleError(`${error}`, args.onError)
    }

    setCreatingRecipe(false)
  }

  return {
    creatingRecipe,
    runCreateRecipe
  }
}

export default useCreateRecipe
