import React, { useState } from 'react';
import { Progress } from 'antd';
import styles from './style.module.scss';

const conicColors = {
	'0%': '#87d068',
	'50%': '#ffe58f',
	'100%': '#ffccc7',
};
const DayPlanProgress = ({ style }) => {
	const [percent, setPercent] = useState(67);

	return (
		<div className={styles['day-plan-progress']}>
			<Progress type="dashboard" style={style} percent={percent} strokeColor={conicColors} format={(percent) => `${percent}% 24h`} />
		</div>
	);
};
export default DayPlanProgress;
