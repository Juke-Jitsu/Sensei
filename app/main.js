
const {app, BrowserWindow, ipcMain} = require('electron')
const exec                          = require('child_process').exec;
var   juke                          = require('Juke-Jitsu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800
                                   , height: 600
                                   , frame: false
                                   })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/html/index.html`)

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('quit', function (){
    // Kill Juke server
    jukeServer.kill()
})

var isJukeRunning = false;

ipcMain.on('juke-start', function () {

    /*****************************************/
    console.warn('DON\'T USE EXEC');
    /*****************************************/

    // TODO: juke.startServer()
    // TODO: Add callback to startServer
    // mainWindow.webContents.send('juke-started')

    // jukeServer = exec('npm start', {cwd: '/home/chrx/git/Juke-Jitsu/Server'}, function (error, stdout, stderr) {
    //     console.log(stdout)
    //     console.error(stderr)
    //     if (!error) {
    //         isJukeRunning = true;
    //         mainWindow.webContents.send('juke-started')
    //     }
    // });

});
