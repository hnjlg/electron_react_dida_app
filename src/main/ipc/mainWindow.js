import { getAgentMattersSql } from '../sqlite/sql/agent-matters';
/* 
    主窗口所有ipc
*/

export default (ipc) => {
    // 查询事项，支持查询条件
    ipc.on('get-agent-matters', async (event, queryParams) => {
        const result = await getAgentMattersSql(queryParams);
        event.sender.send('get-agent-matters-callback', result);
    });
};