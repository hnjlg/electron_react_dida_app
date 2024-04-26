import { Card, Statistic, Row, Col, Timeline, Space, Badge, Divider, Button } from 'antd';
import {
    FileDoneOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { AgentMatterState } from '@renderer/globalConfig';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator="," />;

const Home = () => {

    const navigate = useNavigate();

    const [DoneNum, setDoneNum] = useState(0);

    const [waitDoneNum, setWaitDoneNum] = useState(0);

    const [closeNum, setCloseNum] = useState(0);

    const [timelineData, setTimelineData] = useState([]);

    const [isHasMoreLog, setIsHasMoreLog] = useState(true);

    const [operateLogQueryParams, setOperateLogQueryParams] = useState({
        pageIndex: 1,
        pageSize: 10
    });

    const getOperateLog = (queryParams) => window.electron.ipcRenderer.send('get-operate-logs', queryParams);

    const getMore = () => {
        const newPageIndex = operateLogQueryParams.pageIndex + 1;
        setOperateLogQueryParams({
            ...operateLogQueryParams,
            pageIndex: newPageIndex
        })
        getOperateLog({
            ...operateLogQueryParams,
            pageIndex: newPageIndex
        });
    };

    const showDetail = (state) => {
        console.log(state);
        navigate(`/index/agent-matters-list?state=${state}`);
    };

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
            case AgentMatterState['已关闭']:
                {
                    setCloseNum(agentMatters.length);
                }
                break;
        }
    });

    window.electron.ipcRenderer.on('get-operate-logs-callback', (event, operateLogs) => {
        if (operateLogs.length < operateLogQueryParams.pageSize) {
            setIsHasMoreLog(false);
        };

        setTimelineData(timelineData.concat(operateLogs.map(item => {
            return {
                children: item.description + ' ' + item.create_time
            }
        })));
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
        window.electron.ipcRenderer.send('get-agent-matters', {
            state: AgentMatterState['已关闭']
        }, {
            state: AgentMatterState['已关闭']
        });
        getOperateLog(operateLogQueryParams);
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
                    <Col span={8} style={{ 'cursor': 'pointer' }} onClick={() => showDetail(AgentMatterState['待完成'])}>
                        <Badge.Ribbon text="查看详情" >
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
                    <Col span={8} style={{ 'cursor': 'pointer' }} onClick={() => showDetail(AgentMatterState['已完成'])}>
                        <Badge.Ribbon text="查看详情" >
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
                    <Col span={8} style={{ 'cursor': 'pointer' }} onClick={() => showDetail(AgentMatterState['已关闭'])}>
                        <Badge.Ribbon text="查看详情" >
                            <Card bordered={false}>
                                <Statistic
                                    title="已关闭"
                                    value={closeNum}
                                    precision={0}
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
                <Divider plain>
                    {
                        isHasMoreLog ? <Button type="text" onClick={() => getMore()}>查看更多</Button> :
                            <span>没有更多了</span>
                    }
                </Divider>
            </Space >
        </>
    )
}

export default Home;