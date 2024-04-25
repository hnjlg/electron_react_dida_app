
import { getAgentMattersSql, addAgentMatterSql, editAgentMatterSql } from '../../../sqlite/sql/agent-matters';


export default (ipc) => {
    // 查询事项，支持查询条件
    ipc.on('get-agent-matters', async (event, queryParams, options = {}) => {
        const result = await getAgentMattersSql(queryParams);
        event.sender.send('get-agent-matters-callback', result, options);
    });

    // 新增事项
    ipc.on('add-agent-matter', async (event, agentMatter) => {
        await addAgentMatterSql(agentMatter);
    });

    // 编辑事项
    ipc.on('edit-agent-matter', async (event, agentMatter) => {
        await editAgentMatterSql(agentMatter)
    });
};