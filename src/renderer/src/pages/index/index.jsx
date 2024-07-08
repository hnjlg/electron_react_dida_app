import { Outlet } from 'react-router-dom';
import {
    EditOutlined,
    QuestionCircleOutlined,
    OrderedListOutlined,
    SettingOutlined,
    LineOutlined,
    FullscreenOutlined,
    CloseOutlined,
    SkinOutlined,
    HourglassOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { Menu, Flex, Modal, Image, ConfigProvider, Space, Divider, Button, Radio } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { useState, useRef, useEffect } from 'react';
import AddAgentMatter from '@renderer/components/add-agent-matter';
import { CloseSystemType } from '@renderer/globalConfig';
import { useThemeStore, lightTheme, darkTheme } from '@renderer/store/theme';

const Header = () => {

    const [settingConfig, setSettingConfig] = useState({});

    const [isRemember, setIsRemember] = useState(false);

    const theme = useThemeStore(state => state.theme);

    const themeValue = useThemeStore(state => state.themeValue);

    const setTheme = useThemeStore(state => state.setTheme);

    // 切换主题逻辑
    const toggleTheme = () => {
        setTheme(themeValue === 'lightTheme' ? 'darkTheme' : 'lightTheme');
    };

    window.electron.ipcRenderer.on('get-setting-callback', (event, settingValue) => {
        setSettingConfig(settingValue);
    });

    const getSetting = () => window.electron.ipcRenderer.send('get-setting');

    const windowMin = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            window.electron.ipcRenderer.send('window-min');
        }, 200)
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
    }, [])

    return (
        <ConfigProvider theme={{
            "token": theme,
        }}>
            <Flex justify='space-between' className={styles['pages-index-header']} style={{
                'backgroundColor': theme.colorBgBase
            }} >
                <div className={styles['pages-index-header-drag']} style={{ 'backgroundColor': theme.colorBgBase }}></div>
                <Space>
                    <Button onClick={() => toggleTheme()}>
                        <SkinOutlined />
                    </Button>
                    <Divider type="vertical" style={{ borderInlineStart: '1px solid #000' }} />
                    <Button onClick={() => windowMin()}><LineOutlined /></Button>
                    <Button onClick={() => window.electron.ipcRenderer.send('window-max')}><FullscreenOutlined /></Button>
                    <Button onClick={() => closeWindow()}><CloseOutlined /></Button>
                </Space>
            </Flex>

            <Modal title="提示" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[
                <Button key='windowMin' onClick={() => {
                    if (isRemember) {
                        window.electron.ipcRenderer.send('edit-setting', {
                            id: settingConfig.id,
                            close_system_type: CloseSystemType['最小化到系统托盘'],
                        });
                        getSetting();
                    };
                    windowMin();
                }}>
                    最小化到系统托盘
                </Button>,
                <Button key='winClose' type="primary" onClick={() => {
                    if (isRemember) {
                        window.electron.ipcRenderer.send('edit-setting', {
                            id: settingConfig.id,
                            close_system_type: CloseSystemType['退出系统'],
                        });
                        getSetting();
                    };
                    winClose();
                }}>
                    退出系统
                </Button >
            ]}>
                <Radio checked={isRemember} onClick={() => {
                    setIsRemember(!isRemember);
                }}>记住选择，下次不再提示</Radio>
            </Modal >
        </ConfigProvider>
    )
}


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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isAddAgentMatterModalOpen, setIsAddAgentMatterModalOpen] = useState(false);

    const [configOption, setConfigOption] = useState({});

    const theme = useThemeStore(state => state.theme);

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
        <ConfigProvider componentSize={configOption.componentSize} theme={{
            "token": theme,
        }}>
            <Header></Header>
            <Flex className={styles['pages-index']} style={{ backgroundColor: theme.colorTextBase }}>
                <Flex vertical className={styles['pages-index-left']} style={{
                    'backgroundColor': theme.colorBgBase,
                    'color': theme.colorTextBase
                }}>
                    <Flex vertical justify='center' align='center' className={styles['pages-index-left-header']} onClick={() => logoClick()}>
                        <div className={styles['pages-index-logo']}></div>
                        <div className={styles['pages-index-logo-text']}>迪达</div>
                    </Flex>
                    <Flex vertical justify='space-between' flex='1' >
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
                <div className={styles['pages-index-outlet']} style={{ backgroundColor: theme.colorBgBase }} >
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