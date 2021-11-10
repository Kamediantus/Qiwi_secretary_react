import React from 'react';
import 'antd/dist/antd.css';
import '../styles/App.css'
import {Button, Table} from 'antd';
import {
    CaretUpFilled,
    CaretDownFilled,
    CreditCardFilled
} from '@ant-design/icons';

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrl = '/wallets';

const columns = [
    {
        title: 'Id',
        width: 30,
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
    },
    {
        title: 'Name',
        width: 80,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Phone',
        width: 60,
        dataIndex: 'phone',
        key: 'phone',
        fixed: 'left',
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        width: 50,
    },
    {
        title: 'Full name',
        dataIndex: 'full_name',
        key: '2',
        width: 150,
    },
    {
        title: 'API token',
        dataIndex: 'token',
        key: '2',
        width: 150,
    },
    {
        title: 'Deposit',
        key: 'operationDeposit',
        fixed: 'right',
        width: 70,
        render: () => <a>
            <Button
                shape={'round'}
                color={'green'}
                type={'primary'}
            >
                Deposit
                <CaretDownFilled />
            </Button>
        </a>,
    },
    {
        title: 'Withdrawal',
        key: 'operationWithdrawal',
        fixed: 'right',
        width: 70,
        render: () => <a>
            <Button shape={'round'} color={'green'} type={'primary'}>
                Withdrawal
                <CaretUpFilled />
            </Button>
        </a>,
    },
    {
        title: 'Open wallet',
        key: 'operationOpenWallet',
        fixed: 'right',
        width: 70,
        render: () => <a>
            <Button
                shape={'round'}
                color={'green'}
                type={'primary'}>

                Open wallet

                <CreditCardFilled />
            </Button>
        </a>,
    },
];

class WalletTable extends React.Component {
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
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
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