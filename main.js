const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
    //创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 500,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
        frame: false
    })

    //让浏览器加载index.html
    mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
        // mainWindow.webContents.openDevTools()

    ipcMain.on('min', () => mainWindow.minimize());
    ipcMain.on('max', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    });
    ipcMain.on('close', () => mainWindow.close());
}

//执行
app.on('ready', createWindow)


console.log(app.getPath('userData'));