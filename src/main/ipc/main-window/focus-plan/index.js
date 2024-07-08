import { getFocusPlanSql, addFocusPlanSql } from '../../../sqlite/sql/focus-plan';

export default (ipc) => {
	ipc.on('get-focus-plan', async (event, queryParams) => {
		const result = await getFocusPlanSql(queryParams);
		event.sender.send('get-focus-plan-callback', result);
	});

	ipc.on('add-focus-plan', (event, focusPlan) => {
		addFocusPlanSql(focusPlan);
	});
};
