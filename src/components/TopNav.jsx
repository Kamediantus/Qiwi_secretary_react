import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const TopNav = (props) => {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Wallets</Menu.Item>
                    <Menu.Item key="2">Transactions</Menu.Item>
                    <Menu.Item key="3">History</Menu.Item>
                    <Menu.Item key="4">Settings</Menu.Item>
                </Menu>
            </Header>

        </Layout>
    );
};

export default TopNav;