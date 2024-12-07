import initializeDB from '../initializeDB'

interface ISQLiteCreateTable {
  SQL: string
  onCompleted: () => void
  onError: (error: unknown) => void
}

const sqliteCreateTable: (args: ISQLiteCreateTable) => void = ({ SQL, onCompleted, onError }) => {
  try {
    const db = initializeDB()
    db.exec(SQL)

    onCompleted()
  } catch (sqlError) {
    onError(sqlError)
  }
}

export { sqliteCreateTable }
