/* eslint-disable react/prop-types */
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import { StockTransactionTypes } from '@renderer/interfaces/inventory.interface'
import { FieldValues } from 'react-hook-form'
import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'

const INPUT_CONFIGS: IDynamicInput[] = [
  {
    label: 'Product',
    id: 'product',
    required: false,
    inputType: 'TEXT',
    type: 'text',
    valueAsNumber: false
  },
  {
    label: 'Creation Date',
    id: 'shelfDateRange',
    inputType: 'DATE_RANGE',
    type: 'date',
    valueAsNumber: false,
    required: false
  },
  {
    label: 'Transaction Type',
    id: 'transactionType',
    options: [
      {
        label: '*All',
        value: ''
      },
      {
        label: 'In',
        value: StockTransactionTypes.IN
      },
      {
        label: 'Out',
        value: StockTransactionTypes.OUT
      }
    ],
    required: false,
    valueAsNumber: false,
    inputType: 'DROPDOWN_SELECT',
    type: 'text'
  }
]

const InventoryReportCriteriaMenu: React.FC<{
  onHandleSubmit: (data: FieldValues) => void
}> = ({ onHandleSubmit }) => {
  return (
    <div className="mb-2 flex justify-between">
      <MyReactHookForm
        className="flex-row flex items-end"
        inputsConfig={INPUT_CONFIGS}
        onHandleSubmit={onHandleSubmit}
        isFormReset={false}
      />
    </div>
  )
}

export default InventoryReportCriteriaMenu
