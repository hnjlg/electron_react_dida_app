import { Card, Statistic, Row, Col, Timeline, Space, Badge } from 'antd';
import {
    FileDoneOutlined,
    FileUnknownOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," />;

const Home = () => {
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
                                    title="完成事项"
                                    value={12}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<FileDoneOutlined />}
                                    formatter={formatter}
                                    suffix="个"
                                />
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                    <Col span={12}>
                        <Badge.Ribbon text="查看详情" style={{ 'cursor': 'pointer' }}>
                            <Card bordered={false}>
                                <Statistic
                                    title="待办事项"
                                    value={8}
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
                </Row>
                <Timeline
                    mode="alternate"
                    items={[
                        {
                            children: 'Create a services site 2015-09-01',
                        },
                        {
                            children: 'Solve initial network problems 2015-09-01',
                            color: 'green',
                        },
                        {
                            dot: (
                                <ClockCircleOutlined
                                    style={{
                                        fontSize: '16px',
                                    }}
                                />
                            ),
                            children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                        },
                        {
                            color: 'red',
                            children: 'Network problems being solved 2015-09-01',
                        },
                        {
                            children: 'Create a services site 2015-09-01',
                        },
                        {
                            dot: (
                                <ClockCircleOutlined
                                    style={{
                                        fontSize: '16px',
                                    }}
                                />
                            ),
                            children: 'Technical testing 2015-09-01',
                        },
                    ]}
                />
            </Space >
        </>
    )
}

export default Home;