import { getOperateLogSql } from '../../sqlite/sql/operate-log';
import agentMatterIpcInit from './agent-matter/index';

/* 
    主窗口所有ipc
*/

export default (ipc) => {
    // 事项ipc
    agentMatterIpcInit(ipc);

    // 查询操作日志
    ipc.on('get-operate-logs', async (event, queryParams) => {
        const result = await getOperateLogSql(queryParams);
        event.sender.send('get-operate-logs-callback', result);
    });

};