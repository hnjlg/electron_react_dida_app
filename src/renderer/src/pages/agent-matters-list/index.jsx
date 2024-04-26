import { List, Radio, Flex, Divider, Button } from 'antd';
import { useState, useEffect } from 'react';
import { AgentMatterState } from '@renderer/globalConfig'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';

const AgentMattersList = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [stateValue, setStateValue] = useState('all');

    const [isHasMore, setIsHasMore] = useState(true);

    const [queryParams, setQueryParams] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const [listData, setListData] = useState([]);

    const getAgentMatters = (queryParams, options) => window.electron.ipcRenderer.send('get-agent-matters', queryParams, options);

    window.electron.ipcRenderer.on('get-agent-matters-callback', (event, agentMatters, options) => {
        if (agentMatters.length < queryParams.pageSize) {
            setIsHasMore(false);
        }
        if (options.type === 'init') {
            setListData(agentMatters);
        } else {
            setListData([...listData, ...agentMatters]);
        }
    });

    useEffect(() => {
        let query = cloneDeep(queryParams);
        const state = searchParams.get('state');
        if (state !== null) {
            query.state = state;
            setStateValue(Number(state));
        };
        getAgentMatters(query, {
            type: 'init'
        });
    }, []);

    const stateHandleChange = (value) => {
        const newQueryParams = {
            ...queryParams,
            pageIndex: 1
        }
        setQueryParams(newQueryParams);
        setIsHasMore(true);
        if (value === 'all') {
            getAgentMatters(newQueryParams, {
                type: 'init'
            });
        } else {
            getAgentMatters({
                ...newQueryParams,
                state: value
            }, {
                type: 'init'
            });
        };
        setStateValue(value);
    };

    const getMore = () => {
        const newQueryParams = {
            ...queryParams,
            pageIndex: queryParams.pageIndex + 1
        };
        setQueryParams(newQueryParams);
        if (stateValue === 'all') {
            getAgentMatters(newQueryParams);
        } else {
            getAgentMatters({
                ...newQueryParams,
                state: stateValue
            });
        };
    };

    const changeStateHandleIcon = (item, text) => {
        window.electron.ipcRenderer.send('edit-agent-matter', {
            id: item.id,
            state: AgentMatterState[text]
        });

        setListData(listData.map(i => {
            if (i.id === item.id) {
                i.state = AgentMatterState[text];
            }
            return i;
        }))
    }

    return (
        <>
            <Radio.Group value={stateValue} buttonStyle="solid" onChange={(e) => stateHandleChange(e.target.value)}>
                <Radio.Button value="all">全部</Radio.Button>
                {
                    Object.keys(AgentMatterState).map(key =>
                        <Radio.Button key={key} value={AgentMatterState[key]}>{key}</Radio.Button>
                    )
                }
            </Radio.Group>
            <List
                itemLayout="horizontal"
                dataSource={listData}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<CheckOutlined onClick={() => changeStateHandleIcon(item, item.state === AgentMatterState['已完成'] ? '待完成' : '已完成')} style={{
                                cursor: 'pointer',
                                color: item.state === AgentMatterState['已完成'] ? '#6BCD39' : ''
                            }} />}
                            title={<Flex justify='space-between'><span>item.title</span><CloseOutlined onClick={() => changeStateHandleIcon(item, '已关闭')} style={{
                                cursor: 'pointer',
                                color: item.state === AgentMatterState['已关闭'] ? '#FF4D4F' : ''
                            }} /></Flex>}
                            description={
                                <Flex vertical>
                                    <div>{item.begin_time} ~ {item.end_time}</div>
                                    <div>
                                        {item.description}
                                    </div>
                                </Flex>
                            }
                        />
                    </List.Item >
                )}
            />
            <Divider plain>
                {isHasMore ? <Button type="dashed" onClick={() => getMore()}>加载更多</Button> : <div>没有更多了</div>}
            </Divider>
        </>
    )
};

export default AgentMattersList;