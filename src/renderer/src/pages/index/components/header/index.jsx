import { CloseSystemType } from '@renderer/globalConfig';
import { LineOutlined, FullscreenOutlined, CloseOutlined, SkinOutlined } from '@ant-design/icons';
import { Flex, Modal, ConfigProvider, Space, Divider, Button, Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useThemeStore } from '@renderer/store/theme';
import styles from '../../style.module.scss';

const Header = () => {
	const [settingConfig, setSettingConfig] = useState({});

	const [isRemember, setIsRemember] = useState(false);

	const theme = useThemeStore((state) => state.theme);

	const themeValue = useThemeStore((state) => state.themeValue);

	const setTheme = useThemeStore((state) => state.setTheme);

	// 切换主题逻辑
	const toggleTheme = () => {
		setTheme(themeValue === 'lightTheme' ? 'darkTheme' : 'lightTheme');
	};

	window.electron.ipcRenderer.on('get-setting-callback', (_event, settingValue) => {
		setSettingConfig(settingValue);
	});

	const getSetting = () => window.electron.ipcRenderer.send('get-setting');

	const windowMin = () => {
		setIsModalOpen(false);
		setTimeout(() => {
			window.electron.ipcRenderer.send('window-min');
		}, 200);
	};

	const winClose = () => window.electron.ipcRenderer.send('window-close');

	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeWindow = () => {
		switch (settingConfig.close_system_type) {
			case CloseSystemType['系统提示']:
				return setIsModalOpen(true);
			case CloseSystemType['最小化到系统托盘']:
				return windowMin();
			case CloseSystemType['退出系统']:
				return winClose();
		}
	};

	useEffect(() => {
		getSetting();
	}, []);

	return (
		<>
			<Flex
				justify="space-between"
				className={styles['pages-index-header']}
				style={{
					backgroundColor: theme.colorBgBase,
				}}
			>
				<div className={styles['pages-index-header-drag']} style={{ backgroundColor: theme.colorBgBase }}></div>
				<Space>
					<Button onClick={() => toggleTheme()}>
						<SkinOutlined />
					</Button>
					<Divider type="vertical" style={{ borderInlineStart: '1px solid #000' }} />
					<Button onClick={() => windowMin()}>
						<LineOutlined />
					</Button>
					<Button onClick={() => window.electron.ipcRenderer.send('window-max')}>
						<FullscreenOutlined />
					</Button>
					<Button onClick={() => closeWindow()}>
						<CloseOutlined />
					</Button>
				</Space>
			</Flex>

			<Modal
				title="提示"
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={[
					<Button
						key="windowMin"
						onClick={() => {
							if (isRemember) {
								window.electron.ipcRenderer.send('edit-setting', {
									id: settingConfig.id,
									close_system_type: CloseSystemType['最小化到系统托盘'],
								});
								getSetting();
							}
							windowMin();
						}}
					>
						最小化到系统托盘
					</Button>,
					<Button
						key="winClose"
						type="primary"
						onClick={() => {
							if (isRemember) {
								window.electron.ipcRenderer.send('edit-setting', {
									id: settingConfig.id,
									close_system_type: CloseSystemType['退出系统'],
								});
								getSetting();
							}
							winClose();
						}}
					>
						退出系统
					</Button>,
				]}
			>
				<Radio
					checked={isRemember}
					onClick={() => {
						setIsRemember(!isRemember);
					}}
				>
					记住选择，下次不再提示
				</Radio>
			</Modal>
		</>
	);
};

export default Header;
