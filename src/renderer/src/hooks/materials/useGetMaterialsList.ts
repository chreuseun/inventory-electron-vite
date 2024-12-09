import { executeSQLiteQuery } from '@renderer/utils/sqlite'
import { useState } from 'react'

const SELECT_ALL_MATERIALS = `
SELECT 
    *
FROM 
  materials

LIMIT 30
`

type IRunGetMaterialsList = (args: { displayName: string | null }) => Promise<void>

interface IRunGetMaterialsListResult {
  success: boolean
  error: string | null
  result: unknown[]
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
