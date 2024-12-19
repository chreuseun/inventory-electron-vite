import { executeSQLiteQuery, ISqliteListResponse } from '@renderer/utils/sqlite'
import { useState } from 'react'

const SELECT_ALL_MATERIALS = `
SELECT 
    id,
    display_name,
    unit,
    format 
FROM 
  materials
`

type IRunGetMinifiedMaterialsList = (args: { displayName?: string | null }) => Promise<void>

export type IDTOMinifiedMaterialItem = {
  id: number
  reference_id: string
  display_name: string
  unit: string
  format: string
}

type IUseGetMinifiedMaterialsList = (args: {
  onCompleted?: (data: ISqliteListResponse<IDTOMinifiedMaterialItem>) => void
  onError?: (err: string) => void
}) => {
  loading: boolean
  runGetMinifiedMaterialsList: IRunGetMinifiedMaterialsList
}

const useGetMinifiedMaterialsList: IUseGetMinifiedMaterialsList = ({ onCompleted, onError }) => {
  const [loading, setLoading] = useState(false)

  const runGetMinifiedMaterialsList: IRunGetMinifiedMaterialsList = async () => {
    setLoading(true)

    const response = (await executeSQLiteQuery({
      sql: SELECT_ALL_MATERIALS,
      action: 'list',
      params: [],
      operationName: 'runGetMinifiedMaterialsList'
    })) as ISqliteListResponse<IDTOMinifiedMaterialItem>

    response.result

    if (onCompleted) {
      onCompleted(response)
    } else {
      !!onError && onError(`Error Message`)
    }

    setLoading(false)
  }
  return {
    loading,
    runGetMinifiedMaterialsList
  }
}

export default useGetMinifiedMaterialsList
