const path = require("path");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

// create browser window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load the index.html of the app
  // point to local dev server in development
  // otherwiser point to bundled production version
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

// call createWindow after electron ready
app.whenReady().then(createWindow);

// quit app after all windows closed, except MacOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// re-create windows when app actives but there are no windows now
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});