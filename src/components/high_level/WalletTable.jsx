import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/App.css'
import '../../styles/WalletTable.css'
import '../../styles/NewWallet.css'
import {message, Modal, Button, Table, Form, Input} from 'antd';
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import {deleteWallet, payAllBills, updateWallet} from "../../logic/Store";
import BillsList from "../low_level/BillsList";
import {simpleGet} from "../../logic/ApiQuery";

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrl = '/wallets/getWalletsWithBalances';

function showWarn () {
    message.warning('Не удалось получить ответ от Qiwi API. Проверьте телефон и токен. ', 4);
};

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
                        isModalEditVisible: false,
                        isModalDeleteVisible: false,
                        record : {},
                        nameValue: '',
                        phoneValue: '',
                        tokenValue: '',
                        fioValue: '',
                        idValue: '',
                        validName: 'true',
                        validPhone: 'true',
                        validToken: 'true',
                        deleteRecord: {},
                        deleteRecordId: null,
                        billWallet: {},
                        billRecord: {},
                        isModalBillVisible: false
                    };

           this.showModal = this.showModal.bind(this);
           this.handleOk = this.handleOk.bind(this);
           this.handleDeleteOk = this.handleDeleteOk.bind(this);
           this.handleCancel = this.handleCancel.bind(this);
           this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
           this.handleChangeName = this.handleChangeName.bind(this);
           this.handleChangePhone = this.handleChangePhone.bind(this);
           this.handleChangeToken = this.handleChangeToken.bind(this);
           this.handleChangeFio = this.handleChangeFio.bind(this);
           this.handleSubmit = this.handleSubmit.bind(this);
           this.handlePushDelete = this.handlePushDelete.bind(this);
           this.handleBillPayAll = this.handleBillPayAll.bind(this);
           this.handleBillCancel = this.handleBillCancel.bind(this);
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
            resultMessage += 'Кошелек с номером ' + this.state.phoneValue + ' успешно обновлен.'
            updateWallet(this.state.idValue);
            message.info(resultMessage);
            this.setState(clearState);
        } else {
            message.info(resultMessage);
        }
    }

    showModal (record) {
        this.setState({record: record});
        this.setState({
            nameValue: record.name,
            phoneValue: record.phone,
            tokenValue: record.token,
            fioValue: record.full_name,
            idValue: record.id
        });
        this.setState({isModalEditVisible: true});
    };

    showBillModal(record) {
        this.setState({billWallet: record});
        this.setState({isModalBillVisible: true});
    }

    showDeleteModal(record) {
        this.setState({deleteRecord: record});
        this.setState({
            deleteRecordId: record.id
        });
        this.setState({isModalDeleteVisible: true});
    }

    handleOk (event) {
        this.setState({isModalEditVisible: false});
    };

    handleCancel (event) {
        this.setState({isModalEditVisible: false});
    };

    handleDeleteOk (event) {
        this.setState({isModalDeleteVisible: false});
    };

    handleDeleteCancel (event) {
        this.setState({isModalDeleteVisible: false});
    };

    handleBillPayAll (event) {
        this.setState({isModalBillVisible: false});
        payAllBills(this.state.billWallet)
    };

    handleBillCancel (event) {
        this.setState({isModalBillVisible: false});
    };

    handlePushDelete (record) {
        var resultMessage = 'Кошелек с номером ' + this.state.deleteRecord.phone + ' успешно удален.'
        deleteWallet(this.state.deleteRecordId);
        message.info(resultMessage);
        this.setState({isModalDeleteVisible: false});
    };

                async componentDidMount() {
                    // var result = await simpleGet(serverUrl + serverGetWalletsUrl);
                    // if (result !== -404) {
                    //     this.setState({
                    //         isLoaded: true,
                    //         items: result
                    //     });
                    // }
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
                                    },
                                    children: parseInt(text) === -404 ?
                                        <Button
                                            type="primary"
                                            onClick={() => showWarn()}
                                        >
                                            Ошибка..
                                        </Button>
                                        :
                                        <div>{text}</div>
                                }}},
                        {
                            title: 'ФИО',
                            dataIndex: 'full_name',
                            key: 'full_name',
                            width: 150,
                        },
                        {
                            title: 'API токен',
                            dataIndex: 'token',
                            key: 'token',
                            width: 150,
                        },
                        {
                            title: 'Счета',
                            dataIndex: 'bill',
                            key: 'bill',
                            width: 150,
                            render: (index, record) => <a>
                                <Button shape={'round'} color={'green'} type={'primary'} block
                                        onClick={() => this.showBillModal(record)}>
                                    Счета
                                    <DeleteOutlined/>
                                </Button>
                            </a>
                        },
                        {
                            title: 'Править',
                            key: 'operationEditWallet',
                            fixed: 'right',
                            width: 70,
                            render: (index, record) => <a>
                                <Button shape={'round'} color={'green'} type={'primary'} block
                                        onClick={() => this.showModal(record)}>
                                    Править
                                    <EditOutlined/>
                                </Button>
                                <Modal title={"Изменение данных кошелька.  ID:" + this.state.idValue}  visible={this.state.isModalEditVisible} onOk={this.handleOk} onCancel={this.handleCancel}
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
                        },
                    {
                            title: 'Удалить',
                            key: 'operationDelete',
                            fixed: 'right',
                            width: 70,
                            render: (index, record) => <a>
                                <Button  shape={'round'} color={'green'} type={'primary'} block
                                        onClick={() => this.showDeleteModal(record)}>
                                    Удалить
                                    <DeleteOutlined />
                                </Button>
                                <Modal title={"Удаление кошелька.  ID:" + this.state.deleteRecordId}  visible={this.state.isModalDeleteVisible} onOk={() => this.handlePushDelete(record)} onCancel={this.handleDeleteCancel}
                                       width={800} okType={'danger'}>
                                    <div>
                                        <div>{this.state.deleteRecord.name}</div>
                                        <div>{this.state.deleteRecord.phone}</div>
                                        <div>{this.state.deleteRecord.token}</div>
                                        <div>{this.state.deleteRecord.full_name}</div>
                                    </div>
                                </Modal>
                            </a>,
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
                                />
                                <Modal title={"Активные выставленные счета.  Телефон: " + this.state.billWallet.phone}
                                       visible={this.state.isModalBillVisible}
                                       onCancel={this.handleBillCancel}
                                       width={1100} okType={'danger'}
                                       footer={[
                                           <Button key="back" onClick={this.handleBillPayAll}>
                                               Оплатить все
                                           </Button>,
                                           <Button key="submit" type="primary" onClick={this.handleBillCancel}>
                                               Отмена
                                           </Button>,
                                       ]}>
                                    <BillsList wallet={this.state.billWallet}></BillsList>
                                </Modal>
                            </div>
                        );
                    }
                }
            }

export default WalletTable;