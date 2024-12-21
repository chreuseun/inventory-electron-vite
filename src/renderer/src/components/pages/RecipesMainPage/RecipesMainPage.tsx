import { MyButton } from '@renderer/components/common'
import { MainAppTemplate, TableListTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { useGetRecipeList } from '@renderer/hooks/recipes'
import { IDTORecipes } from '@renderer/interfaces/dtos/recipes.dto'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const recipeListRowConfig: (arg0: IDTORecipes) => IRowConfigs = ({ name, description }) => [
  name,
  description
]

const columnConfigs = ['Recipe Name', 'Description']

const RecipesMainPage: React.FC = () => {
  const navigate = useNavigate()
  const [recipeList, setRecipeList] = useState<IDTORecipes[]>([])
  const { runGetRecipeList, fetchingRecipeList } = useGetRecipeList({
    onCompleted: (responseRecipeList) => {
      setRecipeList(responseRecipeList.result)
    }
  })

  useEffect(() => {
    runGetRecipeList({
      recipeName: ''
    })
  }, [])

  const onClickAddRecipe: () => void = () => {
    navigate(APPLICATION_ROUTES.RECIPE_FORM.path, {
      replace: false
    })
  }

  return (
    <MainAppTemplate headerText="Recipes" className="flex flex-col" loading={fetchingRecipeList}>
      <div className="p-2 flex-grow flex flex-col overflow-auto">
        <div className="mb-2 flex justify-between">
          <MyButton label={`+ Recipe`} onClick={onClickAddRecipe} className="text-center" />
        </div>
        <TableListTemplate<IDTORecipes>
          listTitle="Recipe List"
          data={recipeList}
          columns={columnConfigs}
          rowConfig={recipeListRowConfig}
        />
      </div>
    </MainAppTemplate>
  )
}

export default RecipesMainPage
