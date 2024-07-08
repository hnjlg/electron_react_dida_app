import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const ConcentrationDurationDistributionEcharts = ({ options, style }) => {
	const chartRef = useRef();

	useEffect(() => {
		// 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
		const chart = echarts.init(chartRef.current);

		// 设置图表实例的配置项和数据
		chart.setOption(options);

		window.addEventListener('resize', function () {
			chart.resize();
		});

		// 组件卸载
		return () => {
			// chart.dispose() 销毁实例。实例销毁后无法再被使用
			chart.dispose();
			window.removeEventListener('resize', function () {
				chart.resize();
			});
		};
	}, []);

	return (
		// 把图表封装单独放入一个组件中
		<div ref={chartRef} style={style}></div>
	);
};

export default ConcentrationDurationDistributionEcharts;
