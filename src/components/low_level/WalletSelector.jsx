import React from 'react';
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const serverUrl = 'http://localhost:8080';
const serverGetWalletsUrl = '/wallets/selector';

class WalletSelector extends React.Component {
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
        return (
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Please select"
                // onChange={handleChange}
            >
                {items.map((value, index) => {
                    return <Option value={index}>{value}</Option>
                })}
            </Select>
        )
    }
}

export default WalletSelector;