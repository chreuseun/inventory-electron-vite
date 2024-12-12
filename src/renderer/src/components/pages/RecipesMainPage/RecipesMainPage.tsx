import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { useNavigate } from 'react-router'

const RecipesMainPage: React.FC = () => {
  const navigate = useNavigate()
  const onClickAddRecipe: () => void = () => {
    navigate(APPLICATION_ROUTES.RECIPE_FORM.path, {
      replace: false
    })
  }

  return (
    <MainAppTemplate headerText="Recipes" className="flex flex-col">
      <div className="flex-grow flex flex-col">
        <div className="mb-2">
          <MyButton label={'+ Recipe'} onClick={onClickAddRecipe} />
        </div>
        <div className="border-b-sectBorder border-b-2 mb-2">Recipes</div>
        <div className="border border-sectBorder p-1 rounded-xs flex-grow" />
      </div>
    </MainAppTemplate>
  )
}

export default RecipesMainPage
