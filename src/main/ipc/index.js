import { ipcMain } from 'electron';

export default () => {
    ipcMain.on('ping', () => console.log('pong'))
};