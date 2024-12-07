import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '@resources/icon.png?asset'
import { IMyChannelEventNames } from '@src/interfaces/mychannel.ipc.interface'

import { version as packageVersion } from '../../package.json'
import { initialSQLite3Setup } from '@src/database/dbOps/initialSQLite3Setup'
import localDBMainHandler from './handlers/localDBMainHandler'

const sqlite3DBInitiator: () => void = () => {
  console.log('*** Setting Up SQLite3 DB')
  console.log('*** Creating Tables')

  initialSQLite3Setup(
    (res) => {
      console.log(`SUCCESS@initialSQLite3Setup: ${JSON.stringify(res, null, 4)}`)
    },
    (err) => {
      console.log(`ERROR@initialSQLite3Setup: ${err}`)
    }
  )
}

function createWindow(): void {
  // Create the browser window.
  console.log('For App Icon: __dirname: ', path.join(__dirname, '../../resources/icon.png'))
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: icon, // path.join(__dirname, '../../resources/icon.png'),
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  //

  sqlite3DBInitiator()
})

// IPC test
ipcMain.on('ping', () => console.log('pong'))

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// EUN_DEV_IPCs
// One-Way Comms : Renderer send message to
ipcMain.on(IMyChannelEventNames.HELLO_MAIN, (_, data: string) => {
  console.log(`-- ipcMain.on: ${IMyChannelEventNames.HELLO_MAIN}: `, JSON.stringify(data, null, 4))
})

// Two-way comms
ipcMain.handle(IMyChannelEventNames.GET_APP_VERSION, () => {
  return { version: packageVersion, appName: app.getName() }
})

// Event handler for DB_CRUD
localDBMainHandler()
