import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/App.css';
import { Layout, Menu } from 'antd';
import { FaWallet } from "react-icons/fa";
import { TransactionOutlined, HistoryOutlined, SettingOutlined, PlusSquareOutlined } from '@ant-design/icons';
import WalletTable from "./WalletTable";
import NewWalletForm from "./NewWalletForm";
import Demo from "./Transaction";

const { Header } = Layout;

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFrame: 1
        };
        this.getActiveComponent = this.getActiveComponent.bind(this);
        this.setActiveComponent = this.setActiveComponent.bind(this);
    }

    getActiveComponent(event) {
        if (this.state.activeFrame === 1) {
            return <div className={'otstup'}> <WalletTable></WalletTable> </div>
        } else if (this.state.activeFrame === 2) {
            return <div className={'otstup'}> <NewWalletForm></NewWalletForm> </div>
        } else if (this.state.activeFrame === 3) {
            return <div className={'otstup'}><Demo className={'otstup'}></Demo></div>
        } else if (this.state.activeFrame === 4) {
            return <div className={'otstup'}>ХУЙ</div>
        } else if (this.state.activeFrame === 5) {
            return <div className={'otstup'}>Настройки</div>
        }
    }

    setActiveComponent(event, index) {
        if (this.state.activeFrame != index) {
            this.setState({
                activeFrame: index
            });
        }
    }

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className="logo" />
                    <div>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" onClick={(event) => this.setActiveComponent(event, 1)}>
                                <FaWallet size={30}></FaWallet>
                                &nbsp;	  Кошельки
                            </Menu.Item>

                            <Menu.Item key="2" onClick={(event) => this.setActiveComponent(event, 2)}>
                                <PlusSquareOutlined style={{ fontSize: '30px', color: 'white'}}/>
                                &nbsp;	  Новый кошелек
                            </Menu.Item>

                            <Menu.Item key="3" onClick={(event) => this.setActiveComponent(event, 3)}>
                                <TransactionOutlined style={{ fontSize: '30px', color: 'white'}} />
                                &nbsp;	  Транзакции
                            </Menu.Item>

                            <Menu.Item key="4" onClick={(event) => this.setActiveComponent(event, 4)}>
                                <HistoryOutlined style={{ fontSize: '30px', color: 'white'}} />
                                &nbsp;	  История
                            </Menu.Item>

                            <Menu.Item key="5" onClick={(event) => this.setActiveComponent(event, 5)}>
                                <SettingOutlined style={{ fontSize: '30px', color: 'white'}} />
                                &nbsp;	  Настройки
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
                <div>
                    {this.getActiveComponent()}
                </div>
            </Layout>
        )
    };
}


export default TopNav;