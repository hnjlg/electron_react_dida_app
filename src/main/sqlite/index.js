import { app } from 'electron';
import path from 'path';
import sqlite3 from 'sqlite3';

const dbFilePath = path.join(path.dirname(app.getPath('userData')), 'dida-app', '/sys_db.db');

console.log('sql path:', dbFilePath);

const db = new sqlite3.Database(dbFilePath);

// 版本更新需要执行的SQL脚本
const updateTable = () => {

};


const createTable = (versionResult) => {
    db.serialize(() => {
        // 事项表
        db.run(`CREATE TABLE IF NOT EXISTS agent_matters (
                    id                          INTEGER PRIMARY KEY AUTOINCREMENT,
                    title                       VARCHAR (50) NOT NULL,
                    four_quadrant_value         VARCHAR (50) NOT NULL,
                    state                       INT DEFAULT 0 NOT NULL,
                    begin_time                  VARCHAR (100) NOT NULL,
                    end_time                    VARCHAR (100) NOT NULL,
                    description                 TEXT NOT NULL
                );`
        );

        // 操作记录表
        db.run(`CREATE TABLE IF NOT EXISTS operate_log  (
                id                          INTEGER PRIMARY KEY AUTOINCREMENT,
                create_time                 VARCHAR (100) NOT NULL,
                description                 TEXT NOT NULL
            );`
        );

        // 设置表
        db.run(`CREATE TABLE IF NOT EXISTS setting  (
            id                          INTEGER PRIMARY KEY AUTOINCREMENT,
            component_size              VARCHAR (50) NOT NULL
        );`, [], () => {
            if (!versionResult) {
                db.run(`INSERT INTO setting (component_size) VALUES (?)`, ['small'])
            }
        })
    });
}



// 不可修改
Object.assign(db);

export default () => {

    const dbVersion = '0.0.1';

    db.run(
        `CREATE TABLE IF NOT EXISTS sql_info (
            version Varchar (50),
            primary key (version));`,
        [],
        () => {
            db.get('SELECT * FROM sql_info ORDER BY version DESC LIMIT 1', [], (_error, versionResult) => {
                createTable(versionResult);
                if (!versionResult || (versionResult && versionResult.version !== dbVersion)) {
                    updateTable();
                    db.run('INSERT INTO sql_info (version) VALUES (?)', [dbVersion], () => { });
                }
            });
        }
    );
};

export {
    db
}