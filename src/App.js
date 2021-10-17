import React from "react";
import 'antd/dist/antd.css';
import './styles/App.css'
import WalletTable from "./components/WalletTable";
import NewWalletForm from "./components/NewWalletForm";

function App() {
    return (
    <div style={{textAlign: "center", }} className="App" >
        <NewWalletForm/>
    </div>
  );
}

export default App;
