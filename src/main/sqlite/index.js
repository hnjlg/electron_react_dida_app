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
                    title                       VARCHAR (150) NOT NULL,
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
                create_time                 TIMESTAMP default (datetime('now', 'localtime')),
                description                 TEXT NOT NULL
            );`
        );

        // 设置表
        db.run(`CREATE TABLE IF NOT EXISTS setting  (
            id                          INTEGER PRIMARY KEY AUTOINCREMENT,
            component_size              VARCHAR (50) NOT NULL,
            close_system_type           VARCHAR (50) NOT NULL
        );`, [], () => {
            if (!versionResult) {
                db.run(`INSERT INTO setting (component_size, close_system_type) VALUES (?, ?)`, ['small', 'default'])
            }
        });

        // 专注计划表
        db.run(`CREATE TABLE IF NOT EXISTS focus_plan  (
            id                          INTEGER PRIMARY KEY AUTOINCREMENT,
            title                       VARCHAR (50) NOT NULL,
            time                        VARCHAR (50) NOT NULL,
            count                       VARCHAR (50) NOT NULL default 0
        );`);

        //工作台菜单表
        db.run(`CREATE TABLE IF NOT EXISTS work_menu1 (
            id        INTEGER      PRIMARY KEY AUTOINCREMENT,
            menu_name VARCHAR (50) NOT NULL,
            menu_key  VARCHAR (50) NOT NULL
                                   CONSTRAINT 菜单名 UNIQUE
        );`);

        //工作台链接表
        db.run(`CREATE TABLE IF NOT EXISTS work_link1 (
            id          INTEGER      PRIMARY KEY AUTOINCREMENT,
            menu_key    VARCHAR (50) NOT NULL, 
            window_name VARCHAR (50) NOT NULL,
            url         VARCHAR (50) NOT NULL,
            FOREIGN KEY (menu_key) REFERENCES work_menu (menu_key)
        );
        `)
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