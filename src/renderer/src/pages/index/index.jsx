import { Outlet } from 'react-router-dom';
import {
    EditOutlined,
    QuestionCircleOutlined,
    OrderedListOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Menu, Flex, Modal, Image, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { useState, useRef, useEffect } from 'react';
import AddAgentMatter from '@renderer/components/add-agent-matter';


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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isAddAgentMatterModalOpen, setIsAddAgentMatterModalOpen] = useState(false);

    const [configOption, setConfigOption] = useState({});

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
            componentSize: settingValue.component_size
        })
    });

    window.electron.ipcRenderer.on('run-ctrl-m-callback', () => {
        setIsModalOpen(true);
    });

    window.electron.ipcRenderer.on('run-ctrl-n-callback', () => {
        setIsAddAgentMatterModalOpen(true);
    });

    useEffect(() => {
        window.electron.ipcRenderer.send('get-setting');
    }, []);

    // const fileData = window.file.readFile('src/renderer/src/assets/imgs/ctbaobao1.jpg');

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
        <ConfigProvider componentSize={configOption.componentSize}>
            <Flex className={styles['pages-index']}>
                <Flex vertical className={styles['pages-index-left']}>
                    <Flex vertical justify='center' align='center' className={styles['pages-index-header']} onClick={() => logoClick()}>
                        <div className={styles['pages-index-logo']}></div>
                        <div className={styles['pages-index-logo-text']}>迪达</div>
                    </Flex>
                    <Flex vertical justify='space-between' flex='1'>
                        <Menu
                            selectedKeys={[location.pathname]}
                            mode="inline"
                            inlineCollapsed={true}
                            items={topMenus}
                            onClick={menuClick}
                        />
                        <Menu
                            selectedKeys={[location.pathname]}
                            mode="inline"
                            inlineCollapsed={true}
                            items={bottomMenus}
                            onClick={menuClick}
                        />
                    </Flex>
                </Flex>
                <div className={styles['pages-index-outlet']}>
                    <Outlet />
                </div>
            </Flex>
            <Modal title="彩蛋" open={isModalOpen} footer={null} onCancel={() => {
                setIsModalOpen(false);
            }}>
                <Image.PreviewGroup
                    items={[
                        'http://101.132.70.183:10094/ctbaobao1.jpg',
                        'http://101.132.70.183:10094/ctbaobao2.jpg',
                        'http://101.132.70.183:10094/ctbaobao3.jpg',
                        'http://101.132.70.183:10094/ctbaobao5.jpeg'

                    ]}
                >
                    <Image
                        width='100%'
                        src='http://101.132.70.183:10094/ctbaobao5.jpeg'
                    />
                </Image.PreviewGroup>
            </Modal>
            <AddAgentMatter ref={AddAgentMatterRef} open={isAddAgentMatterModalOpen} onCancel={handleCancel} formProps={
                { onFinish }
            }></AddAgentMatter>
        </ConfigProvider>
    )
}

export default Index;