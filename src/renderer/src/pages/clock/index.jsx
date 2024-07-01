import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Countdown from 'react-countdown';
import { Flex, List, Button, Divider, Modal, Form, Input, TimePicker, Drawer, Tabs, message } from 'antd';
import { PlusCircleOutlined, PlayCircleOutlined, PoweroffOutlined, ExpandOutlined } from '@ant-design/icons';
import { Hourglass } from 'react-loader-spinner';
import dayjs from 'dayjs';
import styles from './style.module.scss';
import * as echarts from 'echarts';

const Echarts = (props) => {
    const chartRef = useRef()
    const options = {
        title: {
            text: "柱状图"
        },
        tooltip: {
            trigger: 'axis'
        },
        // 图例组件
        legend: {
            data: ['销量'],
            show: true
        },
        // x轴
        xAxis: {
            type: 'category',
            data: ['冬瓜', '茄子', '丝瓜', '玉米', '红薯', '西红柿', '芹菜']
        },
        // y轴
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [20, 9, 39, 43, 60, 18, 50],
            type: 'bar', // 柱状图
            name: '销量'
        }]
    }

    useEffect(() => {
        // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
        const chart = echarts.init(chartRef.current)

        // 设置图表实例的配置项和数据
        chart.setOption(options)

        window.addEventListener('resize', function () {
            chart.resize();
        });

        // 组件卸载
        return () => {
            // chart.dispose() 销毁实例。实例销毁后无法再被使用
            chart.dispose();
            window.removeEventListener('resize', function () {
                chart.resize();
            });
        }
    }, [])

    return (
        // 把图表封装单独放入一个组件中
        <div style={{ width: "100%", height: "240px" }} ref={chartRef}></div>
    )
}




const FocusDrawer = forwardRef(({ time, title }, ref) => {

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return { setOpen: setOpen }
    });

    const [messageApi, contextHolder] = message.useMessage();

    const [dateTime, setDateTime] = useState(dayjs());

    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(dayjs());
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsDone(true);
            window.electron.ipcRenderer.send('flash-frame-open');
            return <span>恭喜你完成专注计划，太棒了</span>;
        } else {
            return <span className={styles['focus-drawer-time']}>{hours}:{minutes}:{seconds}</span>;
        };
    };

    const onClose = () => {
        if (isDone) {
            setIsDone(false);
            setOpen(false);
        } else {
            messageApi.open({
                type: 'warning',
                content: '专注计划未结束！是否确认退出？双击直接退出',
            });
            setIsDone(true);
            setTimeout(() => {
                setIsDone(false);
            }, 500);
        }
    };

    return (
        <>
            {contextHolder}
            <Drawer
                open={open}
                height='100%'
                placement='bottom'
                closable={false}
                destroyOnClose={true}
            >
                <Flex vertical justify='space-between' align='center' style={{ height: '100%' }}>
                    <Flex justify='space-between' style={{ width: '100%' }}>
                        <span>{dateTime.format('HH:mm:ss')}</span>
                        <span className={styles['focus-drawer-title']}>“{title}”</span>
                        <span>{dateTime.format('YYYY/MM/DD')}</span>
                    </Flex>
                    <Flex style={{ flex: 1 }} justify='center' align='center'>
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#306cce', '#72a1ed']}
                        />
                    </Flex>
                    <Countdown date={time} renderer={renderer} />
                    <Flex style={{ width: '100%' }} justify='flex-end' gap={'20px'}>
                        <ExpandOutlined onClick={() => window.electron.ipcRenderer.send('window-max')} />
                        <PoweroffOutlined onClick={() => onClose()} />
                    </Flex>
                </Flex >
            </Drawer >
        </>
    )
});

const Clock = () => {

    const AddPlanForm = useRef(null);

    const FocusDrawerRef = useRef(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [planList, setPlanList] = useState([]);

    const [currentPlan, setCurrentPlan] = useState({
        time: 0
    });


    const onAddModalCancel = () => {
        setIsAddModalOpen(false);
        AddPlanForm.current.resetFields();
    };


    const onFormFinish = (values) => {
        const timeArr = dayjs(values.time).format('HH:mm:ss').split(':');
        const midnight = new Date();
        midnight.setHours(0);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        const targetTime = new Date();
        targetTime.setHours(Number(timeArr[0]));
        targetTime.setMinutes(Number(timeArr[1]));
        targetTime.setSeconds(Number(timeArr[2]));
        // 计算时间差
        const time = Math.floor((targetTime.getTime() - midnight.getTime()) / 1000);
        const newPlan = {
            title: values.title,
            time,
            count: 0
        };
        window.electron.ipcRenderer.send('add-focus-plan', newPlan);
        setPlanList([newPlan, ...planList]);
        onAddModalCancel();
    };

    useEffect(() => {
        window.electron.ipcRenderer.on('get-focus-plan-callback', (event, planList) => {
            setPlanList(planList);
        });
        window.electron.ipcRenderer.send('get-focus-plan');
    }, []);

    const planLogList = [
        1, 2, 3, 4, 5, 6, 7
    ];

    return (
        <>
            <Flex className={styles['clock']}>
                <div className={styles['plan-list']}>
                    <List
                        header={<Flex justify='space-between'>
                            <div>专注计划</div>
                            <Button onClick={() => { setIsAddModalOpen(true) }} icon={<PlusCircleOutlined />}></Button>
                        </Flex>}
                        dataSource={planList}
                        renderItem={(item) => (
                            <List.Item>
                                <Flex justify='space-between' style={{ width: '100%' }}>
                                    <div flex={1}>
                                        <p>{item.title}</p>
                                        <span>{item.time} 秒</span><Divider type="vertical" /><span>{item.count} 次数</span>
                                    </div>
                                    <Button onClick={() => {
                                        FocusDrawerRef.current.setOpen(true);
                                        setCurrentPlan({
                                            ...item,
                                            time: Date.now() + Number(item.time) * 1000
                                        });
                                    }}><PlayCircleOutlined /></Button>
                                </Flex>
                            </List.Item>
                        )}
                    />
                </div >
                <Flex vertical className={styles['record-description']}>
                    <div className={styles['echarts']}>
                        <Tabs
                            tabPosition={'bottom'}
                            items={new Array(3).fill(null).map((_, i) => {
                                const id = String(i + 1);
                                return {
                                    label: `Tab ${id}`,
                                    key: id,
                                    children: <Echarts></Echarts>,
                                };
                            })}
                        />
                    </div>
                    <div className={styles['log-list']}>
                        <List
                            header={<Flex justify='space-between'>
                                <div>专注记录</div>
                            </Flex>}
                            dataSource={planLogList}
                            renderItem={(item) => (
                                <List.Item>
                                    <Flex justify='space-between' style={{ width: '100%' }}>
                                        <div>
                                            标题
                                        </div>
                                        <div>
                                            00:15:56/01:00:00
                                        </div>
                                    </Flex>
                                </List.Item>
                            )}
                        />
                    </div>
                </Flex>
            </Flex >

            <Modal title="新增专注计划" open={isAddModalOpen} footer={null} onCancel={onAddModalCancel}>
                <Form
                    ref={AddPlanForm}
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
                    onFinish={onFormFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="专注标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入专注标题',
                            },
                            {
                                max: 60,
                                message: '专注标题不能超过60字'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="专注时长"
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: '请输入专注时长',
                            },
                        ]}
                    >
                        <TimePicker />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <FocusDrawer ref={FocusDrawerRef} {...currentPlan}></FocusDrawer >
        </>
    )
};

export default Clock;