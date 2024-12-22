import sqliteDatabase, { Database } from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'

console.log('*** INITIALIZED_DB: MOUNTED')
const dbOPtions: sqliteDatabase.Options = {
  // verbose: (message) => {
  //   console.log('--- SQLITE_3 VERBOSE: ', message)
  // }
}
const DB_PATH = path.join(app.getPath('userData'), 'inventory.db')
const db: Database = new sqliteDatabase(DB_PATH, dbOPtions)

console.log(
  '*** SQLite3_DB Created: ',
  JSON.stringify(
    {
      ...db
    },
    null,
    4
  )
)

const initializeDB: () => Database = () => {
  return db
}

export default initializeDB
