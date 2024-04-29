import { app, shell, BrowserWindow, Menu, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import mainWindowIpcInit from './ipc/main-window/index'
import sqliteInit from './sqlite/index';
import acceleratorInit from './accelerator';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    minWidth: 650,
    minHeight: 500,
    height: 650,
    show: false,
    /* 
      决定窗口菜单栏是否自动隐藏。 一旦设置，菜单栏将只在用户单击 Alt 键时显示。
      如果菜单栏已经可见，将该属性设置为 true 将不会使其立刻隐藏。
    */
    autoHideMenuBar: true, // 设置为true来隐藏默认菜单栏
    frame: false   /*去掉顶部导航  去掉关闭按钮  最大化最小化按钮*/,
    ...(process.platform === 'linux' ? { icon } : {}),
    transparent: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
    }
  });

  /* 
    窗口聚焦
  */
  mainWindow.on('focus', () => {
    // 关闭任务栏窗口闪烁
    mainWindow.flashFrame(false);
  });

  /* 
    在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，
    渲染进程会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁：
  */
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  /* 
    当有新窗口要打开时，会调用shell.openExternal(details.url)来在用户的默认浏览器中打开这个URL，
    然后通过return { action: 'deny' }来阻止Electron应用程序打开新窗口。
    以防止恶意网站或内容在Electron应用程序中执行。
  */
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  /* 
   为了在渲染器中使用模块热替换（HMR）功能，需要使用 环境变量 来确定窗口浏览器是加载本地 html 文件还是本地 URL
  */
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  /* 
    mainWindow窗口ipc注册
  */
  mainWindowIpcInit(mainWindow);

  /* 
    数据库初始化
  */
  sqliteInit();


  /* 
    注册快捷键
  */
  acceleratorInit(mainWindow.webContents.ipc);

};

// 不需要默认菜单，将默认菜单清除
Menu.setApplicationMenu(null);

/* 
  当Electron 初始化完成。 可用作检查 app.isReady() 的方便选择，假如应用程序尚未就绪，则订阅ready事件。
*/
app.whenReady().then(() => {
  /* 
    在window中设置系统的id
  */
  electronApp.setAppUserModelId('com.ct.baby')

  /* 
    当一个新的 browserWindow 被创建时触发。
  */
  app.on('browser-window-created', (_, window) => {
    /* 
      F12在开发中默认打开或关闭DevTools
      并且忽略 CommandOrControl + R 在生产环境中
    */
    optimizer.watchWindowShortcuts(window)
  })

  // 打开主窗口
  createWindow()

  // 如果没有窗口打开则打开一个窗口
  app.on('activate', function () {
    /* 
      在MacOS上，当单击应用图标时，通常会在应用中重新创建一个窗口，并且没有其他窗口打开
    */
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

/* 
  当所有窗口都关闭时退出，除了MacOS上。 在那里，应用程序及其菜单栏是很常见的，直到用户用CMD + Q明确退出。
*/
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});


/* 
  捕获系统运行错误，另开窗口提示
*/

process.on('uncaughtException', (err) => {
  dialog.showErrorBox('未捕获的错误', err.message);
});
