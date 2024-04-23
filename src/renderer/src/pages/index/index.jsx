import { Outlet } from 'react-router-dom';
import {
    AppstoreOutlined,
    ContainerOutlined,
    EditOutlined,
    MailOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Menu, Flex } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './style.module.scss'


// 菜单数据
const items = [
    {
        key: '/index/agent-matters',
        icon: <EditOutlined />,
        label: '代办事项',
    },
    {
        key: '/index/about',
        icon: <QuestionCircleOutlined />,
        label: '关于',
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
            <div className={styles['pages-index-left']}>
                <Flex vertical justify='center' align='center' className={styles['pages-index-header']} onClick={() => logoClick()}>
                    <div className={styles['pages-index-logo']}></div>
                    <div className={styles['pages-index-logo-text']}>嘀咕待办</div>
                </Flex>
                <Menu
                    defaultSelectedKeys={location.pathname}
                    mode="inline"
                    inlineCollapsed={true}
                    items={items}
                    onClick={menuClick}
                />
            </div>
            <div className={styles['pages-index-outlet']}>
                <Outlet />
            </div>
        </Flex>
    )
}

export default Index;