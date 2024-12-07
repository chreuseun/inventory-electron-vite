import sqliteDatabase, { Database } from 'better-sqlite3'

console.log('*** INITIALIZED_DB: MOUNTED')
const dbOPtions: sqliteDatabase.Options = {
  // verbose: (message) => {
  //   console.log('--- SQLITE_3 VERBOSE: ', message)
  // }
}
const db: Database = new sqliteDatabase(`inventory.db`, dbOPtions)

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
