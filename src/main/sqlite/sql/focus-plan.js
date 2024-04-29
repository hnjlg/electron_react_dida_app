import { db } from '../index';

// 查询操作
export const getFocusPlanSql = (queryParams = {}) => {

    const { pageIndex, pageSize } = queryParams;

    let sqlQuery = [];

    let sqlText = `SELECT * FROM focus_plan`;

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

export const addFocusPlanSql = (focusPlan) => {
    if (!focusPlan) return;
    const focusPlanKeys = Object.keys(focusPlan);
    const sqlQuery = [];
    const sqlText = `INSERT INTO focus_plan (${focusPlanKeys.join(',')}) VALUES (${focusPlanKeys.reduce((acc, cur) => {
        sqlQuery.push(focusPlan[cur]);
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
