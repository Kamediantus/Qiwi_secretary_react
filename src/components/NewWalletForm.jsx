import React from 'react';
import {Button, Form, Input} from "antd";
import {saveWallet} from "../logic/Store";

const NewWalletForm = () => {
    return (
        <div>
            <Form>
                <Form.Item label="Имя   ">
                    <Input id='displayName' placeholder="Имя кошелька для внутреннего обозначения" />
                </Form.Item>
                <Form.Item id='phone' label="Телефон">
                    <Input placeholder="Номер телефона начиная с 7" />
                </Form.Item>
                <Form.Item id='token' label="API Токен">
                    <Input placeholder="API токен киви кошелька" />
                </Form.Item>
                <Form.Item id='fio' label="ФИО">
                    <Input placeholder="ФИО, необязательное поле" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                            onClick={(event) =>
                                saveWallet()
                            }
                    >Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewWalletForm;