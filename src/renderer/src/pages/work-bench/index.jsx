import { Button, Flex, Space, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const WorkBench = () => {

    const mockMenuData = [
        {
            title: '生活',
            key: 'life'
        },
        {
            title: '工作',
            key: 'job'
        },
    ];

    const mockLinkData = [
        {
            menuKey: 'life',
            url: 'https://world.taobao.com/',
            windowName: '淘宝'
        },
        {
            menuKey: 'life',
            url: 'https://www.jd.com/',
            windowName: '京东'
        },
        {
            menuKey: 'job',
            url: 'https://www.zhipin.com/',
            windowName: 'BOSS直聘'
        },
    ]
    return (
        <>
            <Flex justify='flex-end'>
                <Button type="primary" icon={<PlusOutlined />}>新增</Button>
            </Flex>
            <Tabs
                tabPosition='right'
                items={[
                    ...mockMenuData.map(menu => {
                        return {
                            label: menu.title,
                            key: menu.key,
                            children: <Space size={[8, 16]} wrap>
                                {mockLinkData.filter(link => link.menuKey === menu.key).map(link => {
                                    return <Button onClick={() => window.electron.ipcRenderer.send('open-child-window', {
                                        windowName: link.windowName,
                                        url: link.url,
                                    })}>{link.windowName}</Button>
                                })}
                                <Button icon={<PlusOutlined />}>新增</Button>
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
        </>
    )
};

export default WorkBench;