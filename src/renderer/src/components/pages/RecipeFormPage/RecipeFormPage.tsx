import { MyButton } from '@renderer/components/common'
import { SearchableSelect } from '@renderer/components/common/CustomInputs'
import { InputSearchableSelect } from '@renderer/components/common/formInputs'
import { MainAppTemplate } from '@renderer/components/templates'
import { RECIPE_FORM_INPUTS } from '@renderer/configs/forms/recipeFrom.config'
import { ingredients } from '@renderer/configs/placeholders/testIngredients'
import { useForm } from 'react-hook-form'

const RecipeFormPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  return (
    <MainAppTemplate headerText="Add Recipe" className="flex flex-col" allowGoBack>
      <div className="border-b-sectBorder border-b flex  flex-col overflow-auto gap-x-2 pb-2">
        <InputSearchableSelect
          className="text-dark"
          options={ingredients}
          label="Set Materials"
          multiple={true}
          onChange={(selectedMaterialIDs) => {
            console.log('---SELECTED MATERIALS: ', selectedMaterialIDs)
          }}
          isQuantityIncluded
        />
        <InputSearchableSelect
          className="text-dark"
          options={ingredients}
          label="Set Materials"
          multiple={false}
          onChange={(selectedMaterialIDs) => {
            console.log('---SELECTED MATERIALS: ', selectedMaterialIDs)
          }}
        />
        {/* {RECIPE_FORM_INPUTS.map((input) => {
          return <pre key={input.id}>{JSON.stringify(input, null, 4)}</pre>
        })} */}
      </div>
      <MyButton label={'Save Recipe'} onClick={() => {}} className="mt-4 w-32" />
    </MainAppTemplate>
  )
}

export default RecipeFormPage
