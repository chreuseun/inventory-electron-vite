import { ElectronAPI } from '@electron-toolkit/preload'
import {
  ICUSTOM_IPC_NAMES,
  // IEunDevIPC,
  ILocalDBContextBridgeAPIs
} from 'src/interfaces/mychannel.ipc.interface'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    // [ICUSTOM_IPC_NAMES.EUN_DEV_IPC]: IEunDevIPC
    [ICUSTOM_IPC_NAMES.RENDERER_DB_CRUD]: ILocalDBContextBridgeAPIs
  }
}
