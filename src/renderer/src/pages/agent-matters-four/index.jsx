
import { useEffect, useRef, useState } from 'react';
import { Flex, Tag, Card, Input, Select, DatePicker, Radio, Typography, message } from 'antd';
import { AlertOutlined, TagsOutlined, LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import { FourQuadrantValues, AgentMatterState } from '@renderer/globalConfig';
import dayjs from 'dayjs';
import AddAgentMatter from '@renderer/components/add-agent-matter';

const { Title } = Typography;

// 四象限状态Options
const fourQuadrantOptions = Object.keys(FourQuadrantValues).map(key => {
    switch (key) {
        case '重要紧急':
            return {
                icon: <AlertOutlined />,
                color: '#cd201f',
                label: '重要紧急',
                value: FourQuadrantValues[key]
            }
        case '不重要紧急':
            return {
                icon: <AlertOutlined />,
                color: '#FF5500',
                label: '不重要紧急',
                value: FourQuadrantValues[key]
            }
        case '重要不紧急':
            return {
                icon: <AlertOutlined />,
                color: '#3b5999',
                label: '重要不紧急',
                value: FourQuadrantValues[key]
            }
        case '不重要不紧急':
            return {
                icon: <AlertOutlined />,
                color: '#55acee',
                label: '不重要不紧急',
                value: FourQuadrantValues[key]
            }
    }
})

const AgentMatters = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [agentMatters, setAgentMatters] = useState([]);

    const [fourQuadrantValue, setFourQuadrantValue] = useState(FourQuadrantValues.重要紧急);

    const AddAgentMatterRef = useRef(null);

    const [messageApi, contextHolder] = message.useMessage();

    window.electron.ipcRenderer.on('get-agent-matters-callback', (event, agentMatters) => {
        setAgentMatters(agentMatters);
    });

    useEffect(() => {
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        });
    }, []);

    // 获取事项数据
    const getAgentMatters = (queryParams) => window.electron.ipcRenderer.send('get-agent-matters', queryParams);

    const editAgentMatter = (agentMatter) => window.electron.ipcRenderer.send('edit-agent-matter', agentMatter);

    const handleScroll = (step) => {
        let index = fourQuadrantOptions.findIndex(item => item.value === fourQuadrantValue);
        const newFourQuadrantValue = fourQuadrantOptions[index < 3 ? index + step : 0].value
        setFourQuadrantValue(fourQuadrantOptions[index < 3 ? index + step : 0].value);
        getAgentMatters({
            'four_quadrant_value': newFourQuadrantValue
        })
    }

    // 打开新增弹窗
    const showModal = () => {
        setIsModalOpen(true);
    };

    // 新增弹窗关闭回调
    const handleCancel = () => {
        setIsModalOpen(false);
        // 重置表单
        AddAgentMatterRef.current.formRef.current.resetFields();
    };

    // 新增表单提交
    const onFinish = (value) => {
        value.begin_time = value.time[0].format('YYYY/MM/DD hh:mm:ss');
        value.end_time = value.time[1].format('YYYY/MM/DD hh:mm:ss');
        delete value.time;
        window.electron.ipcRenderer.send('add-agent-matter', value);
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        })
        handleCancel();
    };

    const titleHandleChange = (item, value) => {
        if (value.length > 60) {
            messageApi.open({
                type: 'warning',
                content: '标题不能超过60字',
            });
            return;
        }
        editAgentMatter({
            title: value,
            id: item.id
        });
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        })
    }

    // 事项状态改变事件
    const stateHandleChange = (item, value) => {
        editAgentMatter({
            state: value,
            id: item.id
        });
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        })
    };

    const timeHandleChange = (item, date, dateString) => {
        editAgentMatter({
            begin_time: dateString[0],
            end_time: dateString[1],
            id: item.id
        });
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        })
    };

    const fourQuadrantValueHandleChange = (item, text) => {
        editAgentMatter({
            four_quadrant_value: text,
            id: item.id
        });
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        })
    }

    const descriptionHandleChange = (item, text) => {
        editAgentMatter({
            description: text,
            id: item.id
        });
        getAgentMatters({
            'four_quadrant_value': fourQuadrantValue
        })
    }

    // 标签动态class
    const emergencyDegreeFourQuadrantClass = (fourQuadrantItem) =>
        styles['emergency-degree-four-quadrant-item'] + ' ' + (fourQuadrantItem.value === fourQuadrantValue ? styles['emergency-degree-four-quadrant-item-select'] : '');


    return (
        <>
            {contextHolder}
            <Flex vertical className={styles['agent-matters']}>
                <Flex align='center' className={styles['emergency-degree']}>
                    <div className={styles['emergency-degree-title']}><TagsOutlined />四象限</div>
                    <Flex>
                        {
                            fourQuadrantOptions.map(fourQuadrantItem =>
                                <Tag key={fourQuadrantItem.value} icon={fourQuadrantItem.icon} color={fourQuadrantItem.color}
                                    className={emergencyDegreeFourQuadrantClass(fourQuadrantItem)} onClick={() => {
                                        getAgentMatters({
                                            ['four_quadrant_value']: fourQuadrantItem.value
                                        })
                                        setFourQuadrantValue(fourQuadrantItem.value)
                                    }}>
                                    {fourQuadrantItem.label}
                                </Tag>
                            )
                        }
                    </Flex>
                </Flex>
                <Flex gap='10px' wrap='wrap' className={styles['emergency-degree-list']}>
                    <div className={styles['add-emergency-degree']} onClick={showModal}>
                        <PlusOutlined />
                        新增代办
                    </div>
                    {
                        agentMatters.map(item =>
                            <Card
                                className={styles['emergency-degree-list-item']}
                                title={item.title}
                                bordered={false}
                                key={item.id}
                                extra={<Select
                                    defaultValue={item.state}
                                    style={{ width: 80 }}
                                    onChange={(value) => stateHandleChange(item, value)}
                                    options={Object.keys(AgentMatterState).map(key => {
                                        return {
                                            value: AgentMatterState[key],
                                            label: key
                                        }
                                    })}
                                />}
                            >
                                <Title level={5}>标题</Title>
                                <Input
                                    value={item.title}
                                    onChange={(e) => titleHandleChange(item, e.target.value)}
                                />
                                <Title level={5}>周期</Title>
                                <DatePicker.RangePicker defaultValue={[dayjs(item.begin_time), dayjs(item.end_time)]} showTime onChange={(data, dataString) => timeHandleChange(item, data, dataString)} />
                                <Title level={5}>程度</Title>
                                <Radio.Group onChange={(e) => fourQuadrantValueHandleChange(item, e.target.value)} value={item.four_quadrant_value}>
                                    {
                                        Object.keys(FourQuadrantValues).map(key => <Radio key={key} value={FourQuadrantValues[key]}>{key}</Radio>)
                                    }
                                </Radio.Group>
                                <Title level={5}>描述</Title>
                                <Input.TextArea
                                    value={item.description}
                                    onChange={(e) => descriptionHandleChange(item, e.target.value)}
                                    autoSize={{
                                        minRows: 4,
                                        maxRows: 8,
                                    }}
                                />
                            </Card>
                        )
                    }
                </Flex>
                <div className={styles['emergency-degree-list-left']} onClick={() => handleScroll(-1)}>
                    <LeftOutlined />
                </div>
                <div className={styles['emergency-degree-list-right']} onClick={() => handleScroll(1)}>
                    <RightOutlined />
                </div>
            </Flex >
            <AddAgentMatter ref={AddAgentMatterRef} open={isModalOpen} onCancel={handleCancel} formProps={
                { onFinish }
            }></AddAgentMatter>
        </>
    )
}

export default AgentMatters;