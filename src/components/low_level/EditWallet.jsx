import React from 'react';
import 'antd/dist/antd.css';
import {Button, Form, Input} from "antd";
import '../../styles/NewWallet.css'
import {saveWallet} from "../../logic/Store";

const editState = {
    nameValue: '',
    phoneValue: '',
    tokenValue: '',
    fioValue: '',

    validName: 'common',
    validPhone: 'common',
    validToken: 'common'
}

class EditWalletForm extends React.Component {

    constructor(props, record) {
        super(props);
        console.log(this.props.record);
        this.state = {
            nameValue: this.props.record.name,
            phoneValue: this.props.record.phone,
            tokenValue: this.props.record.token,
            fioValue: this.props.record.full_name,

            validName: 'common',
            validPhone: 'common',
            validToken: 'common'
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeToken = this.handleChangeToken.bind(this);
        this.handleChangeFio = this.handleChangeFio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        const value = event.target.value
        this.setState({nameValue: value});
        if (value.length < 3 && value.length > 0) {
            this.setState({validName: 'false'})
        } else if (value.length === 0) {
            this.setState({validName: 'common'})
        } else {
            this.setState({validName: 'true'})
        }
    }

    handleChangePhone(event) {
        const value = event.target.value
        this.setState({phoneValue: value});
        if (value.length !== 11 && value.length !== 0) {
            this.setState({validPhone: 'false'})
        } else if (value.length === 0) {
            this.setState({validPhone: 'common'})
        } else {
            this.setState({validPhone: 'true'})
        }
    }

    handleChangeToken(event) {
        const value = event.target.value
        this.setState({tokenValue: value});
        if (value.length !== 32 && value.length !== 0) {
            this.setState({validToken: 'false'})
        } else if (value.length === 0) {
            this.setState({validToken: 'common'})
        } else {
            this.setState({validToken: 'true'})
        }
    }

    handleChangeFio(event) {
        this.setState({fioValue: event.target.value});
    }
    handleSubmit(event) {
        let resultMessage = '';
        if (this.state.validName === 'false') {
            resultMessage += 'Имя должно быть длиннее 3-х символов. \n';
        }
        if (this.state.validPhone === 'false') {
            resultMessage += 'Номер телефона должен содержать 11 символов и начинаться с "7". \n';
        }
        if (this.state.validToken === 'false') {
            resultMessage += 'API токен должен быть длинной в 32 символа.\n';
        }
        if (resultMessage === '') {
            resultMessage += 'Кошелек с номером ' + this.state.phoneValue + ' успешно сохранен.'
            alert(resultMessage);
            saveWallet();
            this.setState(editState);
        } else {
            alert(resultMessage);
        }
    }

    render() {
        const {nameValue, phoneValue, tokenValue, fioValue} = this.state;
        return (
            <div>
                <Form>
                    <Form.Item label="Имя   ">
                        <Input id='displayName'
                               placeholder="Имя кошелька для внутреннего обозначения"
                               value={nameValue}
                               className={'antd-input ' + (this.state.validName === 'common' ? null : this.state.validName === 'true' ? 'norm' : 'warning')}
                               onChange={this.handleChangeName}
                        />
                    </Form.Item>
                    <Form.Item  label="Телефон">
                        <Input id='phone'
                               placeholder="Номер телефона начиная с 7"
                               value={phoneValue}
                               className={'antd-input ' + (this.state.validPhone === 'common' ? null : this.state.validPhone === 'true' ? 'norm' : 'warning')}
                               onChange={this.handleChangePhone}
                        />
                    </Form.Item>
                    <Form.Item label="API Токен">
                        <Input id='token'
                               placeholder="API токен киви кошелька"
                               value={tokenValue}
                               className={'antd-input ' + (this.state.validToken === 'common' ? null : this.state.validToken === 'true' ? 'norm' : 'warning')}
                               onChange={this.handleChangeToken}
                        />
                    </Form.Item>
                    <Form.Item id='fio' label="ФИО">
                        <Input placeholder="ФИО, необязательное поле"
                               value={fioValue} onChange={this.handleChangeFio}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                onClick={this.handleSubmit}
                        >Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
}

export default EditWalletForm;