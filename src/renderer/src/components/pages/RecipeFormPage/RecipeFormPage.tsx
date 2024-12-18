import { MainAppTemplate } from '@renderer/components/templates'
import { RECIPE_FORM_INPUTS } from '@renderer/configs/forms/recipeForm.config'

import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'

const RecipeFormPage: React.FC = () => {
  return (
    <MainAppTemplate headerText="Add Recipe" className="flex flex-col" allowGoBack>
      <MyReactHookForm
        inputsConfig={RECIPE_FORM_INPUTS}
        onHandleSubmit={(formData) => {
          console.log('-- RECIPE FORM OKAY: ', formData)
        }}
      />
    </MainAppTemplate>
  )
}

export default RecipeFormPage
