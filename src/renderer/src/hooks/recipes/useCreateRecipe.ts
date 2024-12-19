import { showToast } from '@renderer/utils/reactToastify'
import { executeSQLiteQuery, ISqliteCreateResponse } from '@renderer/utils/sqlite'
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

VALUE (
    @recipe_id,
    @material_id,
    @quantity_required,
    @created_by,
    1
)
`

type IRunCreateRecipe = (args: { name: string; description: string }) => Promise<void>

type IUseCreateRecipe = (args?: {
  onCompleted?: (data: ISqliteCreateResponse) => void
  onError?: (err: string) => void
}) => {
  creatingRecipe: boolean
  runCreateRecipe: IRunCreateRecipe
}

const useCreateRecipe: IUseCreateRecipe = (args = {}) => {
  const [creatingRecipe, setCreatingRecipe] = useState(false)

  const handleError: (errMsg: string) => void = (errMsg) => {
    showToast({
      message: `useCreateRecipe: ${errMsg}`,
      type: 'error'
    })

    if (args?.onError) {
      args.onError(errMsg)
    }
  }

  const runCreateRecipe: IRunCreateRecipe = async ({ name, description }) => {
    setCreatingRecipe(true)

    try {
      // step 1: Create the Recipe
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

      if (response.error) {
        handleError(response.error)
      }

      // else {
      //   if (args?.onCompleted) {
      //     args.onCompleted(response)
      //   }
      // }

      // Step 2 get the new recipe id
      const newRecipeID = response?.result?.lastInsertRowid
      console.log('-- NEW RECIPE ID: ', newRecipeID)

      await executeSQLiteQuery({
        sql: CREATE_NEW_RECIPE_ITEM,
        action: 'bulkUpsert',
        params: [],
        operationName: 'useCreateRecipe_add_recipe_item'
      })
    } catch (error) {
      handleError(`${error}`)
    }

    setCreatingRecipe(false)
  }

  return {
    creatingRecipe,
    runCreateRecipe
  }
}

export default useCreateRecipe
