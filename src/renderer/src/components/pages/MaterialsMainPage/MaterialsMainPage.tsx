import { MyButton, MyTextInput } from '@renderer/components/common'
import { MainAppTemplate, TableListTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { useGetMaterialsList } from '@renderer/hooks/materials'
import { navigateToScreen } from '@renderer/utils/navigate'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { IDTOMaterialItem } from '@renderer/hooks/materials/useGetMaterialsList'
import { showToast } from '@renderer/utils/reactToastify'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'
import { IRowExceptionKeys } from '@renderer/components/templates/components/TableListTemplate/TableRowTemplate'

const generateRows: (args: IDTOMaterialItem) => IRowConfigs = (materialItem) => {
  const { display_name, format, unit, current_stock_quantity, alert_threshold } = materialItem

  return [
    <span key="display_name" className="text-sm font-semibold">
      {display_name} <span className="text-sm text-secondaryText">({`${format} ${unit}`})</span>
    </span>,
    <div key={'current_stock_quantity'} className="text-lg text-light font-bold">
      {current_stock_quantity}
    </div>,

    // this is for setting the row to red
    alert_threshold >= current_stock_quantity ? IRowExceptionKeys.ALERT_ROW : ''
  ]
}

const MATERIALS_LIST_COLUMNS = ['Material', 'Stock', '  ']

const MaterialsMainPage: React.FC = () => {
  const [materialsList, setMaterialsList] = useState<IDTOMaterialItem[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const navigate = useNavigate()

  const { runGetMaterialsList } = useGetMaterialsList({
    onCompleted: (response) => {
      const { result = [] } = response
      setMaterialsList(result)
    },
    onError: (error) => {
      showToast({ type: 'error', message: error })
    }
  })

  useEffect(() => {
    runGetMaterialsList({ displayName: 'name' })
  }, [])

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
        </div>

        <TableListTemplate<IDTOMaterialItem>
          listTitle="Materials List"
          data={materialsList.filter((ii) =>
            ii.display_name.toLowerCase().includes(searchKeyword.toLowerCase())
          )}
          rowConfig={generateRows}
          columns={MATERIALS_LIST_COLUMNS}
        >
          <MyTextInput
            onChange={(event) => {
              setSearchKeyword(event.target.value || '')
            }}
            value={searchKeyword}
            placeholder="Search Material"
            className="w-44 mb-2 text-xs"
          />
        </TableListTemplate>
      </div>
    </MainAppTemplate>
  )
}

export default MaterialsMainPage
