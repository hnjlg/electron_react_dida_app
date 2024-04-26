
import { Modal, Form, Button, Radio, Input, DatePicker } from 'antd';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { FourQuadrantValues } from '@renderer/globalConfig';

const AddAgentMatter = (props, ref) => {

    const AddFormRef = useRef(null);

    useImperativeHandle(ref, () => {
        return { formRef: AddFormRef }
    })

    return <Modal title="新增代办事项" footer={null} {...props}>
        <Form
            ref={AddFormRef}
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
            autoComplete="off"
            {...props.formProps}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="周期"
                name="time"
                rules={[
                    {
                        required: true,
                        message: '请选择周期',
                    },
                ]}
            >
                <DatePicker.RangePicker showTime />
            </Form.Item>

            <Form.Item
                label="程度"
                name="four_quadrant_value"
                rules={[
                    {
                        required: true,
                        message: '请选择程度',
                    },
                ]}
            >
                <Radio.Group>
                    {
                        Object.keys(FourQuadrantValues).map(key => <Radio key={key} value={FourQuadrantValues[key]}>{key}</Radio>)
                    }
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="描述"
                name="description"
                rules={[
                    {
                        required: true,
                        message: '请填写描述',
                    },
                ]}
            >
                <Input.TextArea
                    autoSize={{
                        minRows: 4,
                        maxRows: 8,
                    }}
                />
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
    </Modal >
}

export default forwardRef(AddAgentMatter);