import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  IEunDevIPC,
  IMyChannelEventNames,
  ICUSTOM_IPC_NAMES
} from '@src/interfaces/mychannel.ipc.interface'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld(ICUSTOM_IPC_NAMES.EUN_DEV_IPC, {
      sendHello: (message) => ipcRenderer.send(IMyChannelEventNames.HELLO_MAIN, message),
      getAppVersion: () => ipcRenderer.invoke(IMyChannelEventNames.GET_APP_VERSION),
      onMainEvent: (callback) =>
        ipcRenderer.on(IMyChannelEventNames.MAIN_TEST_EVENT, (event, data) => callback(event, data))
    } as IEunDevIPC)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
