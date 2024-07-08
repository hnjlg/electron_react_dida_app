import { getFocusPlanLogSql, addFocusPlanLogSql } from '../../../sqlite/sql/focus-plan-log';

export default (ipc) => {
	ipc.on('get-focus-plan-log', async (event, queryParams) => {
		const result = await getFocusPlanLogSql(queryParams);
		event.sender.send('get-focus-plan-log-callback', result);
	});

	ipc.on('add-focus-plan-log', (event, focusPlan) => {
		addFocusPlanLogSql(focusPlan);
		event.sender.send('add-focus-plan-log-callback');
	});
};
