import { IDTORecipes } from '@renderer/interfaces/dtos/recipes.dto'
import { handleError } from '@renderer/utils/api'
import { executeSQLiteQuery, ISqliteListResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const GET_RECIPES_LIST = `
SELECT 
	id,
	name,
	description

FROM recipes`

type IRunGetRecipeList = (args: { recipeName: string }) => Promise<void>

type IUseGetRecipeList = (arg?: {
  onCompleted?: (response: ISqliteListResponse<IDTORecipes>) => void
  onError?: (errMsg: string) => void
}) => {
  fetchingRecipeList: boolean
  runGetRecipeList: IRunGetRecipeList
}

/*
    1. Create Recipes 
    2. send the result to an onComplete func else onError
    3. set Loading to false
*/
const useGetRecipeList: IUseGetRecipeList = (props) => {
  const [fetchingRecipeList, setRecipeList] = useState(false)

  const runGetRecipeList: IRunGetRecipeList = async () => {
    setRecipeList(true)

    try {
      const responseRecipeList = (await executeSQLiteQuery({
        sql: GET_RECIPES_LIST,
        action: 'list',
        operationName: 'getRecipeListResponse',
        params: []
      })) as ISqliteListResponse<IDTORecipes>

      if (responseRecipeList.error) {
        throw new Error(responseRecipeList.error)
      }

      props?.onCompleted && props?.onCompleted(responseRecipeList)
    } catch (errMsg) {
      handleError(`${errMsg}`, props?.onError)
    }

    setRecipeList(false)
  }

  return { fetchingRecipeList, runGetRecipeList }
}

export default useGetRecipeList
