import React from 'react';
import {Button, Form, Input, message, Modal, Select, Table} from "antd";
import {sleep} from "../../logic/Utils";

const serverUrl = 'http://localhost:8080';
const serverGetBillsUrl = '/bills/';

class BillsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: props.wallet,
            error: null,
            isLoaded: false,
            bills: []
        };
        this.getBills = this.getBills.bind(this);
        this.payBillAndReload = this.payBillAndReload.bind(this);
    }

    payBillAndReload(record) {

        message.info('before sleep');
        sleep(1000).then(() => {
            message.info('after sleep');
        });

        // payBill(record);
        // message.info('Успешная оплата счета ' + record.name + ' на сумму ' + record.amount + ' руб.', 4);
        // this.getBills();
        // this.forceUpdate();
    }

    getBills() {
        console.log('get bills');
        fetch(serverUrl + serverGetBillsUrl + this.state.wallet.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        bills: result
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

    componentDidMount() {
        this.getBills();
    }

    render() {
        var columns = [
            {
                title: 'Id',
                dataIndex: 'bill_id',
                key: 'id',
                fixed: 'left',
            },
            {
                title: 'От кого',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },
            {
                title: 'Сумма',
                dataIndex: 'amount',
                key: 'phone',
                fixed: 'left',
            },
            {
                title: 'Оплатить',
                key: 'pay',
                fixed: 'left',
                render: (index, record) => <a>
                    <Button shape={'round'} color={'green'} type={'primary'} block
                            onClick={() => this.payBillAndReload(record)}>
                        Оплатить
                    </Button>
                </a>
            }];
        const {error, isLoaded, bills} = this.state;
        if (error) {
                return <div>Ошибочка: У вас пока что нет сохраненных кошельков.</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else if (bills.length === 0) {
            return <div>Нет доступных неоплаченных счетов.</div>
        } else {
                return (
                    <div>
                        <Table id={'table'}
                               size={"small"}
                               rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                               className={'table-striped-rows'}
                               columns={columns}
                               dataSource={this.state.bills}
                               pagination={false}
                        />
                        <Button shape={'round'} color={'green'} type={'primary'} block
                                onClick={() => this.getBills()}>Обновить</Button>
                    </div>
                );
            }
        }
    }


export default BillsList;