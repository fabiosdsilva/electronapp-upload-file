const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

require('electron-reload')(__dirname);

// Database
const db = require('./database/db');
db.connect(error => {
    if (error) {
        throw error
    }

    console.log('Conected the database');
})

var win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 375,
        height: 650,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.resolve(__dirname, 'preload.js')
        }
    });
    
    win.setMenu(null);
    win.loadFile(path.resolve(__dirname, 'views', 'login', 'index.html'));

    // Login
    ipcMain.on('form', (event, result) => {
        console.log(result);
    });
}

app.whenReady().then(() => {
    createWindow();
});