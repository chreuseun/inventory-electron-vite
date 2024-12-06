import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '@resources/icon.png?asset'
import { IMyChannelEventNames } from '@src/interfaces/mychannel.ipc.interface'

import { version as packageVersion } from '../../package.json'
import initializeDB from '@src/database/initializeDB'
import { createUserTable, dtoGetAllUsers, insertNewUser } from '@src/database/dbOps/usersTable'

function createWindow(): void {
  // Create the browser window.
  console.log('---__dirnamess: ', path.join(__dirname, '../../resources/icon.png'))
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: icon, // path.join(__dirname, '../../resources/icon.png'),
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
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

  // Other codes like send message to ipcRenderer

  // Example: Sending a message to the renderer process after 5 seconds
  setTimeout(() => {
    mainWindow?.webContents.send(
      IMyChannelEventNames.MAIN_TEST_EVENT,
      'Hello Renderer! 5 seconds hads passed, the main process triggered this event.'
    )
  }, 5000)
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
  console.log('*** Setting Up SQLite3 DB')
  initializeDB()
  console.log('*** Creating Tables')

  // Create TABLES
  createUserTable()

  //select
  const allUsers = dtoGetAllUsers()
  if (!allUsers.length) {
    // insert one
    insertNewUser({
      username: 'developer',
      password: 'root_euneun'
    })

    // ceheck again
    dtoGetAllUsers()
  }
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
