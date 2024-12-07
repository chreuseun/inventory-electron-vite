import initializeDB from '../initializeDB'

interface ISQLiteCreateTable {
  SQL: string
  onCompleted: () => void
  onError: (error: string) => void
}

const sqliteCreateTable: (args: ISQLiteCreateTable) => void = ({ SQL, onCompleted, onError }) => {
  try {
    const db = initializeDB()
    db.exec(SQL)

    onCompleted()
  } catch (sqlError) {
    const errorMessage = sqlError as string
    onError(errorMessage)
  }
}

export { sqliteCreateTable }
