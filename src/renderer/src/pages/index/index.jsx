import { Outlet } from 'react-router-dom';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './style.module.scss'


// 菜单数据
const items = [
    {
        key: '/index/about',
        icon: <QuestionCircleOutlined />,
        label: '关于',
    },
    {
        key: 'menu2',
        icon: <DesktopOutlined />,
        children: [],
        label: 'menu2',
    },
    {
        key: 'menu3',
        icon: <ContainerOutlined />,
        children: [],
        label: 'menu3',
    },
    {
        key: 'menu4',
        icon: <MailOutlined />,
        children: [],
        label: 'menu4',
    },
    {
        key: 'menu5',
        icon: <AppstoreOutlined />,
        children: [],
        label: 'menu5',
    },
];

const Index = () => {

    const location = useLocation();

    const navigate = useNavigate();

    // 点击菜单跳转路由
    const menuClick = (item) => {
        navigate(item.key);
    }

    return (
        <div className={styles['pages-index']}>
            <Menu
                defaultSelectedKeys={location.pathname}
                mode="inline"
                inlineCollapsed={true}
                items={items}
                onClick={menuClick}
            />
            <div className={styles['pages-index-outlet']}>
                <Outlet />
            </div>
        </div>
    )
}

export default Index;