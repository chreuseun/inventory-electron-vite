import { MyButton } from '@renderer/components/common'
import { InputSearchableSelect } from '@renderer/components/common/formInputs'
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
              <Controller
                key={input.id}
                name={input.id}
                control={control}
                defaultValue="" // Initial value for the input
                rules={{ required: `${input.label} is required` }}
                render={({ field, fieldState: { error } }) => {
                  const isError = !!error?.message
                  return (
                    <div className="border-sectBorder p-2 border text-dark">
                      <div className="text-white text-xs mb-1">{input.label}</div>
                      <input
                        className={`px-2 ${isError ? `border-error border` : `border-none`}`}
                        {...field}
                      />
                      {isError ? <div className="text-error text-xs">{error?.message}</div> : null}
                    </div>
                  )
                }}
              />
            )

            // <div key={input.id} className="flex flex-col w-full sm:w-perc48">
            //   <label htmlFor={input.id} className="text-sm font-extrabold text-primaryText">
            //     {input.label}
            //   </label>
            //   <input
            //     id={input.id}
            //     {...register(input.id as (typeof PRODUCT_FORM_INPUTS)[number]['id'], {
            //       required: input.required,
            //       valueAsNumber: input.valueAsNumber,
            //       minLength: input.minLength,
            //       maxLength: input.maxLength,
            //       max: input.max,
            //       min: input.min
            //     })}
            //     type={input.type.toLowerCase()}
            //     className={`text-dark mt-1 px-2 border rounded ${
            //       errors[input.id] ? 'border-error border-2' : 'border-border'
            //     }`}
            //   />
            //   {displayErrMessage ? (
            //     <p className="border-error text-xs mt-1">{displayErrMessage}</p>
            //   ) : null}
            // </div>
          }

          return <pre key={input.id}>{JSON.stringify(input, null, 4)}</pre>
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
