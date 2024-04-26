import { db } from '../index';

// 查询操作
export const getOperateLogSql = (queryParams = {}) => {

    const { pageIndex, pageSize } = queryParams;

    let sqlQuery = [];

    let sqlText = `SELECT * FROM operate_log`;

    if (pageIndex && pageSize) {
        sqlText += ' LIMIT ? OFFSET ?';
        sqlQuery = sqlQuery.concat([pageSize, (pageIndex - 1) * pageSize]);
    }

    return new Promise((resolve, reject) => {
        db.all(sqlText, sqlQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

// 插入操作日志
export const addOperateLogSql = (operateLog) => {
    if (!operateLog) return;
    const operateLogKeys = Object.keys(operateLog);
    const sqlQuery = [];
    const sqlText = `INSERT INTO operate_log (${operateLogKeys.join(',')}) VALUES (${operateLogKeys.reduce((acc, cur) => {
        sqlQuery.push(operateLog[cur]);
        return acc + (acc ? ',' : '') + '?'
    }, '')
        })`;

    console.log(sqlText, sqlQuery);

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