import { Outlet } from 'react-router-dom';
import {
    EditOutlined,
    QuestionCircleOutlined,
    OrderedListOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Menu, Flex } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './style.module.scss'


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

    // 点击菜单跳转路由
    const menuClick = (item) => {
        navigate(item.key);
    }

    const logoClick = () => {
        navigate('/index/home');
    }

    return (
        <Flex className={styles['pages-index']}>
            <Flex vertical className={styles['pages-index-left']}>
                <Flex vertical justify='center' align='center' className={styles['pages-index-header']} onClick={() => logoClick()}>
                    <div className={styles['pages-index-logo']}></div>
                    <div className={styles['pages-index-logo-text']}>嘀咕待办</div>
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
    )
}

export default Index;