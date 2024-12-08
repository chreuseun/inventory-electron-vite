import initializeDB from '@src/database/initializeDB'
import { IMyChannelEventNames, IRendererExecuteSQL } from '@src/interfaces/mychannel.ipc.interface'
import Database from 'better-sqlite3'
import { ipcMain } from 'electron'

const db = initializeDB()

interface ILocalDBMainHandlerResponse {
  success: boolean
  error: string | null
  result: Database.RunResult | null | unknown
}

type ILocalDBMainHandler = (
  _: unknown,
  args: IRendererExecuteSQL
) => Promise<ILocalDBMainHandlerResponse>

const localDBMainHandler: () => void = () => {
  const handler: ILocalDBMainHandler = async (_, { action, payload }) => {
    const response: ILocalDBMainHandlerResponse = {
      success: false,
      error: 'localDBMainHandler: No action matched',
      result: null
    }

    const onSuccess: (arg1: Database.RunResult | unknown) => void = (sqlResult) => {
      response.success = true
      response.error = null
      response.result = sqlResult
    }

    const onError: (arg1: string) => void = (error: string) => {
      response.success = false
      response.error = error
      response.result = null
    }

    try {
      const { params = [], sql } = payload
      const stmt = db.prepare(sql)
      console.log('-- localDBMainHandler: ', { sql, action })

      switch (action) {
        case 'create': {
          const result = stmt.run(...params)
          onSuccess(result)
          break
        }

        case 'read': {
          const result = stmt.get(...params)
          onSuccess(result)
          break
        }

        case 'update': {
          const result = stmt.run(...params)
          onSuccess(result)
          break
        }

        case 'delete': {
          const result = stmt.run(...params)
          onSuccess(result)
          break
        }

        case 'list': {
          const result = stmt.all(...params)
          onSuccess(result)
          break
        }

        default:
          throw new Error(`Unknown action: ${action}`)
      }
    } catch (error) {
      console.error('Error in localDBMainHandler:', error)
      onError(`${error}`)
    }

    return response
  }

  // event listener from renderer
  ipcMain.handle(IMyChannelEventNames.DB_CRUD, handler)
}

export default localDBMainHandler
