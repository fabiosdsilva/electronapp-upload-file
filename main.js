const { app, BrowserWindow } = require('electron');
const path = require('path');

require('electron-reload')(__dirname);

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
}

app.whenReady().then(() => {
    createWindow();
});