


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
    })
};