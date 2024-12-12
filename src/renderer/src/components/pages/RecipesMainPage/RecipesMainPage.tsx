import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'

const RecipesMainPage: React.FC = () => {
  return (
    <MainAppTemplate headerText="Recipes" className="flex flex-col">
      <div className="flex-grow flex flex-col">
        <div className="mb-2">
          <MyButton label={'+ Recipe'} onClick={() => {}} />
        </div>
        <div className="border-b-sectBorder border-b-2 mb-2">Recipes</div>
        <div className="border border-sectBorder p-1 rounded-xs flex-grow" />
      </div>
    </MainAppTemplate>
  )
}

export default RecipesMainPage
