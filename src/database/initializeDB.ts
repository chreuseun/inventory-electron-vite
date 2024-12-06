import sqliteDatabase, { Database } from 'better-sqlite3'

const db: Database = new sqliteDatabase(`inventory.db`)

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
