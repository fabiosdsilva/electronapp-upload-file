const { contextBridge, ipcRenderer } = require('electron');


// Screen login
contextBridge.exposeInMainWorld('electronApi', {
    form: (obj) => ipcRenderer.sendSync('form', obj)
});

contextBridge.exposeInMainWorld('dialog', {
   openFile: () => ipcRenderer.invoke('dialog:openFile')
});

contextBridge.exposeInMainWorld('filePath', {
    file: (path) => ipcRenderer.send('path', path)
});

contextBridge.exposeInMainWorld('settings', {
    check: (checkbox) => ipcRenderer.send('check',checkbox)
});