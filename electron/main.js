const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  setTimeout(() => {
    win.loadFile(path.resolve(__dirname, "../client/dist/index.html"))
  }, 2000)
}

app.whenReady().then(() => {

  const serverPath = path.join(__dirname, "../server/server.js")

  console.log("Starting backend server...")
  require(serverPath)

  createWindow()
})

app.on("window-all-closed", () => {
  app.quit()
})