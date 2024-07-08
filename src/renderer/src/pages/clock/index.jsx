import { useState, useRef, useEffect } from 'react';
import { Flex, List, Button, Divider, Modal, Form, Input, TimePicker, Tabs } from 'antd';
import { PlusCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './style.module.scss';
import ConcentrationDurationDistributionEcharts from './components/concentration-duration-distribution-echarts';
import DayConcentrationDurationEcharts from './components/day-concentration-duration-echarts';
import DayPlanProgress from './components/day-plan-progress';
import FocusDrawer from './components/focus-drawer';

const Clock = () => {
	const AddPlanForm = useRef(null);

	const FocusDrawerRef = useRef(null);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const [planList, setPlanList] = useState([]);

	const [currentPlan, setCurrentPlan] = useState({
		time: 0,
	});

	const [planLogList, setPlanLogList] = useState([]);

	const onAddModalCancel = () => {
		setIsAddModalOpen(false);
		AddPlanForm.current.resetFields();
	};

	const onFormFinish = (values) => {
		const timeArr = dayjs(values.time).format('HH:mm:ss').split(':');
		const midnight = new Date();
		midnight.setHours(0);
		midnight.setMinutes(0);
		midnight.setSeconds(0);
		const targetTime = new Date();
		targetTime.setHours(Number(timeArr[0]));
		targetTime.setMinutes(Number(timeArr[1]));
		targetTime.setSeconds(Number(timeArr[2]));
		// 计算时间差
		const time = Math.floor((targetTime.getTime() - midnight.getTime()) / 1000);
		const newPlan = {
			title: values.title,
			time,
			count: 0,
		};
		window.electron.ipcRenderer.send('add-focus-plan', newPlan);
		setPlanList([newPlan, ...planList]);
		onAddModalCancel();
	};

	useEffect(() => {
		window.electron.ipcRenderer.on('get-focus-plan-callback', (event, planList) => {
			setPlanList(planList);
		});
		window.electron.ipcRenderer.send('get-focus-plan');

		window.electron.ipcRenderer.on('get-focus-plan-log-callback', (event, planLogList) => {
			setPlanLogList(planLogList);
		});

		// 新增专注记录时，重新获取专注记录
		window.electron.ipcRenderer.on('add-focus-plan-log-callback', () => {
			window.electron.ipcRenderer.send('get-focus-plan-log');
		});
		window.electron.ipcRenderer.send('get-focus-plan-log');
	}, []);

	return (
		<>
			<Flex className={styles['clock']}>
				<div className={styles['plan-list']}>
					<List
						header={
							<Flex justify="space-between">
								<div>专注计划</div>
								<Button
									onClick={() => {
										setIsAddModalOpen(true);
									}}
									icon={<PlusCircleOutlined />}
								></Button>
							</Flex>
						}
						dataSource={planList}
						renderItem={(item) => (
							<List.Item>
								<Flex justify="space-between" style={{ width: '100%' }}>
									<div flex={1}>
										<p>{item.title}</p>
										<span>{item.time} 秒</span>
										<Divider type="vertical" />
										<span>{item.count} 次数</span>
									</div>
									<Button
										onClick={() => {
											FocusDrawerRef.current.setOpen(true);
											setCurrentPlan({
												...item,
												time: Date.now() + Number(item.time) * 1000,
												pureTime: Number(item.time) * 1000,
											});
										}}
									>
										<PlayCircleOutlined />
									</Button>
								</Flex>
							</List.Item>
						)}
					/>
				</div>
				<Flex vertical className={styles['record-description']}>
					<div className={styles['echarts']}>
						<Tabs
							style={{ height: '280px' }}
							tabPosition={'bottom'}
							items={[
								{
									label: '每日计划',
									key: 3,
									children: <DayPlanProgress></DayPlanProgress>,
								},
								{
									label: '专注时长分布',
									key: 1,
									children: <ConcentrationDurationDistributionEcharts></ConcentrationDurationDistributionEcharts>,
								},
								{
									label: '专注趋势',
									key: 2,
									children: <DayConcentrationDurationEcharts></DayConcentrationDurationEcharts>,
								},
							]}
						/>
					</div>
					<div className={styles['log-list']}>
						<List
							header={
								<Flex justify="space-between">
									<div>专注记录</div>
								</Flex>
							}
							dataSource={planLogList}
							renderItem={(item) => (
								<List.Item>
									<Flex justify="space-between" style={{ width: '100%' }}>
										<div>
											<div style={{ fontWeight: 600 }}>{item.title}</div>
											<div>
												{item.progress_time}/{item.total_time}
											</div>
										</div>
										<div>{item.create_time}</div>
									</Flex>
								</List.Item>
							)}
						/>
					</div>
				</Flex>
			</Flex>

			<Modal title="新增专注计划" open={isAddModalOpen} footer={null} onCancel={onAddModalCancel}>
				<Form
					ref={AddPlanForm}
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFormFinish}
					autoComplete="off"
				>
					<Form.Item
						label="专注标题"
						name="title"
						rules={[
							{
								required: true,
								message: '请输入专注标题',
							},
							{
								max: 60,
								message: '专注标题不能超过60字',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="专注时长"
						name="time"
						rules={[
							{
								required: true,
								message: '请输入专注时长',
							},
						]}
					>
						<TimePicker />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							确认
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<FocusDrawer ref={FocusDrawerRef} {...currentPlan}></FocusDrawer>
		</>
	);
};

export default Clock;
