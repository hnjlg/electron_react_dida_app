import { db } from '../index';

// 查询操作
export const getOperateLogSql = () => {

    const sqlQuery = [];

    const sqlText = `SELECT * FROM operate_log`;

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