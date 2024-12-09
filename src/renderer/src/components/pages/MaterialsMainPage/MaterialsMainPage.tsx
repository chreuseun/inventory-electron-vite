import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { useGetMaterialsList } from '@renderer/hooks/materials'
import { useState } from 'react'

const MaterialsMainPage: React.FC = () => {
  const [materialsList, setMaterialsList] = useState<unknown[]>([])

  const { loading, runGetMaterialsList } = useGetMaterialsList({
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
    <MainAppTemplate headerText="Manage Materials">
      <MyButton
        label={`TEST_getAllMaterials`}
        onClick={() => {
          runGetMaterialsList({ displayName: 'name' })
        }}
        className="mb-4"
      />

      <div>
        <div className="border-b mb-4">Materials List</div>

        <div className="border border-border p-1   rounded-xs">
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
