import { MainAppTemplate } from '@renderer/components/templates'
import { RECIPE_FORM_INPUTS } from '@renderer/configs/forms/recipeForm.config'
import { useGetMinifiedMaterialsList } from '@renderer/hooks/materials'

import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'
import { useCreateRecipe } from '@renderer/hooks/recipes'
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import { showToast } from '@renderer/utils/reactToastify'
import { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

const RecipeFormPage: React.FC = () => {
  const { runCreateRecipe, creatingRecipe } = useCreateRecipe()
  const [isFormError, setIsFormError] = useState(false)
  const [formFields, setFormFields] = useState<IDynamicInput[]>([])
  const { loading, runGetMinifiedMaterialsList } = useGetMinifiedMaterialsList({
    onCompleted: (data) => {
      const { result } = data

      setFormFields(() => {
        const newFormFields: IDynamicInput[] = []
        RECIPE_FORM_INPUTS.forEach((formInput) => {
          if (formInput.id === 'materials') {
            newFormFields.push({
              ...formInput,
              options: result.map((i) => {
                return {
                  label: i.display_name,
                  value: `${i.id}`
                }
              })
            })
          } else {
            newFormFields.push(formInput)
          }
        })

        return newFormFields
      })
    },
    onError: (errMsg) => {
      showToast({
        message: errMsg,
        type: 'error'
      })

      setIsFormError(true)
    }
  })

  useEffect(() => {
    runGetMinifiedMaterialsList({
      displayName: ''
    })
  }, [])

  const onSubmit: (formData: FieldValues) => void = (formData) => {
    const { description, name } = formData as {
      description: string
      name: string
    }

    runCreateRecipe({
      name,
      description
    })
  }

  return (
    <MainAppTemplate
      headerText="Add Recipe"
      className="flex flex-col overflow-auto"
      allowGoBack
      loading={creatingRecipe || loading}
    >
      {isFormError ? (
        <div>Error: Invalid Form Fields Configuration</div>
      ) : (
        <MyReactHookForm inputsConfig={formFields} onHandleSubmit={onSubmit} />
      )}
    </MainAppTemplate>
  )
}

export default RecipeFormPage
