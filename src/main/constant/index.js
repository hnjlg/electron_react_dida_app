import { app } from 'electron';
import path from 'path';

export const dbFilePath = path.join(path.dirname(app.getPath('userData')), 'dida-app', '/sys_db.db');

const version = app.getVersion();

export default {
	dbFilePath,
	version,
};
