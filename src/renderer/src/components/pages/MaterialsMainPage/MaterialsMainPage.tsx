import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { useGetMaterialsList } from '@renderer/hooks/materials'
import { navigateToScreen } from '@renderer/utils/navigate'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const MaterialsMainPage: React.FC = () => {
  const [materialsList, setMaterialsList] = useState<unknown[]>([])
  const navigate = useNavigate()

  const { runGetMaterialsList } = useGetMaterialsList({
    onCompleted: (response) => {
      const { result } = response
      console.log('- MATERIALS:', response)

      setMaterialsList(result)
    },
    onError: (error) => {
      console.log('- ERROR: ', error)
    }
  })

  return (
    <MainAppTemplate headerText="Manage Materials" className="flex flex-col">
      <MyButton
        label={`TEST_getAllMaterials`}
        onClick={() => {
          runGetMaterialsList({ displayName: 'name' })
        }}
        className="mb-4"
      />

      <div className="border border-sectBorder p-2 flex-grow">
        <div className="border  border-sectBorder p-1 mb-2 flex justify-between ">
          <MyButton
            label={`+ New Material`}
            onClick={() => {
              navigateToScreen(navigate, {
                replace: false,
                path: APPLICATION_ROUTES.MATERIAL_FORM.path
              })
            }}
          />
          <MyButton
            label={`Reload List`}
            onClick={() => {
              runGetMaterialsList({ displayName: 'name' })
            }}
          />
        </div>
        <div className="border-b border-b-sectBorder mb-4">Materials List</div>
        <div className="border border-sectBorder  p-1   rounded-xs">
          {materialsList.map((material) => {
            return (
              <div>
                <pre>{JSON.stringify(material, null, 4)}</pre>
              </div>
            )
          })}
        </div>
      </div>
    </MainAppTemplate>
  )
}

export default MaterialsMainPage
