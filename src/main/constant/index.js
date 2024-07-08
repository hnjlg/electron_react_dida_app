import { app } from 'electron';
import path from 'path';

export const dbFilePath = path.join(path.dirname(app.getPath('userData')), 'dida-app', '/sys_db.db');

export default {
	dbFilePath,
};
