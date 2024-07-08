import { useState, useEffect } from 'react';
import { Flex, Tag, Typography, Alert } from 'antd';
import { JavaScriptOutlined, QqOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons';

const About = () => {
	const [versions] = useState(window.electron.process.versions);

	const [constant, setConstant] = useState({});

	useEffect(() => {
		window.electron.ipcRenderer.send('get-system-info');

		window.electron.ipcRenderer.on('get-system-info-callback', (e, result) => {
			setConstant(result);
		});
	}, []);

	return (
		<>
			<Flex vertical>
				<Typography.Title level={3}>关于迪达待办</Typography.Title>
				React+Electron开发的跨端桌面端软件，用户日常高效管理任务的一种解决方案
				<Typography.Title level={4}>注意事项</Typography.Title>
				<Alert message="注意" description={`软件使用的本地数据库，清除用户${constant.dbFilePath}文件则会丢失所有数据`} type="warning" showIcon />
				<Typography.Title level={4}>版本信息</Typography.Title>
				<Flex wrap="wrap" gap={'10px'}>
					<Tag icon={<JavaScriptOutlined />} color="#F5E130">
						{versions.node}
					</Tag>
					<Tag color="rgb(159, 234, 249)">Electron {versions.electron}</Tag>
					<Tag color="#3b5999">V8 {versions.v8}</Tag>
				</Flex>
				<Typography.Title level={4}>联系我们</Typography.Title>
				<Flex wrap="wrap" gap={'10px'}>
					<Tag icon={<QqOutlined />}>1765659336</Tag>
					<Tag icon={<WechatOutlined />} color="#2FA145">
						NoAdvantages
					</Tag>
					<Tag icon={<GithubOutlined />} color="#232625">
						<a href="https://github.com/hnjlg/electron_react_dida_app" target="_blank">
							hnjlg/electron_react_dida_app
						</a>
					</Tag>
				</Flex>
			</Flex>
		</>
	);
};

export default About;
