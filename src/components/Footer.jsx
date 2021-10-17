import React from 'react';
import 'antd/dist/antd.css';
import '../styles/App.css'
import { Layout } from 'antd';


const { Footer } = Layout;

const FooterBar = () => {
    return (
        <div>
            <Footer style={{
                textAlign: 'center',
                clear: 'both',
                position: 'relative',
                height: '200px',
                marginTop: '-200px'
            }}>Klaus Design ©2021 Created by Klaus EKB</Footer>
        </div>
    );
};

export default FooterBar;