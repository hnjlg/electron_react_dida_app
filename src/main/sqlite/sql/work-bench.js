import { db } from '../index';

// 查询菜单操作
export const getMenuSql = () => {
	const sqlText = `SELECT * FROM work_menu`;
	return new Promise((resolve, reject) => {
		db.all(sqlText, [], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

// 查询链接操作
export const getLinkSql = (menu_key) => {
	const sqlText = `SELECT * FROM work_link WHERE menu_key = ?`;
	return new Promise((resolve, reject) => {
		db.all(sqlText, [menu_key], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

// 插入菜单操作
export const addMenuSql = (menu) => {
	if (!menu) return;
	const { menu_name, menu_key } = menu;
	const sqlText = `INSERT INTO work_menu (menu_name, menu_key) VALUES (?, ?)`;
	return new Promise((resolve, reject) => {
		db.run(sqlText, [menu_name, menu_key], function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(this.lastID);
			}
		});
	});
};

// 插入链接操作
export const addLinkSql = (link) => {
	if (!link) return;
	const { menu_key, window_name, url } = link;
	const sqlText = `INSERT INTO work_link (menu_key, window_name, url) VALUES (?, ?, ?)`;
	return new Promise((resolve, reject) => {
		db.run(sqlText, [menu_key, window_name, url], function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(this.lastID);
			}
		});
	});
};

// 更新菜单操作
export const updateMenuSql = (id, menu) => {
	if (!menu) return;
	const { menu_name, menu_key } = menu;
	const sqlText = `UPDATE work_menu SET menu_name = ?, menu_key = ? WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.run(sqlText, [menu_name, menu_key, id], function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(this.changes);
			}
		});
	});
};

// 更新链接操作
export const updateLinkSql = (id, link) => {
	if (!link) return;
	const { menu_key, window_name, url } = link;
	const sqlText = `UPDATE work_link SET menu_key = ?, window_name = ?, url = ? WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.run(sqlText, [menu_key, window_name, url, id], function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(this.changes);
			}
		});
	});
};

// 删除菜单操作
export const deleteMenuSql = (id) => {
	const sqlText = `DELETE FROM work_menu WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.run(sqlText, [id], function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(this.changes);
			}
		});
	});
};

// 删除链接操作
export const deleteLinkSql = (id) => {
	const sqlText = `DELETE FROM work_link WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.run(sqlText, [id], function (error) {
			if (error) {
				reject(error);
			} else {
				resolve(this.changes);
			}
		});
	});
};
