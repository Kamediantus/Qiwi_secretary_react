import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/App.css'
import '../../styles/WalletTable.css'
import {Modal, Button, Table} from 'antd';
import {
    CaretUpFilled,
    CaretDownFilled,
    FullscreenOutlined,
    EditOutlined
} from '@ant-design/icons';
import EditWallet from "../low_level/EditWallet";

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrl = '/wallets';

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

class WalletTable extends React.Component {
       constructor(props) {
                    super(props);
                    this.state = {
                        error: null,
                        isLoaded: false,
                        items: [],
                        isModalVisible: false,
                        currentEditWallet: {}
                    };
           this.showModal = this.showModal.bind(this);
           this.handleOk = this.handleOk.bind(this);
           this.handleCancel = this.handleCancel.bind(this);
       }

    showModal (record) {
        console.log(record);
        this.setState({currentEditWallet: record});
        console.log(this.state.currentEditWallet);
        this.setState({isModalVisible: true});
    };

    handleOk (event) {
        this.setState({isModalVisible: false});
        this.setState({currentEditWallet: {}});
    };

    handleCancel (event) {
        this.setState({isModalVisible: false});
        this.setState({currentEditWallet: {}});
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
                                    <EditWallet record={this.state.currentEditWallet}/>
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