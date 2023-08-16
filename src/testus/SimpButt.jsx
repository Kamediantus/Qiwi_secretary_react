import React from 'react';
import {Button} from "antd";

const phone ='7*********';
const token ='**********';
const apiUrl = 'https://edge.qiwi.com';
const apiFirstBalanceSubUrl = '/funding-sources/v2/persons/';
const apiSecondBalanceSubUrl = '/accounts';

class SimpButt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(apiUrl + apiFirstBalanceSubUrl + phone + apiSecondBalanceSubUrl,
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })})
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
        if (error) {
            return <div>Ошибочка: У вас пока что нет сохраненных кошельков.</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <Button>Click</Button>
                    </div>
                    <div>{items}</div>
                </div>
            );
        };
    }
}

export default SimpButt;
