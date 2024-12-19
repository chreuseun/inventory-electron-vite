export type IRendererDBAction = 'create' | 'read' | 'update' | 'delete' | 'list' | 'bulkUpsert'

export type customSQLParams = string | number | null | undefined

interface IExecuteSQLiteQuery {
  sql: string
  params: customSQLParams[] | unknown[]
  operationName: string
  action: IRendererDBAction
}

type ISqliteErr = string | null

export interface ISqliteBulkInsertResponse {
  success: boolean
  error: ISqliteErr
  result: {
    insertedCount: number
  }
}

export interface ISqliteListResponse<T> {
  success: boolean
  error: ISqliteErr
  result: T[]
}

export interface ISqliteCreateResponse {
  success: boolean
  error: ISqliteErr
  result: {
    lastInsertRowid: number
    changes: number
  }
}

const executeSQLiteQuery: (args: IExecuteSQLiteQuery) => Promise<{
  success: boolean
  error: string | null
  result: unknown
}> = async ({ sql, params, operationName, action }) => {
  try {
    const sqliteResult = await window.RENDERER_DB_CRUD.executeLocalDB<{
      success: boolean
      error: string | null
      result: unknown
    }>({
      action,
      payload: {
        sql,
        params: params,
        operationName
      }
    })

    // console.log('-- executeSQLiteQuery:', sqliteResult)

    return sqliteResult
  } catch (err) {
    console.log('-- ERR@executeSQLiteQuery:', err)

    return {
      success: false,
      error: `${err}`,
      result: null
    }
  }
}

export { executeSQLiteQuery }
