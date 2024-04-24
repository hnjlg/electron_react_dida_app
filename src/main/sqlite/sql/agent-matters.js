import { db } from '../index';

// 根据查询条件获取代办事项
export const getAgentMattersSql = (queryParams) => {
    if (!queryParams) return;
    const queryParamsKeys = Object.keys(queryParams);
    const sqlQuery = [];
    const sqlText = `SELECT * FROM agent_matters WHERE ${queryParamsKeys.reduce((acc, cur) => {
        sqlQuery.push(queryParams[cur]);
        return acc + (acc ? 'AND ' : '') + cur + ' = ?'
    }, '')}`;
    return new Promise((resolve, reject) => {
        db.all(sqlText, sqlQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// 新增代办事项
export const addAgentMatterSql = (agentMatter) => {
    if (!agentMatter) return;
    const agentMatterKeys = Object.keys(agentMatter);
    const sqlQuery = [];
    const sqlText = `INSERT INTO agent_matters (${agentMatterKeys.join(',')}) VALUES (${agentMatterKeys.reduce((acc, cur) => {
        sqlQuery.push(agentMatter[cur]);
        return acc + (acc ? ',' : '') + '?'
    }, '')
        })`;

    return new Promise((resolve, reject) => {
        db.run(sqlText, sqlQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// file_id = ?, blocks = ?

// 编辑待办事项
export const editAgentMatterSql = (agentMatter) => {
    if (!agentMatter) return;
    const agentMatterKeys = Object.keys(agentMatter).filter(item => item !== 'id');
    const sqlQuery = [];
    const sqlText = `UPDATE agent_matters SET ${agentMatterKeys.reduce((acc, cur) => {
        sqlQuery.push(agentMatter[cur]);
        return acc + (acc ? ', ' : '') + cur + ' = ?'
    }, '')} WHERE id = ?;`;

    return new Promise((resolve, reject) => {
        db.run(sqlText, [...sqlQuery, agentMatter.id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}