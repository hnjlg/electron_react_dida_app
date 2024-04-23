
import { Flex, Tag, Card } from 'antd';
import { AlertOutlined, TagsOutlined, LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './style.module.scss'

const AgentMatters = () => {
    return (
        <>
            <Flex vertical className={styles['agent-matters']}>
                <Flex align='center' className={styles['emergency-degree']}>
                    <div className={styles['emergency-degree-title']}><TagsOutlined />四象限</div>
                    <Flex>
                        <Tag icon={<AlertOutlined />} color="#cd201f">
                            重要紧急
                        </Tag>
                        <Tag icon={<AlertOutlined />} color="#FF5500">
                            不重要紧急
                        </Tag>
                        <Tag icon={<AlertOutlined />} color="#3b5999">
                            重要不紧急
                        </Tag>
                        <Tag icon={<AlertOutlined />} color="#55acee">
                            不重要不紧急
                        </Tag>
                    </Flex>
                </Flex>
                <Flex gap='10px' wrap='wrap' className={styles['emergency-degree-list']}>
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <div className={styles['add-emergency-degree']}>
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
        </>
    )
}

export default AgentMatters;