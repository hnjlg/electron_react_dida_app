import EchartsOptions from '@renderer/components/common/echarts-options';
const ConcentrationDurationDistributionEcharts = () => {
	const options = {
		title: {
			text: '2022.06.02 ~ 2022.07.01',
			subtext: '专注时长分布',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)',
		},
		legend: {
			left: 'center',
			top: 'center',
			data: ['标题1', '标题2', '其它'],
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		series: [
			{
				name: 'Radius Mode',
				type: 'pie',
				radius: [20, 140],
				center: ['50%', '50%'],
				roseType: 'radius',
				itemStyle: {
					borderRadius: 5,
				},
				label: {
					show: false,
				},
				emphasis: {
					label: {
						show: true,
					},
				},
				data: [
					{ value: 199, name: '标题1' },
					{ value: 33, name: '标题2' },
					{ value: 6, name: '其它' },
				],
			},
		],
	};

	return (
		// 把图表封装单独放入一个组件中
		<EchartsOptions options={options} style={{ width: '100%', height: '240px' }}></EchartsOptions>
	);
};

export default ConcentrationDurationDistributionEcharts;
