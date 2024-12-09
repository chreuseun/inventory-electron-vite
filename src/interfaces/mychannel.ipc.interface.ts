import { IpcRendererEvent } from 'electron'

export enum ICUSTOM_IPC_NAMES {
  EUN_DEV_IPC = 'EUN_DEV_IPC',
  RENDERER_DB_CRUD = 'RENDERER_DB_CRUD'
}

export enum IMyChannelEventNames {
  HELLO_MAIN = 'HELLO_MAIN',
  GET_APP_VERSION = 'GET_APP_VERSION',
  MAIN_TEST_EVENT = 'MAIN_TEST_EVENT',
  DB_CRUD = 'DB_CRUD'
}

export type IRendererDBAction = 'create' | 'read' | 'update' | 'delete' | 'list' | 'bulkUpsert'

interface IEunDevIPC {
  sendHello: (message: string) => void
  getAppVersion: () => Promise<{ version: string; appName: string }>
  onMainEvent: (callback: (event: IpcRendererEvent, data: string) => void) => void
}

export type customSQLParams = string | number | null | undefined

interface IRendererExecuteSQL {
  action: IRendererDBAction
  payload: {
    sql: string
    params: customSQLParams[] | unknown[]
    operationName: string
  }
}

interface ILocalDBContextBridgeAPIs {
  executeLocalDB: <Results>({ action, payload }: IRendererExecuteSQL) => Promise<Results>
}

export type { IEunDevIPC, IRendererExecuteSQL, ILocalDBContextBridgeAPIs }
