
import { useEffect, useState } from 'react';
import { Flex, Tag, Card, Modal, Form, Button, Input } from 'antd';
import { AlertOutlined, TagsOutlined, LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import { fourQuadrantValues } from '@renderer/globalConfig';

// 四象限状态Options
const fourQuadrantOptions = Object.keys(fourQuadrantValues).map(key => {
    switch (key) {
        case '重要紧急':
            return {
                icon: <AlertOutlined />,
                color: '#cd201f',
                label: '重要紧急',
                value: fourQuadrantValues[key]
            }
        case '不重要紧急':
            return {
                icon: <AlertOutlined />,
                color: '#FF5500',
                label: '不重要紧急',
                value: fourQuadrantValues[key]
            }
        case '重要不紧急':
            return {
                icon: <AlertOutlined />,
                color: '#3b5999',
                label: '重要不紧急',
                value: fourQuadrantValues[key]
            }
        case '不重要不紧急':
            return {
                icon: <AlertOutlined />,
                color: '#55acee',
                label: '不重要不紧急',
                value: fourQuadrantValues[key]
            }
    }
})

const AgentMatters = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [agentMatters, setAgentMatters] = useState([]);

    useEffect(() => {
        window.electron.ipcRenderer.on('get-agent-matters-callback', (event, agentMatters) => {
            setAgentMatters(agentMatters);
        })

        getAgentMatters({
            'four_quadrant_value': fourQuadrantValues.重要紧急
        });
    }, []);

    const getAgentMatters = (queryParams) => window.electron.ipcRenderer.send('get-agent-matters', queryParams)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Flex vertical className={styles['agent-matters']}>
                <Flex align='center' className={styles['emergency-degree']}>
                    <div className={styles['emergency-degree-title']}><TagsOutlined />四象限</div>
                    <Flex>
                        {
                            fourQuadrantOptions.map(fourQuadrantItem =>
                                <Tag key={fourQuadrantItem.value} icon={fourQuadrantItem.icon} color={fourQuadrantItem.color} className={styles['emergency-degree-four-quadrant-item']} onClick={() => {
                                    getAgentMatters({
                                        ['four_quadrant_value']: fourQuadrantItem.value
                                    })
                                }}>
                                    {fourQuadrantItem.label}
                                </Tag>
                            )
                        }
                    </Flex>
                </Flex>
                <Flex gap='10px' wrap='wrap' className={styles['emergency-degree-list']}>
                    {
                        agentMatters.map(item =>
                            <Card
                                className={styles['emergency-degree-list-item']}
                                title={item.title}
                                bordered={false}
                                key={item.id}
                            >
                                {item.description}
                            </Card>)
                    }

                    <div className={styles['add-emergency-degree']} onClick={showModal}>
                        <PlusOutlined />
                        新增代办
                    </div>
                </Flex>
                <div className={styles['emergency-degree-list-left']} onClick={() => handleScroll(0)}>
                    <LeftOutlined />
                </div>
                <div className={styles['emergency-degree-list-right']} onClick={() => handleScroll(10)}>
                    <RightOutlined />
                </div>
            </Flex >
            <Modal title="新增代办事项" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AgentMatters;