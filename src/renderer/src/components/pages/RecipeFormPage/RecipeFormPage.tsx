import { MyButton } from '@renderer/components/common'
import { InputSearchableSelect, InputTextInput } from '@renderer/components/common/formInputs'
import { MainAppTemplate } from '@renderer/components/templates'
import { RECIPE_FORM_INPUTS } from '@renderer/configs/forms/recipeForm.config'
import { ingredients } from '@renderer/configs/placeholders/testIngredients'
import { useForm, Controller } from 'react-hook-form'

const RecipeFormPage: React.FC = () => {
  const {
    formState: { errors, ...restFormState },
    handleSubmit,
    control
  } = useForm()

  return (
    <MainAppTemplate headerText="Add Recipe" className="flex flex-col" allowGoBack>
      <div className="border-b-sectBorder border-b flex  flex-col overflow-auto gap-x-2 pb-2">
        {RECIPE_FORM_INPUTS.map((input) => {
          if (input.inputType === 'SELECT_MULTIPLE') {
            return (
              <Controller
                key={input.id}
                name={input.id}
                control={control}
                defaultValue=""
                rules={{ required: `${input.label} is required` }}
                render={({ field, fieldState: { error } }) => {
                  const { onChange } = field
                  const isError = !!error?.message

                  return (
                    <>
                      <InputSearchableSelect
                        key={input.id}
                        className="text-dark"
                        options={ingredients}
                        label="Set Materials"
                        multiple={true}
                        onChange={(selectedMaterialIDs) => {
                          onChange(
                            Object.keys(selectedMaterialIDs).length ? selectedMaterialIDs : null
                          )
                        }}
                        isQuantityIncluded
                        errorMessage={error?.message || null}
                      />
                      {isError ? <div className="text-error text-xs">{error?.message}</div> : null}
                    </>
                  )
                }}
              />
            )
          } else if (input.inputType === 'TEXT') {
            return (
              <InputTextInput key={input.id} control={control} input={input} />
              // <Controller
              //   key={input.id}
              //   name={input.id}
              //   control={control}
              //   defaultValue="" // Initial value for the input
              //   rules={{ required: `${input.label} is required` }}
              //   render={({ field, fieldState: { error } }) => {
              //     const isError = !!error?.message
              //     return (
              //       <div className="border-sectBorder p-2 border text-dark">
              //         <div className="text-white text-xs mb-1">{input.label}</div>
              //         <input
              //           className={`px-2 ${isError ? `border-error border` : `border-none`}`}
              //           {...field}
              //         />
              //         {isError ? <div className="text-error text-xs">{error?.message}</div> : null}
              //       </div>
              //     )
              //   }}
              // />
            )
          }

          return (
            <div className="border border-sectBorder" key={input.id}>
              Invalid input type: {input.inputType}
            </div>
          )

          // return <pre key={input.id}>{JSON.stringify(input, null, 4)}</pre>
        })}
        <pre>FORM_ERRORS: {JSON.stringify(errors, null, 4)}</pre>
        <pre>FORM_STATE: {JSON.stringify(restFormState, null, 4)}</pre>
      </div>
      <MyButton
        label={'Save Recipe'}
        onClick={handleSubmit((data) => {
          console.log('-- ', data)
        })}
        className="mt-4 w-32"
      />
    </MainAppTemplate>
  )
}

export default RecipeFormPage
