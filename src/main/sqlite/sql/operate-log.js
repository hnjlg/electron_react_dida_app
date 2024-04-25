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
}