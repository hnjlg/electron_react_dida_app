import { Modal, Image } from 'antd';
import { useState } from 'react';

// 彩蛋弹窗
const Eggs = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	window.electron.ipcRenderer.on('run-ctrl-m-callback', () => {
		setIsModalOpen(!isModalOpen);
	});

	return (
		<Modal
			title="彩蛋"
			open={isModalOpen}
			footer={null}
			onCancel={() => {
				setIsModalOpen(false);
			}}
		>
			<Image.PreviewGroup
				items={[
					import.meta.env.RENDERER_VITE_EGGSHEEL_ONE,
					import.meta.env.RENDERER_VITE_EGGSHEEL_TWO,
					import.meta.env.RENDERER_VITE_EGGSHEEL_THREE,
					import.meta.env.RENDERER_VITE_EGGSHEEL_FOUR,
				]}
			>
				<Image width="100%" src={import.meta.env.RENDERER_VITE_EGGSHEEL_FOUR} />
			</Image.PreviewGroup>
		</Modal>
	);
};

export default Eggs;
