import React from "react";
import 'antd/dist/antd.css';
import './styles/App.css'
import SimpButt from "./testus/SimpButt"
import TestComp from "./components/TestComp";
import WalletTable from "./components/high_level/WalletTable";
import NewWalletForm from "./components/high_level/NewWalletForm";
import TopNav from "./components/high_level/TopNav";

function App() {
    return (
    <div style={{textAlign: "center", }} className="App" >
        <div>
            <TopNav/>
        </div>
        {/*<div className={'otstup'}>*/}
        {/*    <NewWalletForm/>*/}
        {/*</div>*/}
        {/*<div className={'otstup'}>*/}
        {/*    <WalletTable/>*/}
        {/*</div>*/}
        {/*<div className={'otstup'}>*/}
        {/*    <SimpButt></SimpButt>*/}
        {/*</div>*/}
            {/*<TestComp></TestComp>*/}
    </div>
  );
}

export default App;
