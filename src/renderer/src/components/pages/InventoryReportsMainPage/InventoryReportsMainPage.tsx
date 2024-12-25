import { MainAppTemplate } from '@renderer/components/templates'
import { InventoryReportsList } from './components'

const InventoryReportsMainPage: React.FC = () => {
  return (
    <MainAppTemplate headerText="Inventory Reports" className="flex flex-col">
      <InventoryReportsList />
    </MainAppTemplate>
  )
}

export default InventoryReportsMainPage
