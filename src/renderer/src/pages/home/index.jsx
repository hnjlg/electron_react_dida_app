import { Card, Statistic, Row, Col, Timeline, Space, Badge, Divider } from 'antd';
import {
    FileDoneOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { AgentMatterState } from '@renderer/globalConfig';

console.log(AgentMatterState, 'AgentMatterState');

const formatter = (value) => <CountUp end={value} separator="," />;

const Home = () => {
    const [DoneNum, setDoneNum] = useState(0);

    const [waitDoneNum, setWaitDoneNum] = useState(0);

    const [timelineData, setTimelineData] = useState([]);

    window.electron.ipcRenderer.on('get-agent-matters-callback', (event, agentMatters, options) => {
        switch (options.state) {
            case AgentMatterState['已完成']:
                {
                    setDoneNum(agentMatters.length);
                }
                break;
            case AgentMatterState['待完成']:
                {
                    setWaitDoneNum(agentMatters.length);
                }
                break;
        }
    });

    window.electron.ipcRenderer.on('get-operate-logs-callback', (event, operateLogs) => {
        setTimelineData(operateLogs.map(item => {
            return {
                children: item.description + ' ' + item.create_time
            }
        }))
    })

    useEffect(() => {
        window.electron.ipcRenderer.send('get-agent-matters', {
            state: AgentMatterState['已完成']
        }, {
            state: AgentMatterState['已完成']
        });
        window.electron.ipcRenderer.send('get-agent-matters', {
            state: AgentMatterState['待完成']
        }, {
            state: AgentMatterState['待完成']
        });
        window.electron.ipcRenderer.send('get-operate-logs');
    }, []);


    return (
        <>
            <Space
                direction="vertical"
                style={{
                    display: 'flex',
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Badge.Ribbon text="查看详情" style={{ 'cursor': 'pointer' }}>
                            <Card bordered={false}>
                                <Statistic
                                    title="待办事项"
                                    value={waitDoneNum}
                                    precision={0}
                                    valueStyle={{
                                        color: '#cf1322',
                                    }}
                                    prefix={<FileUnknownOutlined />}
                                    suffix="个"
                                />
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                    <Col span={12}>
                        <Badge.Ribbon text="查看详情" style={{ 'cursor': 'pointer' }}>
                            <Card bordered={false}>
                                <Statistic
                                    title="完成事项"
                                    value={DoneNum}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<FileDoneOutlined />}
                                    formatter={formatter}
                                    suffix="个"
                                />
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                </Row>
                <Divider plain>操作记录</Divider>
                <Timeline
                    mode="alternate"
                    items={timelineData}
                />
            </Space >
        </>
    )
}

export default Home;