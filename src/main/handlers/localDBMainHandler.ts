import initializeDB from '@src/database/initializeDB'
import { IMyChannelEventNames, IRendererExecuteSQL } from '@src/interfaces/mychannel.ipc.interface'
import { ipcMain } from 'electron'

const db = initializeDB()

const localDBMainHandler: () => void = () => {
  ipcMain.handle(
    IMyChannelEventNames.DB_CRUD,
    async (_, { action, payload }: IRendererExecuteSQL) => {
      try {
        const { params = [], sql } = payload
        const stmt = db.prepare(sql)

        switch (action) {
          case 'create': {
            const result = stmt.run(...params)
            return { success: true, result }
          }

          case 'read': {
            const result = stmt.run(...params)
            return { success: true, result }
          }

          case 'update': {
            const result = stmt.run(...params)
            return { success: result.changes > 0, result }
          }

          case 'delete': {
            const result = stmt.run(params)
            return { success: result.changes > 0, result }
          }

          case 'list': {
            const result = stmt.run(params)

            return { success: true, result }
          }

          default:
            throw new Error(`Unknown action: ${action}`)
        }
      } catch (error) {
        console.error('Error in localDBMainHandler:', error)
        return { success: false, error: `${error}`, result: null }
      }
    }
  )
}

export default localDBMainHandler
