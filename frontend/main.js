const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')
const url = require('url')

app.on('ready', () => {
    let win = new BrowserWindow({width: 800, height: 600})
    win.loadURL(`http://localhost:3333/main`)
    //win.webContents.openDevTools()
})