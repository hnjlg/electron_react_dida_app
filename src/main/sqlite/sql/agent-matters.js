import { db } from '../index';

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