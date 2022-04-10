const { app, BrowserWindow, ipcMain, webContents, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

require('electron-reload')(__dirname);

// Database
const con = require('./database/db');

con.connect((error) => {
    if (error) throw error
    console.log('Connected with the database');
});

// Query
const { login, store, getAll } = require('./queries');

// Settings
let settings = require('./settings/settings');

console.log(settings.notifications)

// ejs-electron
const ejs = require('ejs-electron');
ejs.data('settings', settings.notifications)

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
    win.loadURL(path.resolve(__dirname, 'views', 'configuracoes', 'index.ejs'));

    // Login
    ipcMain.on('form', async (event, result)  => {
        login(result, (e) => {
            // console.log(e);

            if (e != undefined) { //existe um usuário
                event.returnValue = e; // refatorar porque estou enviando os dados de novo para o renderizador
            }
        });
    });

    // Open file
    ipcMain.handle('dialog:openFile', handleFileOpen);

    // Ler o caminho do arquivo
    ipcMain.on('path', async (event, result) => {
        store(result);
        console.log(result);
    });

    // Settings
    ipcMain.on('check', async (event, result) => {

        if (result !== settings.notifications) {
            let obj = { notifications: result }
            await fs.writeFileSync(path.resolve(__dirname, 'settings', 'settings.json'), JSON.stringify(obj));
        }     
    });
}

app.whenReady().then(result => {
    createWindow();
})

