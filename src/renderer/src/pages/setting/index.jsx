import { Tabs, Typography, Table } from 'antd';
import { AppstoreOutlined, DesktopOutlined, InsertRowBelowOutlined, EllipsisOutlined } from '@ant-design/icons';

const ConventionalChild = () => {
    return (
        <>ConventionalChild</>
    )
};

const SystemChild = () => {
    return (
        <>SystemChild</>
    )
};

const ShortcutKeyChild = () => {
    const data = [
        {
            key: '1',
            name: '彩蛋',
            accelerator: 'CTRL+M'
        },
    ];

    const columns = [
        {
            title: '功能说明',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '快捷键',
            dataIndex: 'accelerator',
            key: 'accelerator',
        },
    ]

    return (
        <Table columns={columns} dataSource={data} />
    )
};

const OtherChild = () => {
    return (
        <>OtherChild</>
    )
};

const tabOptions = [
    {
        key: 'conventional',
        label: '常规',
        children: <ConventionalChild />,
        icon: <AppstoreOutlined />
    },
    {
        key: 'system',
        label: '系统',
        children: <SystemChild />,
        icon: <DesktopOutlined />
    },
    {
        key: 'shortcut-key',
        label: '快捷键',
        children: <ShortcutKeyChild />,
        icon: <InsertRowBelowOutlined />
    },
    {
        key: 'other',
        label: '其它',
        children: <OtherChild />,
        icon: <EllipsisOutlined />
    }
]

const Setting = () => {

    return (
        <>
            <Typography.Title level={2}>设置</Typography.Title >
            <Tabs
                defaultActiveKey="conventional"
                items={tabOptions}
            />
        </>
    )
}

export default Setting;