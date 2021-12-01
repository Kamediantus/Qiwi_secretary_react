import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import 'antd/dist/antd.css';
import './styles/App.css'
import TopNav from "./components/high_level/TopNav";

function App() {
    return (
    <div style={{textAlign: "center", }} className="App" >
        <div>
            <TopNav/>
        </div>
    </div>
  );
}

export default App;
