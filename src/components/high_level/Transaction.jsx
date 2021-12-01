import React from "react";

import {Form, Input, Button, Select, InputNumber} from 'antd';
// import WalletSelector from "../low_level/WalletSelector";

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrl = '/wallets/selector';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(serverUrl + serverGetWalletsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    formRef = React.createRef();

    onFinish = (values) => {
        console.log(values);
    };
    onReset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Ошибочка: У вас пока что нет сохраненных кошельков.</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="from"
                        label="Откуда"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="single"
                            style={{width: '100%'}}
                            placeholder="Please select"
                            key={'from'}
                            // onChange={handleChange}
                        >
                            {items.map((value, index) => {
                                return <Option value={index}>{value}</Option>
                            })}
                            {/*{items.map(item => <Option>{item}</Option>)}*/}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="to"
                        label="Куда"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="single"
                            style={{width: '100%'}}
                            placeholder="Please select"
                            key={'to'}
                            // onChange={handleChange}
                        >
                            {items.map((value, index) => {
                                return <Option value={index}>{value}</Option>
                            })}
                            {/*{items.map(item => <Option>{item}</Option>)}*/}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Сколько:"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <InputNumber key={'amount'} size={"large"} min={0} step={1000}/>
                        {/*&nbsp;руб.*/}
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link" htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
}
export default Demo;