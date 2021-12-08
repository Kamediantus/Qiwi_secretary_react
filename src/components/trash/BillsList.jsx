import React from 'react';
import {Button, Form, Input, Modal, Select, Table} from "antd";
import {payBill} from "../../logic/Store";

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
    console.log(this.state.wallet.id);
    }

    componentDidMount() {
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

    render() {
        var columns = [
            {
                title: 'Id',
                dataIndex: 'id',
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
                            onClick={() => payBill(record)}>
                        Оплатить
                    </Button>
                </a>
            }];
        const {error, isLoaded, bills} = this.state;
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
                               dataSource={bills}
                               pagination={false}
                        />
                    </div>
                );
            }
        }
    }


export default BillsList;