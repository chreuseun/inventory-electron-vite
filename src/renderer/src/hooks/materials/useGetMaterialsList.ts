import { executeSQLiteQuery } from '@renderer/utils/sqlite'
import { useState } from 'react'

const SELECT_ALL_MATERIALS = `
SELECT 
    *
FROM 
  materials
`

type IRunGetMaterialsList = (args: { displayName: string | null }) => Promise<void>

export type IDTOMaterialItem = {
  id: number
  reference_id: string
  display_name: string
  unit: string
  format: string
  price: number
  category_id?: string // Optional if empty strings are allowed
  sub_category_id?: string // Optional if empty strings are allowed
  brand_id?: string // Optional if empty strings are allowed
  alert_threshold: number
  current_stock_quantity: number
  stock_base_quantity?: number // Optional if not always present
  created_at: string // ISO 8601 date format
  created_by?: string // Optional if empty strings are allowed
  updated_at?: string // Optional if sometimes not present
  updated_by?: string | null // Optional and can be null
}

interface IRunGetMaterialsListResult {
  success: boolean
  error: string | null
  result: IDTOMaterialItem[]
}

type IUseGetMaterialsList = (args: {
  onCompleted?: (data: IRunGetMaterialsListResult) => void
  onError?: (err: string) => void
}) => {
  loading: boolean
  runGetMaterialsList: IRunGetMaterialsList
}

const useGetMaterialsList: IUseGetMaterialsList = ({ onCompleted, onError }) => {
  const [loading, setLoading] = useState(false)

  const runGetMaterialsList: IRunGetMaterialsList = async () => {
    setLoading(true)

    const response = (await executeSQLiteQuery({
      sql: SELECT_ALL_MATERIALS,
      action: 'list',
      params: [],
      operationName: 'useGetMaterialsList'
    })) as IRunGetMaterialsListResult

    if (onCompleted) {
      onCompleted(response)
    } else {
      !!onError && onError(`Error Message`)
    }

    setLoading(false)
  }
  return {
    loading,
    runGetMaterialsList
  }
}

export default useGetMaterialsList
