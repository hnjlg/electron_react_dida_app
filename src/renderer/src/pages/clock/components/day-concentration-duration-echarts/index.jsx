import EchartsOptions from '@renderer/components/common/echarts-options';

const DayConcentrationDurationEcharts = () => {
	const options = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [6, 8, 9, 10, 11, 12, 13],
				type: 'line',
			},
		],
	};

	return (
		// 把图表封装单独放入一个组件中
		<EchartsOptions options={options} style={{ width: '100%', height: '240px' }}></EchartsOptions>
	);
};

export default DayConcentrationDurationEcharts;
