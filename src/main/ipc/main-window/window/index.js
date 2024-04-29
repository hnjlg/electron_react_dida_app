import { screen, BrowserWindow, shell } from 'electron';
import path from 'path';

export default (mainWindow) => {

    const ipc = mainWindow.webContents.ipc;

    // 窗口最小化
    ipc.on('window-min', () => {
        mainWindow.minimize();
    });

    // 登录窗口最大/小化
    ipc.on('window-max', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });

    // 关闭窗口
    ipc.on('window-close', () => {
        mainWindow.close();
    });


    // 关闭窗口闪烁提示
    ipc.on('flash-frame-close', () => {
        mainWindow.flashFrame(false);
    });

    // 打开窗口闪烁提示
    ipc.on('flash-frame-open', () => {
        mainWindow.flashFrame(true);
    });

    // 开启子窗口
    ipc.on('open-child-window', (event, windowParam) => {
        const screenWidthSize = screen.getPrimaryDisplay().workAreaSize.width;
        const screenHeightSize = screen.getPrimaryDisplay().workAreaSize.height;

        const childSysWindow = new BrowserWindow({
            width: parseInt(screenWidthSize / 2),
            height: parseInt(screenHeightSize / 2),
            show: true,
            resizable: true,
            autoHideMenuBar: true,
            title: windowParam.windowName,
            webPreferences: {
                webSecurity: false,
                preload: path.join(__dirname, '../preload/index.js'),
                sandbox: false
            }
        });

        /* 
            设置窗口最小宽高
        */
        childSysWindow.setMinimumSize(parseInt(screenWidthSize / 3), parseInt(screenHeightSize / 3));


        childSysWindow.webContents.setWindowOpenHandler((details) => {
            /* 
                返回窗口的详情信息，其中包含url，调用shell.openExternal将打开的子窗口置于
                最上方，返回{ action: 'deny' }表示运行创建新窗口
            */
            shell.openExternal(details.url);
            return { action: 'deny' };
        });

        childSysWindow.loadURL(windowParam.url);
    })
};