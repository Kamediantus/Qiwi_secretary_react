import React from 'react';
import {Button, Form, Input} from "antd";
import {dark, newWallet} from '../logic/writer'

const NewWalletForm = () => {
    // var el = document.getElementById("displayName");
    // var el1 = document.getElementById("phone");
    // var el2 = document.getElementById("token");
    // var el3 = document.getElementById("fio");
    //
    // if (el != null) {
    //     var str = document.getElementById("displayName").value;
    // }
    // if (el1 != null) {
    //     var str1 = document.getElementById("phone").value;
    // }
    // if (el2 != null) {
    //     var str2 = document.getElementById("token").value;
    // }
    // if (el3 != null) {
    //     var str3 = document.getElementById("fio").value;
    // }
    return (
        <div>
            <Form>
                <Form.Item label="Имя   ">
                    <Input id='displayName' placeholder="имя кошелька для внутреннего обозначения" />
                </Form.Item>
                <Form.Item id='phone' label="Телефон">
                    <Input placeholder="номер телефона начиная с 7" />
                </Form.Item>
                <Form.Item id='token' label="Токен">
                    <Input placeholder="токен киви кошелька" />
                </Form.Item>
                <Form.Item id='fio' label="ФИО">
                    <Input placeholder="ФИО, необязательное поле" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                            onClick={(event) =>
                                newWallet()
                            }
                    >Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewWalletForm;