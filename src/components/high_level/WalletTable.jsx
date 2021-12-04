import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/App.css'
import '../../styles/WalletTable.css'
import '../../styles/NewWallet.css'
import {Modal, Button, Table, Form, Input} from 'antd';
import {
    CaretUpFilled,
    CaretDownFilled,
    FullscreenOutlined,
    EditOutlined
} from '@ant-design/icons';
import {saveWallet} from "../../logic/Store";

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrl = '/wallets';

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

const clearState = {
    nameValue: '',
    phoneValue: '',
    tokenValue: '',
    fioValue: '',

    validName: 'true',
    validPhone: 'true',
    validToken: 'true'
}

class WalletTable extends React.Component {
       constructor(props) {
                    super(props);
                    this.state = {
                        error: null,
                        isLoaded: false,
                        items: [],
                        isModalVisible: false,
                        record : {},
                        nameValue: '',
                        phoneValue: '',
                        tokenValue: '',
                        fioValue: '',
                        validName: 'true',
                        validPhone: 'true',
                        validToken: 'true'
                    };

           this.showModal = this.showModal.bind(this);
           this.handleOk = this.handleOk.bind(this);
           this.handleCancel = this.handleCancel.bind(this);
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
            this.setState(clearState);
        } else {
            alert(resultMessage);
        }
    }

    showModal (record) {
        console.log(record);
        this.setState({record: record});
        this.setState({
            nameValue: record.name,
            phoneValue: record.phone,
            tokenValue: record.token,
            fioValue: record.full_name
        });

        console.log(this.state.record);
        this.setState({isModalVisible: true});
    };

    handleOk (event) {
        this.setState({isModalVisible: false});
    };

    handleCancel (event) {
        this.setState({isModalVisible: false});
    };

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

                render() {
                    var columns = [
                        {
                            title: 'Id',
                            width: 30,
                            dataIndex: 'id',
                            key: 'id',
                            fixed: 'left',
                        },
                        {
                            title: 'Имя',
                            width: 80,
                            dataIndex: 'name',
                            key: 'name',
                            fixed: 'left',
                        },
                        {
                            title: 'Телефон',
                            width: 60,
                            dataIndex: 'phone',
                            key: 'phone',
                            fixed: 'left',
                        },
                        {
                            title: 'Баланс',
                            dataIndex: 'balance',
                            key: 'balance',
                            width: 80,
                            render(text, record) {
                                return {
                                    props: {
                                        // style: {background: parseInt(text) === -404 ? "red" : "green"}
                                    },
                                    children: parseInt(text) === -404 ?
                                        <div className="popup" onClick={myFunction}>Что-то не так(
                                            <span className="popuptext" id="myPopup">Проверьте введенный номер телефона и API токен.</span>
                                        </div>
                                        :
                                        <div>{text}</div>
                                }}},
                        {
                            title: 'ФИО',
                            dataIndex: 'full_name',
                            key: '2',
                            width: 150,
                        },
                        {
                            title: 'API токен',
                            dataIndex: 'token',
                            key: '2',
                            width: 150,
                        },
                        {
                            title: 'Депозит',
                            key: 'operationDeposit',
                            fixed: 'right',
                            width: 70,
                            render: () => <a>
                                <Button shape={'round'} color={'green'} type={'primary'} block>
                                    Депозит
                                    <CaretDownFilled/>
                                </Button>
                            </a>,
                        },
                        {
                            title: 'Списание',
                            key: 'operationWithdrawal',
                            fixed: 'right',
                            width: 70,
                            render: () => <a>
                                <Button shape={'round'} color={'green'} type={'primary'} block>
                                    Списание
                                    <CaretUpFilled/>
                                </Button>
                            </a>,
                        },
                        {
                            title: 'Открыть в новом окне',
                            key: 'operationOpenWallet',
                            fixed: 'right',
                            width: 70,
                            render: () => <a>
                                <Button shape={'round'} color={'green'} type={'primary'} block>

                                    Открыть

                                    <FullscreenOutlined/>
                                </Button>
                            </a>,
                        },
                        {
                            title: 'Править',
                            key: 'operationEditWallet',
                            fixed: 'right',
                            width: 70,
                            render: (index, record) => <a>
                                <Button shape={'round'} color={'green'} type={'primary'}
                                        onClick={() => this.showModal(record)}>
                                    Править
                                    <EditOutlined/>
                                </Button>
                                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}
                                       width={800}>
                                    <div>
                                        <Form>
                                            <Form.Item label="Имя   ">
                                                <Input id='displayName'
                                                       placeholder="Имя кошелька для внутреннего обозначения"
                                                       value={this.state.nameValue}
                                                       className={'antd-input ' + (this.state.validName === 'common' ? null : this.state.validName === 'true' ? 'norm' : 'warning')}
                                                       onChange={this.handleChangeName}
                                                />
                                            </Form.Item>
                                            <Form.Item  label="Телефон">
                                                <Input id='phone'
                                                       placeholder="Номер телефона начиная с 7"
                                                       value={this.state.phoneValue}
                                                       className={'antd-input ' + (this.state.validPhone === 'common' ? null : this.state.validPhone === 'true' ? 'norm' : 'warning')}
                                                       onChange={this.handleChangePhone}
                                                />
                                            </Form.Item>
                                            <Form.Item label="API Токен">
                                                <Input id='token'
                                                       placeholder="API токен киви кошелька"
                                                       value={this.state.tokenValue}
                                                       className={'antd-input ' + (this.state.validToken === 'common' ? null : this.state.validToken === 'true' ? 'norm' : 'warning')}
                                                       onChange={this.handleChangeToken}
                                                />
                                            </Form.Item>
                                            <Form.Item id='fio' label="ФИО">
                                                <Input placeholder="ФИО, необязательное поле"
                                                       value={this.state.fioValue} onChange={this.handleChangeFio}
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary"
                                                        onClick={this.handleSubmit}
                                                >Сохранить</Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Modal>
                            </a>
                        }];
                    const {error, isLoaded, items} = this.state;
                    if (error) {
                        return <div>Ошибочка: У вас пока что нет сохраненных кошельков.</div>;
                    } else if (!isLoaded) {
                        return <div>Loading...</div>;
                    } else {
                        return (
                            <div>
                                <Table id={'table'}
                                       size={"small"}
                                       rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                                       className={'table-striped-rows'}
                                       columns={columns}
                                       dataSource={items}
                                       scroll={{x: 1500}}
                                       pagination={{defaultPageSize: 50}}
                                />,
                            </div>
                        );
                    }
                }
            }

export default WalletTable;