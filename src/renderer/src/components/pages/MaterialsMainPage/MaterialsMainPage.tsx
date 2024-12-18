import { MyButton, MyTextInput } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { useCreateMaterial, useGetMaterialsList } from '@renderer/hooks/materials'
import { navigateToScreen } from '@renderer/utils/navigate'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import MaterialCardItem from './components/MaterialCardItem'
import { ingredients } from '@renderer/configs/placeholders/testIngredients'
import { MaterialFormData } from '@renderer/hooks/reactForms/useMaterialForm'
import { IDTOMaterialItem } from '@renderer/hooks/materials/useGetMaterialsList'

const MaterialsMainPage: React.FC = () => {
  const [materialsList, setMaterialsList] = useState<IDTOMaterialItem[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const navigate = useNavigate()

  const { runCreateMaterial } = useCreateMaterial({
    onCompleted: () => {},
    onError: () => {}
  })

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

  const isListEmpty = !materialsList.length

  return (
    <MainAppTemplate headerText="Manage Materials" className="flex flex-col">
      <div className="p-2 flex-grow flex flex-col overflow-y-hidden">
        <div className="mb-2 flex justify-between ">
          <MyButton
            label={`+ New Material`}
            onClick={() => {
              navigateToScreen(navigate, {
                replace: false,
                path: APPLICATION_ROUTES.MATERIAL_FORM.path
              })
            }}
          />
          <div>
            <MyButton
              className="mr-2"
              label={`Test Bulk Upload Materials`}
              onClick={() => {
                const formatTestIngredients: MaterialFormData[] = ingredients.map((ingredient) => {
                  const al = Math.floor(Math.random() * 3) + 3

                  const p: MaterialFormData = {
                    alert_threshold: al,
                    current_stock_quantity: 150,
                    display_name: ingredient.label,
                    format: `${ingredient.format}`,
                    price: ingredient.price,
                    stock_base_quantity: 25,
                    unit: ingredient.unit
                  }

                  return p
                })

                runCreateMaterial({ newMaterial: formatTestIngredients })
              }}
            />
            <MyButton
              label={`Reload List`}
              onClick={() => {
                runGetMaterialsList({ displayName: 'name' })
              }}
            />
          </div>
        </div>
        <div className="border-b-sectBorder border-b-2 mb-2">Materials List</div>
        <MyTextInput
          onChange={(event) => {
            setSearchKeyword(event.target.value || '')
          }}
          value={searchKeyword}
          placeholder="Search Material"
          className="w-44 mb-2 text-xs"
        />
        <div
          className={`border border-sectBorder p-2 rounded-xs flex-grow flex flex-wrap items-start justify-between ${!isListEmpty ? 'overflow-y-auto ' : ''}`}
        >
          {materialsList
            .filter((ii) => ii.display_name.toLowerCase().includes(searchKeyword.toLowerCase()))
            .map((material) => {
              return <MaterialCardItem material={material} key={material.id} />
            })}
        </div>
      </div>
    </MainAppTemplate>
  )
}

export default MaterialsMainPage
