import { Menu, MenuItem, BrowserWindow } from 'electron';


export default (ipc) => {
    const menu = new Menu();

    menu.append(new MenuItem({
        label: 'Electron',
        submenu: [{
            role: 'help',
            accelerator: 'CTRL+M',
            click: () => {
                BrowserWindow.getFocusedWindow().webContents.send('run-ctrl-m-callback');
            }
        }]
    }));

    Menu.setApplicationMenu(menu);
};