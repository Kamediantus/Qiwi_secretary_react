import React from "react";
import 'antd/dist/antd.css';
import './styles/App.css'
import EditWallet from "./components/low_level/EditWallet";
import SimpButt from "./testus/SimpButt"
import TestComp from "./components/TestComp";
import WalletTable from "./components/high_level/WalletTable";
import NewWalletForm from "./components/high_level/NewWalletForm";
import TopNav from "./components/high_level/TopNav";

function App() {
    return (
    <div style={{textAlign: "center", }} className="App" >
        {/*<div>*/}
        {/*    <TopNav/>*/}
        {/*</div>*/}
        {/*<EditWallet></EditWallet>*/}
    </div>
  );
}

export default App;
