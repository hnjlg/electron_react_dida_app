import { useState } from 'react';
import { Flex, Tag, Typography, Alert } from 'antd';
import { JavaScriptOutlined, QqOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons'

const About = () => {

    const [versions] = useState(window.electron.process.versions);

    return (
        <>
            <Flex vertical>
                <Typography.Title level={3}>关于嘀咕待办</Typography.Title>
                React+Electron开发的跨端桌面端软件，用户日常高效管理任务的一种解决方案
                <Typography.Title level={4}>注意事项</Typography.Title>
                <Alert
                    message="注意"
                    description="软件使用的本地数据库，卸载软件则会丢失所有数据"
                    type="warning"
                    showIcon
                />
                <Typography.Title level={4}>版本信息</Typography.Title>
                <Flex wrap="wrap" gap={'10px'}>
                    <Tag icon={<JavaScriptOutlined />} color="#F5E130">
                        {versions.node}
                    </Tag>
                    <Tag color="rgb(159, 234, 249)">
                        Electron {versions.electron}
                    </Tag>
                    <Tag color="#3b5999">
                        V8 {versions.v8}
                    </Tag>
                </Flex>
                <Typography.Title level={4}>联系我们</Typography.Title>
                <Flex wrap="wrap" gap={'10px'}>
                    <Tag icon={<QqOutlined />}>
                        1765659336
                    </Tag>
                    <Tag icon={<WechatOutlined />} color="#2FA145">
                        NoAdvantages
                    </Tag>
                    <Tag icon={<GithubOutlined />} color="#232625">
                        <a href="https://github.com/1765659336/electron-app" target='_blank'>1765659336/electron-app</a>
                    </Tag>
                </Flex>
            </Flex>

        </>
    )
}

export default About;