
import { db } from '../index';

// 查询操作
export const getSettingSql = () => {

    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM setting LIMIT 1`, [], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

export const editSettingSql = (settingValue) => {

    if (!settingValue) return;
    const settingValueKeys = Object.keys(settingValue).filter(item => item !== 'id');
    const sqlQuery = [];
    const sqlText = `UPDATE setting SET ${settingValueKeys.reduce((acc, cur) => {
        sqlQuery.push(settingValue[cur]);
        return acc + (acc ? ', ' : '') + cur + ' = ?'
    }, '')} WHERE id = ?;`;

    return new Promise((resolve, reject) => {
        db.run(sqlText, [...sqlQuery, settingValue.id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}