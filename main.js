const { app, BrowserWindow, ipcMain, webContents, dialog } = require('electron');
const path = require('path');

require('electron-reload')(__dirname);

// Database
const con = require('./database/db');

con.connect((error) => {
    if (error) throw error
    console.log('Connected with the database');
});

// Query
const { login, store } = require('./queries');

// Abrir caixa de arquivo
const handleFileOpen = async() => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  }

var win;

const createWindow = () =>{
    win = new BrowserWindow({
        width: 375,
        height: 650,
        resizable: false,
        title: 'Login',
        webPreferences: {
            devTools: true, // provisorio
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.resolve(__dirname, 'preload.js')
        }
    });

    // win.setMenu(null);
    win.loadURL(path.resolve(__dirname, 'views', 'login', 'index.html'));

    // Login
    ipcMain.on('form', async (event, result)  => {
        login(result, (e) => {
            // console.log(e);

            if (e != undefined) { //existe um usuário
                event.returnValue = e;
            }
        });
    });

    // Open file
    ipcMain.handle('dialog:openFile', handleFileOpen);

    // Ler o caminho do arquivo
    ipcMain.on('path', (event, result) => {
        console.log(result);

        store(result);
    })
}

app.whenReady().then(result => {
    createWindow();
})

