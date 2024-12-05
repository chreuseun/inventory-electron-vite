import sqliteDatabase, { Database } from 'better-sqlite3'

const initializeDB: () => Database = () => {
  const db: Database = new sqliteDatabase(`inventory.db`)

  db.name
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
  return db
}

export default initializeDB
