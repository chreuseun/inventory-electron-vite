import {
  SQL_CREATE_USERS_TABLE_IF_EXIST,
  SQL_CREATE_MATERIALS_TABLE_IF_EXIST,
  SQL_CREATE_PRODUCTS_TABLE_IF_EXIST,
  SQL_CREATE_RECIPES_TABLE_IF_EXIST
} from './sql/sql.createTables'
import { sqliteCreateTable } from './sqliteFunctions'

const initialSQLite3Setup: (successCallback: () => void, errorCallback: () => void) => boolean = (
  successCallback,
  errorCallback
) => {
  try {
    // users table
    sqliteCreateTable({
      SQL: SQL_CREATE_USERS_TABLE_IF_EXIST,
      onCompleted: () => {
        console.log('-- OK: CREATE users table')
      },
      onError: () => {
        console.log('-- FAIL: CREATE users table')
      }
    })

    // products table
    sqliteCreateTable({
      SQL: SQL_CREATE_PRODUCTS_TABLE_IF_EXIST,
      onCompleted: () => {
        console.log('-- OK: CREATE Products Tbl')
      },
      onError: () => {
        console.log('-- FAIL: CREATE Products Tbl')
      }
    })

    // materials table
    sqliteCreateTable({
      SQL: SQL_CREATE_MATERIALS_TABLE_IF_EXIST,
      onCompleted: () => {
        console.log('-- OK: CREATE materials table')
      },
      onError: () => {
        console.log('-- FAIL: CREATE materials table')
      }
    })

    // recipes table
    sqliteCreateTable({
      SQL: SQL_CREATE_RECIPES_TABLE_IF_EXIST,
      onCompleted: () => {
        console.log('-- OK: CREATE recipes table')
      },
      onError: () => {
        console.log('-- FAIL: CREATE recipes table')
      }
    })

    successCallback()
    return true
  } catch (err) {
    console.log('-- ERR@initialSQLite3Setup: ', err)
    errorCallback()

    return false
  }
}

export { initialSQLite3Setup }
