import { MainAppTemplate } from '@renderer/components/templates'
import React from 'react'
import { MATERIAL_FORM_INPUTS } from '@renderer/configs/forms/materialForm.config'
import { useCreateMaterial } from '@renderer/hooks/materials'
import { MaterialFormData } from '@renderer/hooks/reactForms/useMaterialForm'
import { showToast } from '@renderer/utils/reactToastify'
import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'
import { FieldValues } from 'react-hook-form'

const MaterialFormPage: React.FC = () => {
  const { runCreateMaterial, loading } = useCreateMaterial({
    onCompleted: (data) => {
      try {
        if (data.success && data.result.insertedCount > 0) {
          showToast({ type: 'info', message: `Material Added` })
        }
      } catch (errMsg) {
        showToast({ type: 'error', message: `Material Add Error: ${errMsg}` })
      }
    },
    onError: (err) => {
      showToast({ type: 'error', message: `Material Add Error: ${err}` })
    }
  })

  const onSubmitMaterialForm: (data: FieldValues) => void = (data) => {
    const submitMaterial = data as MaterialFormData
    runCreateMaterial({ newMaterial: submitMaterial })
  }

  return (
    <MainAppTemplate
      loading={loading}
      allowGoBack
      headerText="Material Form"
      className="flex flex-col"
    >
      <MyReactHookForm inputsConfig={MATERIAL_FORM_INPUTS} onHandleSubmit={onSubmitMaterialForm} />
    </MainAppTemplate>
  )
}

export default MaterialFormPage
