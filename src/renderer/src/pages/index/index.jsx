import { Outlet } from 'react-router-dom';
import { EditOutlined, QuestionCircleOutlined, OrderedListOutlined, SettingOutlined, HourglassOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Flex, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useState, useRef, useEffect } from 'react';
import AddAgentMatter from '@renderer/components/add-agent-matter';
import { useThemeStore } from '@renderer/store/theme';
import Eggs from './components/eggs';
import Header from './components/header';
import VersionUpdateModal from './components/version-update-modal';

// 菜单数据
const topMenus = [
	{
		key: '/index/agent-matters-four',
		icon: <EditOutlined />,
		label: '代办事项象限',
	},
	{
		key: '/index/agent-matters-list',
		icon: <OrderedListOutlined />,
		label: '代办事项列表',
	},
	{
		key: '/index/clock',
		icon: <HourglassOutlined />,
		label: '时钟',
	},
	{
		key: '/index/work-bench',
		icon: <AppstoreOutlined />,
		label: '工作台',
	},
];
const bottomMenus = [
	{
		key: '/index/about',
		icon: <QuestionCircleOutlined />,
		label: '关于',
	},
	{
		key: '/index/setting',
		icon: <SettingOutlined />,
		label: '设置',
	},
];

const Index = () => {
	const location = useLocation();

	const navigate = useNavigate();

	const [isAddAgentMatterModalOpen, setIsAddAgentMatterModalOpen] = useState(false);

	const [configOption, setConfigOption] = useState({});

	const theme = useThemeStore((state) => state.theme);

	const AddAgentMatterRef = useRef(null);

	// 点击菜单跳转路由
	const menuClick = (item) => {
		navigate(item.key);
	};

	const logoClick = () => {
		navigate('/index/home');
	};

	window.electron.ipcRenderer.on('get-setting-callback', (event, settingValue) => {
		setConfigOption({
			componentSize: settingValue.component_size,
		});
	});

	window.electron.ipcRenderer.on('run-ctrl-n-callback', () => {
		setIsAddAgentMatterModalOpen(!isAddAgentMatterModalOpen);
	});

	window.electron.ipcRenderer.on('has-new-version', () => {
		console.log('有新版本');
	});

	useEffect(() => {
		window.electron.ipcRenderer.send('get-setting');
	}, []);

	// 新增弹窗关闭回调
	const handleCancel = () => {
		setIsAddAgentMatterModalOpen(false);
		// 重置表单
		AddAgentMatterRef.current.formRef.current.resetFields();
	};

	// 新增表单提交
	const onFinish = (value) => {
		value.begin_time = value.time[0].format('YYYY/MM/DD hh:mm:ss');
		value.end_time = value.time[1].format('YYYY/MM/DD hh:mm:ss');
		delete value.time;
		window.electron.ipcRenderer.send('add-agent-matter', value);
		handleCancel();
	};

	return (
		<ConfigProvider
			componentSize={configOption.componentSize}
			theme={{
				token: theme,
			}}
		>
			<Header></Header>
			<Flex className={styles['pages-index']} style={{ backgroundColor: theme.colorTextBase }}>
				<Flex
					vertical
					className={styles['pages-index-left']}
					style={{
						backgroundColor: theme.colorBgBase,
						color: theme.colorTextBase,
					}}
				>
					<Flex vertical justify="center" align="center" className={styles['pages-index-left-header']} onClick={() => logoClick()}>
						<div className={styles['pages-index-logo']}></div>
						<div className={styles['pages-index-logo-text']}>迪达</div>
					</Flex>
					<Flex vertical justify="space-between" flex="1">
						<Menu selectedKeys={[location.pathname]} mode="inline" inlineCollapsed={true} items={topMenus} onClick={menuClick} />
						<Menu selectedKeys={[location.pathname]} mode="inline" inlineCollapsed={true} items={bottomMenus} onClick={menuClick} />
					</Flex>
				</Flex>
				<div className={styles['pages-index-outlet']} style={{ backgroundColor: theme.colorBgBase }}>
					<Outlet />
				</div>
			</Flex>
			<Eggs></Eggs>
			<AddAgentMatter ref={AddAgentMatterRef} open={isAddAgentMatterModalOpen} onCancel={handleCancel} formProps={{ onFinish }}></AddAgentMatter>
			<VersionUpdateModal></VersionUpdateModal>
		</ConfigProvider>
	);
};

export default Index;
