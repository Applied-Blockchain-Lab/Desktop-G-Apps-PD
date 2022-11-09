const { screen, BrowserWindow } = require('electron');
const windowState = require("electron-window-state");


const createMainWindow = () => {
    // Get information about the screen size.
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    // Load the previous state with fall-back to defaults
    const mainWindowState = windowState({
        defaultWidth: workAreaSize.width - 200,
        defaultHeight: workAreaSize.height - 100,
    });

    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 300,
        minHeight: 300,
        backgroundColor: "#FFF",
        titleBarStyle: "hidden",
        center: true,
        scrollBounce: false
        // webPreferences: {
        //   preload: path.join(__dirname, 'preload.js')
        // }    
    });

    win.webContents.setWindowOpenHandler(() => {
          return {
            action: 'allow',
            overrideBrowserWindowOptions: {
              frame: true,
              fullscreenable: false,
              x: mainWindowState.x,
              y: mainWindowState.y,
              width: mainWindowState.width,
              height: mainWindowState.height,
              center: true,
              scrollBounce: false,
              backgroundColor: 'black'
            }
          }
      });

    win.loadURL("https://drive.google.com/drive", { userAgent: "Chrome" });
}    

module.exports = { createMainWindow };