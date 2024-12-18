export type IRendererDBAction = 'create' | 'read' | 'update' | 'delete' | 'list' | 'bulkUpsert'

export type customSQLParams = string | number | null | undefined

interface IExecuteSQLiteQuery {
  sql: string
  params: customSQLParams[] | unknown[]
  operationName: string
  action: IRendererDBAction
}

export interface ISqliteBulkInsertResponse {
  success: boolean
  error: string | null
  result: {
    insertedCount: number
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
