/* import { Button, Space, Tabs, Popover, Modal, Input, Form, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const WorkBench = () => {
    const [menuData, setMenuData] = useState([
        { title: '生活', key: 'life' },
        { title: '工作', key: 'job' },
    ]);

    const [linkData, setLinkData] = useState([
        { menuKey: 'life', url: 'https://world.taobao.com/', windowName: '淘宝' },
        { menuKey: 'life', url: 'https://www.jd.com/', windowName: '京东' },
        { menuKey: 'job', url: 'https://www.zhipin.com/', windowName: 'BOSS直聘' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('menu'); // 'menu' or 'link'
    const [selectedMenuKey, setSelectedMenuKey] = useState(null);
    const [form] = Form.useForm();
    //新增
    const handleAddClick = (type, menuKey = null) => {
        setModalType(type);
        setSelectedMenuKey(menuKey);
        setIsModalVisible(true);
    };
    //删除
    const handleDeleteLink = (url) => {
        setLinkData(linkData.filter(link => link.url !== url));
    };
    //提交
    const handleFormSubmit = (values) => {
        if (modalType === 'menu') {
            setMenuData([...menuData, { title: values.title, key: values.key }]);
        } else {
            setLinkData([...linkData, { menuKey: selectedMenuKey, url: values.url, windowName: values.windowName }]);
        }
        setIsModalVisible(false);
        form.resetFields();
    };
    return (
        <>
            <Row justify="end" style={{ marginBottom: '16px' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAddClick('menu')}>新增菜单</Button>
            </Row>
            <Tabs
                tabPosition='right'
                items={[
                    ...menuData.map(menu => {
                        return {
                            label: menu.title,
                            key: menu.key,
                            children: <Space size={[8, 16]} wrap>
                                {linkData.filter(link => link.menuKey === menu.key).map(link => {
                                    return <Popover
                                        content={<Space>
                                            <Button icon={<EditOutlined />} >编辑</Button>
                                            <Button icon={<DeleteOutlined />} onClick={() => handleDeleteLink(link.url)} > 删除</Button>
                                        </Space>}
                                        title="操作"
                                        trigger="hover"
                                        key={link.url}
                                    >
                                        <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                            windowName: link.windowName,
                                            url: link.url,
                                        })}>{link.windowName}</Button>
                                    </Popover>
                                })}
                                <Button icon={<PlusOutlined />} onClick={() => handleAddClick('link', menu.key)}>新增链接</Button>
                            </Space>
                        }
                    }),
                    {
                        label: '项目技术文档',
                        key: 'docs',
                        children: <Space size={[8, 16]} wrap>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'electron-vite',
                                url: 'https://electron-vite.org/'
                            })}>electron-vite</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'electron',
                                url: 'https://www.electronjs.org/'
                            })}>electron</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'react',
                                url: 'https://react.dev/'
                            })}>react</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'antd',
                                url: 'https://ant-design.antgroup.com/index-cn'
                            })}>antd</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'sqlite3',
                                url: 'https://github.com/TryGhost/node-sqlite3'
                            })}>sqlite3</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'sass',
                                url: 'https://sass-lang.com/'
                            })}>sass</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'react-router-dom',
                                url: 'https://reactrouter.com/en/main'
                            })}>react-router-dom</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'lodash',
                                url: 'https://github.com/lodash/lodash'
                            })}>lodash</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'day.js',
                                url: 'https://dayjs.gitee.io/zh-CN/'
                            })}>day.js</Button>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'react-countdown',
                                url: 'https://github.com/ndresx/react-countdown'
                            })}>react-countdown</Button>
                        </Space>,
                    },
                    {
                        label: '拓展了解',
                        key: 'other',
                        children: <Space size={[8, 16]} wrap>
                            <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                windowName: 'YulangUI',
                                url: 'http://101.132.70.183:10094'
                            })}>YulangUI</Button>
                        </Space>,
                    }
                ]
                }
            />
            <Modal
                title={modalType === 'menu' ? "新增菜单" : "新增链接"}
                visible={isModalVisible}
                cancelText="取消"
                okText="提交"
                onCancel={() => setIsModalVisible(false)}
                onOk={form.submit}
            >
                <Form form={form} onFinish={handleFormSubmit}>
                    {modalType === 'menu' ? (
                        <>
                            <Form.Item name="title" label="菜单标题" rules={[{ required: true, message: '请输入菜单标题' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="key" label="菜单标识" rules={[{ required: true, message: '请输入菜单标识' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item name="windowName" label="链接名称" rules={[{ required: true, message: '请输入链接名称' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="url" label="链接地址" rules={[{ required: true, message: '请输入链接地址' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </>
    )
};

export default WorkBench; */
import { Button, Space, Tabs, Popover, Modal, Input, Form, Row, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';

const WorkBench = () => {
    const [menuData, setMenuData] = useState([]);
    const [linkData, setLinkData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('menu');
    const [selectedMenuKey, setSelectedMenuKey] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    //活跃标签页
    const [activeKey, setActiveKey] = useState(null);

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = () => {
        window.electron.ipcRenderer.send('get-menus');
    };

    const getLinks = (menuKey) => {
        window.electron.ipcRenderer.send('get-links', menuKey);
    };

    window.electron.ipcRenderer.on('get-menus-callback', (event, menus) => {
        setMenuData(menus);
        if (menus.length > 0) {
            setActiveKey(menus[0].menu_key);
            getLinks(menus[0].menu_key);
        }
    });

    window.electron.ipcRenderer.on('get-links-callback', (event, links) => {
        setLinkData(links);
    });

    const handleAddClick = (type, link = null, menu = null) => {
        setModalType(type);
        setIsModalVisible(true);

        if (type === 'edit-link') {
            setSelectedLink(link);
            setSelectedMenuKey(link.menu_key);
            form.setFieldsValue({
                window_name: link.window_name,
                url: link.url,
            });
        } else if (type === 'add-link') {
            setSelectedMenuKey(menu ? menu.menu_key : selectedMenuKey);
            form.resetFields();
        } else if (type === 'edit-menu') {
            setSelectedMenu(menu);
            form.setFieldsValue({
                menu_name: menu.menu_name,
                menu_key: menu.menu_key,
            });
        } else if (type === 'add-menu') {
            form.resetFields();
        }
    };
    const handleDeleteLink = (id) => {
        window.electron.ipcRenderer.send('delete-link', id);
    };

    const handleFormSubmit = (values) => {
        if (modalType === 'add-menu' || modalType === 'edit-menu') {
            if (modalType === 'edit-menu') {
                values.id = selectedMenu.id;
                window.electron.ipcRenderer.send('edit-menu', values);
            } else {
                window.electron.ipcRenderer.send('add-menu', values);
            }
        } else {
            values.menu_key = selectedMenuKey;
            if (modalType === 'edit-link') {
                values.id = selectedLink.id;
                window.electron.ipcRenderer.send('edit-link', values);
            } else {
                window.electron.ipcRenderer.send('add-link', values);
            }
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    const titleHandleChange = (item, value) => {
        if (value.length > 60) {
            messageApi.open({
                type: 'warning',
                content: '标题不能超过60字',
            });
            return;
        }
        window.electron.ipcRenderer.send('edit-link', { id: item.id, window_name: value });
    };

    const urlHandleChange = (item, value) => {
        window.electron.ipcRenderer.send('edit-link', { id: item.id, url: value });
    };

    return (
        <>
            {contextHolder}
            <Row justify="end" style={{ marginBottom: '16px' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAddClick('add-menu')}>新增菜单</Button>
            </Row>
            <Tabs

                tabPosition='right'
                items={[
                    ...menuData.map(menu => ({
                        label: (
                            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', width: '100%' }}>
                                <span style={{ flexGrow: 1, width: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{menu.menu_name}</span>
                                <div style={{ flexShrink: 0 }}>
                                    <Button
                                        icon={<EditOutlined />}
                                        size="small"
                                        style={{ marginLeft: 8 }}
                                        onClick={() => handleAddClick('edit-menu', null, menu)}
                                    />
                                    <Button
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        style={{ marginLeft: 4 }}
                                        onClick={() => window.electron.ipcRenderer.send('delete-menu', menu.id)}
                                    />
                                </div>
                            </div>
                        ),
                        key: menu.menu_key,
                        children: <Space size={[8, 16]} wrap>
                            {linkData.filter(link => link.menu_key === menu.menu_key).map(link => (
                                <Popover
                                    content={<Space>
                                        <Button icon={<EditOutlined />} onClick={() => handleAddClick('edit-link', link)}>编辑</Button>
                                        <Button icon={<DeleteOutlined />} onClick={() => handleDeleteLink(link.id)}>删除</Button>
                                    </Space>}
                                    title="操作"
                                    trigger="hover"
                                    key={link.id}
                                >
                                    <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                        windowName: link.window_name,
                                        url: link.url,
                                    })}>{link.window_name}</Button>
                                </Popover>
                            ))}
                            <Button icon={<PlusOutlined />} onClick={() => handleAddClick('add-link', menu.menu_key)}>新增链接</Button>
                        </Space>
                    })),
                    /*    {
                           label: '项目技术文档',
                           key: 'docs',
                           children: <Space size={[8, 16]} wrap>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'electron-vite',
                                   url: 'https://electron-vite.org/'
                               })}>electron-vite</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'electron',
                                   url: 'https://www.electronjs.org/'
                               })}>electron</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'react',
                                   url: 'https://react.dev/'
                               })}>react</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'antd',
                                   url: 'https://ant-design.antgroup.com/index-cn'
                               })}>antd</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'sqlite3',
                                   url: 'https://github.com/TryGhost/node-sqlite3'
                               })}>sqlite3</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'sass',
                                   url: 'https://sass-lang.com/'
                               })}>sass</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'react-router-dom',
                                   url: 'https://reactrouter.com/en/main'
                               })}>react-router-dom</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'lodash',
                                   url: 'https://github.com/lodash/lodash'
                               })}>lodash</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'day.js',
                                   url: 'https://dayjs.gitee.io/zh-CN/'
                               })}>day.js</Button>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'react-countdown',
                                   url: 'https://github.com/ndresx/react-countdown'
                               })}>react-countdown</Button>
                           </Space>,
                       },
                       {
                           label: '拓展了解',
                           key: 'other',
                           children: <Space size={[8, 16]} wrap>
                               <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                   windowName: 'YulangUI',
                                   url: 'http://101.132.70.183:10094'
                               })}>YulangUI</Button>
                           </Space>,
                       } */
                ]}
                onChange={getLinks}
            />
            <Modal
                title={
                    modalType === 'add-menu' ? "新增菜单"
                        : modalType === 'edit-menu' ? "编辑菜单"
                            : modalType === 'edit-link' ? "编辑链接"
                                : "新增链接"
                }
                visible={isModalVisible}
                cancelText="取消"
                okText="确定"
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleFormSubmit}>
                    {modalType === 'add-menu' || modalType === 'edit-menu' ? (
                        <>
                            <Form.Item label="菜单名" name="menu_name" rules={[{ required: true, message: '请输入菜单名' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="菜单键" name="menu_key" rules={[{ required: true, message: '请输入菜单键' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item label="窗口名" name="window_name" rules={[{ required: true, message: '请输入窗口名' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="URL" name="url" rules={[{ required: true, message: '请输入URL' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default WorkBench;
