import React from 'react'

import { MainAppTemplate } from '@renderer/components/templates'
import { PRODUCT_FORM_INPUTS_V2 } from '@renderer/configs/forms/productForm.config'
import { FieldValues } from 'react-hook-form'
import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'
import { IProductFormData } from '@renderer/interfaces/product.interface'
import { useCreateProducts } from '@renderer/hooks/products'
import { generateUUID } from '@renderer/utils/uuid'
import { StandardTransactors } from '@renderer/interfaces/inventory.interface'

const ProductFormPage: React.FC = () => {
  const { runCreateProducts, isCreatingProducts } = useCreateProducts({})

  const onSubmitProduct: (formData: FieldValues) => void = (formData) => {
    const { display_name, shelf_quantity, alert_threshold } = formData as IProductFormData
    runCreateProducts({
      products: [
        {
          reference_id: generateUUID(),
          display_name: display_name,
          current_recipe_id: '',
          shelf_quantity: Number(shelf_quantity || 0),
          base_warehouse_quantity: 0,
          current_warehouse_quantity: 0,
          alert_threshold: Number(alert_threshold || 0),
          created_by: StandardTransactors.ADMIN
        }
      ]
    })
  }

  return (
    <MainAppTemplate
      headerText="Add Product"
      className="flex flex-col"
      allowGoBack
      loading={isCreatingProducts}
    >
      <MyReactHookForm inputsConfig={PRODUCT_FORM_INPUTS_V2} onHandleSubmit={onSubmitProduct} />
    </MainAppTemplate>
  )
}

export default ProductFormPage
