import { Button, Space, Tabs, Popover, Modal, Input, Form, Row, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const WorkBench = () => {
    const [menuData, setMenuData] = useState([]);
    const [linkData, setLinkData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('menu');
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [form] = Form.useForm();
    const [activeKey] = useState('');

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
            setSelectedMenu(selectedMenu ?? menus[0])
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
            form.setFieldsValue({
                window_name: link.window_name,
                url: link.url,
            });
        } else if (type === 'add-link') {
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
        getLinks(selectedMenu.menu_key)
    };

    const handleFormSubmit = (values) => {


        if (modalType === 'add-menu' || modalType === 'edit-menu') {
            if (modalType === 'add-menu') {
                window.electron.ipcRenderer.send('add-menu', { ...values, menu_key: uuidv4() });
            }
            else if (modalType === 'edit-menu') {
                window.electron.ipcRenderer.send('edit-menu', { ...selectedMenu, ...values });
            }
        } else {
            values.menu_key = selectedMenu.menu_key;
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

    //活跃标签页
    const handleTabChange = (key) => {
        setSelectedMenu(menuData.find(i => i.menu_key === key));
        getLinks(key);
    };

    //删除菜单二次确认
    const confirm = (menu) => {
        window.electron.ipcRenderer.send('delete-menu', menu.id);
        setSelectedMenu(menuData[0]);
        ;
    };

    const cancel = (e) => {
    };

    return (
        <>
            <Row justify="end" style={{ marginBottom: '16px' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAddClick('add-menu')}>新增菜单</Button>
            </Row>
            <Tabs
                activeKey={selectedMenu?.menu_key}
                onChange={handleTabChange}
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
                                    <Popconfirm
                                        title="删除菜单"
                                        description="你确认删除菜单吗?"
                                        onConfirm={() => confirm(menu)}
                                        onCancel={cancel}
                                        okText="是"
                                        cancelText="否">
                                        <Button
                                            icon={<DeleteOutlined />}
                                            size="small"
                                            style={{ marginLeft: 4 }}

                                        /></Popconfirm>
                                </div>
                            </div >
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
                            <Button icon={<PlusOutlined />} onClick={() => handleAddClick('add-link', null, menu)}>新增链接</Button>
                        </Space>
                    })),
                ]}
            />
            <Modal Modal
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
            </Modal >
        </>
    );
};

export default WorkBench;
