import {
  SQL_CREATE_USERS_TABLE_IF_EXIST,
  SQL_CREATE_MATERIALS_TABLE_IF_EXIST,
  SQL_CREATE_PRODUCTS_TABLE_IF_EXIST,
  SQL_CREATE_RECIPES_TABLE_IF_EXIST,
  SQL_CREATE_RECIPE_ITEMS_TABLE_IF_EXIST,
  SQL_CREATE_SHELF_STOCK_TRANSACTION_TABLE_IF_EXIST,
  SQL_CREATE_STOCK_TRANSACTIONS_TABLE_IF_EXIST
} from './sql/sql.createTables'
import { sqliteCreateTable } from './sqliteFunctions'
import { ISQLite3TableNames } from '@src/database/dbInterfaces/database.interfaces'

interface IInitialDBSetupResult {
  errors: string[]
  data: { table: string; isSuccess: boolean }[]
}

const initialSQLite3Setup: (
  successCallback: (result: IInitialDBSetupResult) => void,
  errorCallback: (err: string) => void
) => IInitialDBSetupResult = (successCallback, errorCallback) => {
  const dbSetupResult: IInitialDBSetupResult = {
    errors: [],
    data: []
  }

  const updateDBRes: (args: {
    table: ISQLite3TableNames
    isSuccess: boolean
    errorMsg: string
  }) => void = ({ isSuccess, errorMsg, table }) => {
    if (errorMsg) {
      dbSetupResult.errors = [...dbSetupResult.errors, errorMsg]
    }
    dbSetupResult.data = [
      ...dbSetupResult.data,
      {
        table: table,
        isSuccess
      }
    ]
  }

  try {
    // users table
    sqliteCreateTable({
      SQL: SQL_CREATE_USERS_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.USERS_TABLE
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.USERS_TABLE
        })
      }
    })

    // products table
    sqliteCreateTable({
      SQL: SQL_CREATE_PRODUCTS_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.PRODUCTS_TABLE
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.PRODUCTS_TABLE
        })
      }
    })

    // materials table
    sqliteCreateTable({
      SQL: SQL_CREATE_MATERIALS_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.MATERIALS
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.MATERIALS
        })
      }
    })

    // recipes table
    sqliteCreateTable({
      SQL: SQL_CREATE_RECIPES_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.RECIPES_TABLE
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.RECIPES_TABLE
        })
      }
    })

    // recipe_items table
    sqliteCreateTable({
      SQL: SQL_CREATE_RECIPE_ITEMS_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.RECIPE_ITEMS_TABLE
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.RECIPE_ITEMS_TABLE
        })
      }
    })

    // shelf_stock_txn table
    sqliteCreateTable({
      SQL: SQL_CREATE_SHELF_STOCK_TRANSACTION_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.SHELF_STOCK_TRANSACTIONS_TABLE
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.SHELF_STOCK_TRANSACTIONS_TABLE
        })
      }
    })

    // stock_transaction table
    sqliteCreateTable({
      SQL: SQL_CREATE_STOCK_TRANSACTIONS_TABLE_IF_EXIST,
      onCompleted: () => {
        updateDBRes({
          isSuccess: true,
          errorMsg: '',
          table: ISQLite3TableNames.STOCK_TRANSACTIONS_TABLE
        })
      },
      onError: (error) => {
        updateDBRes({
          isSuccess: false,
          errorMsg: error,
          table: ISQLite3TableNames.SHELF_STOCK_TRANSACTIONS_TABLE
        })
      }
    })

    successCallback(dbSetupResult)
  } catch (err) {
    errorCallback(`${err}`)
  }

  return dbSetupResult
}

export { initialSQLite3Setup }
