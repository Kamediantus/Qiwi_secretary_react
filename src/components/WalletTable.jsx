import React from 'react';
import 'antd/dist/antd.css';
import '../styles/App.css'
import {Button, Table} from 'antd';
import {
    CaretUpFilled,
    CaretDownFilled,
    CreditCardFilled
} from '@ant-design/icons';
import data from '../data/wallets.json'

const columns = [
    {
        title: 'Id',
        width: 30,
        dataIndex: 'key',
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

// const data = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i,
//         name: `Edrward ${i}`,
//         full_name: `Bill Kill ${i}`,
//         phone: `+7922212654${i}`,
//         balance: `1${i}00`,
//     });
// }


const WalletTable = () => {
    let rowClassName;
    return (
        <div>
            <Table size={"small"}
                   // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                   className={'table-striped-rows'}
                   columns={columns}
                   dataSource={data}
                   scroll={{ x: 1500 }}
                   pagination={{ defaultPageSize: 50}}
            />,
        </div>
    );
};

export default WalletTable;