import { getOperateLogSql, addOperateLogSql } from '../../sqlite/sql/operate-log';
import { getSettingSql, editSettingSql } from '../../sqlite/sql/setting';
import agentMatterIpcInit from './agent-matter/index';
import windowIpcInit from './window/index';

/* 
    主窗口所有ipc
*/

export default (mainWindow) => {

    const ipc = mainWindow.webContents.ipc;

    // 事项ipc
    agentMatterIpcInit(ipc);

    // 窗口ipc
    windowIpcInit(mainWindow);

    // 查询操作日志
    ipc.on('get-operate-logs', async (event, queryParams) => {
        const result = await getOperateLogSql(queryParams);
        event.sender.send('get-operate-logs-callback', result);
    });

    // 插入操作日志
    ipc.on('add-operate-logs', (event, operateLog) => {
        addOperateLogSql(operateLog);
    });

    // 查询系统setting
    ipc.on('get-setting', async (event) => {
        const result = await getSettingSql();
        event.sender.send('get-setting-callback', result);
    });

    // 编辑系统setting
    ipc.on('edit-setting', async (event, settingValue) => {
        await editSettingSql(settingValue);
    });



};