const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
    form: (obj) => ipcRenderer.send('form',obj)
});