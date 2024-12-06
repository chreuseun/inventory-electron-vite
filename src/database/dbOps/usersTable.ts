import initializeDB from '../initializeDB'

// Create User
const createUserTable: () => void = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

    const db = initializeDB()
    db.exec(createTableQuery)

    console.log('Users table created successfully.')
  } catch (sqlError) {
    console.log(`ERR@createUserTable: `, sqlError)
  }
}

// Get All Users
const dtoGetAllUsers: () => unknown[] = () => {
  const db = initializeDB()

  const selectQuery = `SELECT * FROM users`
  const stmt = db.prepare(selectQuery)
  const users = stmt.all() as unknown[]

  console.log('Users:', users.length)

  return users || []
}

// Insert a new user
const insertNewUser: (args: { username: string; password: string }) => void = ({
  username,
  password
}) => {
  const db = initializeDB()

  const insertQuery = `
    INSERT INTO users (username, password)
    VALUES (@username, @password)
  `
  const stmt = db.prepare(insertQuery)
  const info = stmt.run({ username, password })
  console.log(`User inserted with ID: ${info.lastInsertRowid}`)
}

export { createUserTable, dtoGetAllUsers, insertNewUser }
