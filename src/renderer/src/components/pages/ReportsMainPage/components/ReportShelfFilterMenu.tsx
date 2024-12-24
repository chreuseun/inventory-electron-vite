/* eslint-disable react/prop-types */
import { IDynamicInput } from '@renderer/interfaces/form.interface'
import { ShelfTransactionTypes } from '@renderer/interfaces/inventory.interface'
import { FieldValues } from 'react-hook-form'
import { useMyReactHookForm as MyReactHookForm } from '@renderer/hooks/reactForms'

const INPUT_CONFIGS: IDynamicInput[] = [
  {
    label: 'Product',
    id: 'product_id',
    required: false,
    inputType: 'TEXT',
    type: 'text',
    valueAsNumber: false
  },
  {
    label: 'Creation Date',
    id: 'ShelfDateRange',
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
        value: ShelfTransactionTypes.IN
      },
      {
        label: 'Out',
        value: ShelfTransactionTypes.OUT
      }
    ],
    required: false,
    valueAsNumber: false,
    inputType: 'DROPDOWN_SELECT',
    type: 'text'
  }
]

const ReportShelfFilterMenu: React.FC<{
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

export default ReportShelfFilterMenu
