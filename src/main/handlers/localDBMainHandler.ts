import initializeDB from '@src/database/initializeDB'
import {
  customSQLParams,
  IMyChannelEventNames,
  IRendererExecuteSQL
} from '@src/interfaces/mychannel.ipc.interface'
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

    const onSuccess: (sqlResult: Database.RunResult | unknown) => void = (sqlResult) => {
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

      switch (action) {
        case 'create': {
          const stmt = db.prepare(sql)

          const result = stmt.run(...params)
          onSuccess(result)
          break
        }

        case 'read': {
          const stmt = db.prepare(sql)

          const result = stmt.get(...params)
          onSuccess(result)
          break
        }

        case 'update': {
          const stmt = db.prepare(sql)

          const result = stmt.run(...params)
          onSuccess(result)
          break
        }

        case 'delete': {
          const stmt = db.prepare(sql)

          const result = stmt.run(...params)
          onSuccess(result)
          break
        }

        case 'list': {
          const stmt = db.prepare(sql)

          const result = stmt.all(...params)
          onSuccess(result)
          break
        }

        case 'bulkUpsert': {
          const upsertBulkData = params as customSQLParams[]
          const stmt = db.prepare(sql)
          let insertedCount = 0

          const insertMany = db.transaction((upsertArray) => {
            for (const itemArray of upsertArray) {
              try {
                stmt.run(itemArray)
                insertedCount = insertedCount + 1
              } catch (stmtRunError) {
                //    win.webContents.send('message-from-main', 'Hello from Main Process!');
                console.log('Error@stmtRunError: ', stmtRunError)
              }
            }
          })
          insertMany(upsertBulkData)
          onSuccess({ insertedCount: insertedCount })
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
