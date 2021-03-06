// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const fs = require('fs')
const path = require('path')
var nodeConsole = require('console'); 
var myConsole = new nodeConsole.Console(process.stdout, process.stderr); 
myConsole.log('Start Speaker'); 

const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()//.onclick = () => myConsole.log(CLICK_MESSAGE)
}

const template = [
  // 这里是菜单模版
  {
    "label":"File",
    "role":"itemBar",
    "submenu":[
      {
        "label":"Open Recent",
        "role":"recentdocuments",
        "submenu":[
          {
            "label":"Clear Recent",
            "role":"clearrecentdocuments"
          }
        ]
      }
    ]
  },
  {
    "label":"Edit",
    "role":"itemBar",
    "submenu":[
      {"label":"Find",
       "role": "itemBar",
       "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
      },
      {
        "label":"Find In Files",
        "role": "itemBar",
        "submenu":[
          {
            "label":"Clear Recent",
            "role":"clearrecentdocuments"
          }
        ]
      }
    ]
  }
  
]
const menu = Menu.buildFromTemplate(template)

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation:false
    }
  })
  //dev
  mainWindow.webContents.openDevTools()
  // and load the index.html of the app.
  mainWindow.loadFile('main.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  Menu.setApplicationMenu(menu)
}).then(showNotification)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: '--new-window',
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: 'New Window',
//     description: 'Create a new window'
//   }
// ])

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
