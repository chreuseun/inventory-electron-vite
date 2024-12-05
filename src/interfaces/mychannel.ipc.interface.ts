import { IpcRendererEvent } from 'electron'

export enum ICUSTOM_IPC_NAMES {
  EUN_DEV_IPC = 'EUN_DEV_IPC'
}

export enum IMyChannelEventNames {
  HELLO_MAIN = 'HELLO_MAIN',
  GET_APP_VERSION = 'GET_APP_VERSION',
  MAIN_TEST_EVENT = 'MAIN_TEST_EVENT'
}

interface IEunDevIPC {
  sendHello: (message: string) => void
  getAppVersion: () => Promise<{ version: string; appName: string }>
  onMainEvent: (callback: (event: IpcRendererEvent, data: string) => void) => void
}

export type { IEunDevIPC }
