import { Tabs, Typography, Table, Radio, Tag } from 'antd';
import { AppstoreOutlined, DesktopOutlined, InsertRowBelowOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { ComponentSize, CloseSystemType } from '@renderer/globalConfig';

const { Title } = Typography;

const ConventionalChild = () => {
    const [settingConfig, setSettingConfig] = useState({
        component_size: ComponentSize['小']
    });

    const onComponentSizeChange = (e) => {
        window.electron.ipcRenderer.send('edit-setting', {
            id: settingConfig.id,
            component_size: e.target.value,
        });
        getSetting();
    };

    window.electron.ipcRenderer.on('get-setting-callback', (event, settingValue) => {
        setSettingConfig(settingValue);
    });

    const getSetting = () => window.electron.ipcRenderer.send('get-setting');

    useEffect(() => {
        getSetting();
    }, []);

    return (
        <>
            <Title level={5}>布局</Title>
            <Radio.Group onChange={onComponentSizeChange} value={settingConfig.component_size}>
                <Radio value={ComponentSize['小']}><div className={styles['compact-layout']}><Tag color={settingConfig.component_size === ComponentSize['小'] ? '#108ee9' : ''}>紧凑</Tag></div></Radio>
                <Radio value={ComponentSize['中']}><div className={styles['appropriate-layout']}><Tag color={settingConfig.component_size === ComponentSize['中'] ? '#108ee9' : ''}>适中</Tag></div></Radio>
                <Radio value={ComponentSize['大']}><div className={styles['loose-layout']}><Tag color={settingConfig.component_size === ComponentSize['大'] ? '#108ee9' : ''}>宽松</Tag></div></Radio>
            </Radio.Group>
        </>
    )
};

const SystemChild = () => {

    const [settingConfig, setSettingConfig] = useState({
        close_system_type: CloseSystemType['系统提示']
    });

    window.electron.ipcRenderer.on('get-setting-callback', (event, settingValue) => {
        setSettingConfig(settingValue);
    });

    const getSetting = () => window.electron.ipcRenderer.send('get-setting');

    useEffect(() => {
        getSetting();
    }, [])


    const onCloseSystemTypeChange = (value) => {
        window.electron.ipcRenderer.send('edit-setting', {
            id: settingConfig.id,
            close_system_type: value,
        });
        getSetting();
    };

    return (
        <>
            <Title level={5}>关闭主面板</Title>
            <Radio.Group onChange={(e) => onCloseSystemTypeChange(e.target.value)} value={settingConfig.close_system_type}>
                {
                    Object.keys(CloseSystemType).map(item => <Radio key={item} value={CloseSystemType[item]}>{item}</Radio>)
                }
            </Radio.Group>
        </>
    )
};

const data = [
    {
        key: '1',
        name: '快捷新增事项',
        accelerator: 'CTRL+N'
    },
    {
        key: '999',
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
];

const ShortcutKeyChild = () => {

    return (
        <Table columns={columns} dataSource={data} pagination={{ position: ['none'] }} />
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
            <Title level={2}>设置</Title >
            <Tabs
                defaultActiveKey="conventional"
                items={tabOptions}
            />
        </>
    )
}

export default Setting;