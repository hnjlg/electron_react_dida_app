import { useState, useEffect } from 'react';
import { Modal, Button, Progress, message } from 'antd';
import { StopOutlined, DownloadOutlined } from '@ant-design/icons';

const VersionUpdateModal = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isShowProgress, setIsShowProgress] = useState(false);

	const [progress, setProgress] = useState({});

	const beginDownloadNewVersion = () => {
		window.electron.ipcRenderer.send('download-new-version');
		setIsShowProgress(true);
	};

	useEffect(() => {
		// 应该从后端接口获取更新地址，模拟
		window.electron.ipcRenderer.send('check-new-version', import.meta.env.VITE_VERSION_UPDATE_URL);
		window.electron.ipcRenderer.on('has-new-version', () => {
			setIsModalOpen(true);
		});
		window.electron.ipcRenderer.on('update-new-version-progress', (_event, progress) => {
			setProgress(progress);
		});
		window.electron.ipcRenderer.on('update-new-version-error', () => {
			messageApi.error('更新失败，请检查网络连接');
			setIsModalOpen(false);
		});
	}, []);

	return (
		<>
			{contextHolder}
			<Modal title="版本更新" open={isModalOpen} footer={null} closable={false}>
				<p>发现新版本，是否立即更新？</p>
				{isShowProgress ? (
					<>
						<Progress percent={progress.percent} />
						<p>下载速度{progress.bytesPerSecond}b/s</p>
						<p>
							{progress.transferred}/{progress.total}
						</p>
					</>
				) : (
					<>
						<Button type="primary" icon={<StopOutlined />} onClick={() => setIsModalOpen(false)}>
							暂不更新
						</Button>
						<Button type="primary" icon={<DownloadOutlined />} onClick={beginDownloadNewVersion}>
							立即更新
						</Button>
					</>
				)}
			</Modal>
		</>
	);
};

export default VersionUpdateModal;
