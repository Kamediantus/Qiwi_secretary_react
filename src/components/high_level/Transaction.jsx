import React from "react";

import {Form, Input, Button, Select, InputNumber, message} from 'antd';
import {dep} from "../../logic/Store";

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrlSelector = '/wallets/selector';
const serverGetWalletsUrl = '/wallets';
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
            items: [],
            wallets: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch(serverUrl + serverGetWalletsUrlSelector)
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

        fetch(serverUrl + serverGetWalletsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        wallets: result
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
        if (values.from === values.to) {
            var resultMessage = 'Харош, зачем тебе перевод на тот же кошелек?';
            message.warn(resultMessage);
        } else if (this.state.wallets[values.from].balance === -404 && this.state.wallets[values.to].balance === -404) {
            var resultMessage = 'Оба кошелька невалидны, проверьте токены, номера телефонов. Удостоверьтесь в том что токены обладает полными правами.';
            message.warn(resultMessage);
        } else if (this.state.wallets[values.from].balance === -404) {
            var resultMessage = 'Кошелек отправителя невалидный, проверьте токен, номер телефона. Удостоверьтесь в том что токен обладает полными правами.';
            message.warn(resultMessage);
        } else if (this.state.wallets[values.to].balance === -404) {
            var resultMessage = 'Кошелек получателя невалидный, проверьте токен, номер телефона. Удостоверьтесь в том что токен обладает полными правами.';
            message.warn(resultMessage);
        } else if (this.state.wallets[values.from].balance < values.amount) {
            var resultMessage = 'Недостаточно средств для перевода. На кошельке отправителя ' + this.state.wallets[values.from].balance + ' руб.';
            message.warn(resultMessage);
        } else {
            dep(values);
            var resultMessage = 'Успешный перевод с ' + this.state.wallets[values.from].phone
                + ' на ' + this.state.wallets[values.to].phone + ' на сумму: ' + values.amount + ' руб.';
            message.success(resultMessage);
            this.componentDidMount();
            this.formRef.current.resetFields();
        }
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
                        >
                            {/*{items.map((value, index) => {*/}
                            {/*    return <Option value={index}>{value}</Option>*/}
                            {/*})}*/}
                            {items.map((value, index) => <Option value={index}>{value}</Option>)}
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
                        >
                            {/*{items.map((value, index) => {*/}
                            {/*    return <Option value={index}>{value}</Option>*/}
                            {/*})}*/}
                            {items.map((value, index) => <Option value={index}>{value}</Option>)}
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