import { Hourglass } from 'react-loader-spinner';
import Countdown from 'react-countdown';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Flex, Drawer, message } from 'antd';
import { PoweroffOutlined, ExpandOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import dayjs from 'dayjs';

const FocusDrawer = forwardRef(({ time, pureTime, title }, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { setOpen: setOpen };
	});

	const [messageApi, contextHolder] = message.useMessage();

	const [dateTime, setDateTime] = useState(dayjs());

	let isDone = false;

	let progressTime = [];

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(dayjs());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const renderer = ({ hours, minutes, seconds, completed }) => {
		progressTime = [hours, minutes, seconds];
		// 倒计时完成后的回调
		if (completed) {
			isDone = true;
			window.electron.ipcRenderer.send('flash-frame-open');
			return <span>恭喜你完成专注计划，太棒了</span>;
		} else {
			return (
				<span className={styles['focus-drawer-time']}>
					{hours}:{minutes}:{seconds}
				</span>
			);
		}
	};

	const onClose = () => {
		if (isDone) {
			isDone = false;
			setOpen(false);
			// 将时间数组转换为总毫秒数
			const totalMillisecondsFromArray = progressTime[0] * 3600000 + progressTime[1] * 60000 + progressTime[2] * 1000;
			// 计算时间戳与时间数组总毫秒数的差
			const timeDifference = Math.abs(pureTime - totalMillisecondsFromArray);
			// 计算小时、分钟和秒数
			const hours = Math.floor(timeDifference / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
			// 格式化
			const doneTime = [hours, minutes, seconds].reduce((acc, val, i) => {
				return acc + (i === 0 ? '' : ':') + (val < 10 ? '0' : '') + val;
			}, '');
			const totalTime = progressTime.reduce((acc, val, i) => {
				return acc + (i === 0 ? '' : ':') + (val < 10 ? '0' : '') + val;
			}, '');
			window.electron.ipcRenderer.send('add-focus-plan-log', {
				title: title,
				progress_time: doneTime,
				total_time: totalTime,
			});
		} else {
			messageApi.open({
				type: 'warning',
				content: '专注计划未结束！是否确认退出？双击直接退出',
			});
			isDone = true;
			setTimeout(() => {
				isDone = false;
			}, 500);
		}
	};

	return (
		<>
			{contextHolder}
			<Drawer open={open} height="100%" placement="bottom" closable={false} destroyOnClose={true}>
				<Flex vertical justify="space-between" align="center" style={{ height: '100%' }}>
					<Flex justify="space-between" style={{ width: '100%' }}>
						<span>{dateTime.format('HH:mm:ss')}</span>
						<span className={styles['focus-drawer-title']}>“{title}”</span>
						<span>{dateTime.format('YYYY/MM/DD')}</span>
					</Flex>
					<Flex style={{ flex: 1 }} justify="center" align="center">
						<Hourglass
							visible={true}
							height="80"
							width="80"
							ariaLabel="hourglass-loading"
							wrapperStyle={{}}
							wrapperClass=""
							colors={['#306cce', '#72a1ed']}
						/>
					</Flex>
					<Countdown date={time} renderer={renderer} />
					<Flex style={{ width: '100%' }} justify="flex-end" gap={'20px'}>
						<ExpandOutlined onClick={() => window.electron.ipcRenderer.send('window-max')} />
						<PoweroffOutlined onClick={() => onClose()} />
					</Flex>
				</Flex>
			</Drawer>
		</>
	);
});

export default FocusDrawer;
