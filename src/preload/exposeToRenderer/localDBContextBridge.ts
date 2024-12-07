import {
  ICUSTOM_IPC_NAMES,
  ILocalDBContextBridgeAPIs,
  IRendererExecuteSQL,
  IMyChannelEventNames
} from '@src/interfaces/mychannel.ipc.interface'
import { contextBridge, ipcRenderer } from 'electron'

const apiKey = ICUSTOM_IPC_NAMES.RENDERER_DB_CRUD
const apis: ILocalDBContextBridgeAPIs = {
  executeLocalDB: <Results>({ action, payload }: IRendererExecuteSQL) =>
    ipcRenderer.invoke(IMyChannelEventNames.DB_CRUD, { action, payload }) as Promise<Results>
}

const localDBContextBridge: () => void = () => {
  contextBridge.exposeInMainWorld(apiKey, apis)
}

export default localDBContextBridge
