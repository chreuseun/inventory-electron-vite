import React, { useEffect, useState } from 'react'

import { MainAppTemplate } from '@renderer/components/templates'
import { PRODUCT_FORM_INPUTS_V2 } from '@renderer/configs/forms/productForm.config'
import { FieldValues } from 'react-hook-form'
import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'
import { IFormProduct, IProductFormData } from '@renderer/interfaces/product.interface'
import { useCreateProducts } from '@renderer/hooks/products'
import { generateUUID } from '@renderer/utils/uuid'
import { StandardTransactors } from '@renderer/interfaces/inventory.interface'
import { useGetRecipeList } from '@renderer/hooks/recipes'
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import { handleError } from '@renderer/utils/api'

const ProductFormPage: React.FC = () => {
  const { runCreateProducts, isCreatingProducts } = useCreateProducts({})
  const [dynamicFormFields, setDynamicFormFields] = useState<IDynamicInput[]>([])

  const { runGetRecipeList, fetchingRecipeList } = useGetRecipeList({
    onCompleted: (data) => {
      const { result } = data

      const newFormFields: IDynamicInput[] = []
      PRODUCT_FORM_INPUTS_V2.forEach((input) => {
        if (input.id === IFormProduct.recipe_id) {
          newFormFields.push({
            ...input,
            options: result.map((preOption) => ({
              value: preOption.id,
              label: preOption.name
            }))
          })
        } else {
          newFormFields.push(input)
        }
      })

      setDynamicFormFields(newFormFields)
    }
  })

  useEffect(() => {
    runGetRecipeList({
      recipeName: ''
    })
  }, [])

  const onSubmitProduct: (formData: FieldValues) => void = (formData) => {
    const {
      display_name,
      shelf_quantity,
      alert_threshold,
      recipe_id: selectedRecipe
    } = formData as IProductFormData

    try {
      const recipeID = Object.values(selectedRecipe)?.[0]?.value
      if (!recipeID) {
        throw new Error('No Recipe ID selected')
      }

      runCreateProducts({
        products: [
          {
            reference_id: generateUUID(),
            display_name: display_name,
            current_recipe_id: `${recipeID}`,
            shelf_quantity: Number(shelf_quantity || 0),
            base_warehouse_quantity: 0,
            current_warehouse_quantity: 0,
            alert_threshold: Number(alert_threshold || 0),
            created_by: StandardTransactors.ADMIN
          }
        ]
      })
    } catch (errMsg) {
      handleError(`${errMsg}`)
    }
  }

  return (
    <MainAppTemplate
      headerText="Add Product"
      className="flex flex-col"
      allowGoBack
      loading={isCreatingProducts || fetchingRecipeList}
    >
      <MyReactHookForm inputsConfig={dynamicFormFields} onHandleSubmit={onSubmitProduct} />
    </MainAppTemplate>
  )
}

export default ProductFormPage
