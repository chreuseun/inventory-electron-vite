import { is } from '@electron-toolkit/utils'
import {
  IRunVerifyUser,
  IRunVerifyUserResponseResult,
  IUseVerifyUser
} from '@renderer/interfaces/dtos/users.dto'
import { executeSQLiteQuery } from '@renderer/utils/sqlite'
import { useState } from 'react'

const SELECT_ONE_USER = `
SELECT 
  id,
  reference_id,
  username,
  is_active,
  created_at

FROM users

WHERE 
  username = ? AND 
  password = ?
`

const useVerifyUser: IUseVerifyUser = ({ onCompleted, onError }) => {
  const [loading, setLoading] = useState(false)

  const runVerifyUser: ({ username, password }: IRunVerifyUser) => Promise<void> = async ({
    username,
    password
  }) => {
    setLoading(true)

    const response = (await executeSQLiteQuery({
      sql: SELECT_ONE_USER,
      action: 'list',
      params: [username, password],
      operationName: 'useVerifyUser'
    })) as {
      success: boolean
      error: string | null
      result: IRunVerifyUserResponseResult[]
    }

    const { success, error, result } = response
    const isLocked = !result?.[0]?.is_active
    const isAuthenticated = success && !isLocked

    if (success && !error && isAuthenticated) {
      onCompleted({
        success,
        error,
        result
      })
    } else {
      const errorMessage = isLocked ? 'Account is locked, please contact your admin' : error
      onError(`Verify User: ${errorMessage}`)
    }

    setLoading(false)
  }

  return {
    runVerifyUser,
    loading
  }
}

export default useVerifyUser
