import {message} from "antd";

const formIndex = 0;

const nameIndex = 0;
const phoneIndex = 1;
const tokenIndex = 2;
const full_nameIndex = 3;

const serverUrl = 'http://localhost:8080';
const serverSubUrlSaveWallet = '/wallets/save';
const serverSubUrlUpdateWallet = '/wallets/update';
const serverSubUrlDeleteWallet = '/wallets/delete';
const serverSubUrlPayBill = '/bills/pay';
const serverSubUrlPayAllBills = '/bills/payAll';
const serverGetWalletsUrl = '/wallets/getWalletsWithBalances';
const serverDepUrl = '/transactions/dep';

function saveWalletRaw() {
    const wallet = {
        name: document.forms.item(formIndex).elements.item(nameIndex).value,
        phone: document.forms.item(formIndex).elements.item(phoneIndex).value,
        token: document.forms.item(formIndex).elements.item(tokenIndex).value,
        full_name: document.forms.item(formIndex).elements.item(full_nameIndex).value
    }
    serverSaveWallet(wallet);
}

function serverSaveWallet(wallet) {
    simplePost(serverUrl + serverSubUrlSaveWallet, wallet);
}

function payBillRaw(record) {
    return simplePost(serverUrl + serverSubUrlPayBill, record);
}

function payAllBillsRaw(record) {
    simplePost(serverUrl + serverSubUrlPayAllBills, record);
}

function updateWalletRaw(id) {
    const wallet = {
        name: document.forms.item(formIndex).elements.item(nameIndex).value,
        phone: document.forms.item(formIndex).elements.item(phoneIndex).value,
        token: document.forms.item(formIndex).elements.item(tokenIndex).value,
        full_name: document.forms.item(formIndex).elements.item(full_nameIndex).value,
        id: id
    }
    serverUpdateWallet(wallet);
}

function serverUpdateWallet(wallet) {
    simplePost(serverUrl + serverSubUrlUpdateWallet, wallet);
}

function deleteWalletRaw(id) {
    const wallet = {
        id: id
    }
    serverDeleteWallet(wallet);
}

function serverDeleteWallet(wallet) {
    simplePost(serverUrl + serverSubUrlDeleteWallet, wallet);
}

function serverDep(values) {
    simplePost(serverUrl + serverDepUrl, values);
}

function simplePost(url, body) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(body));
}

function asyncPost(url, body, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onload  = function() {
        callback(xmlHttp.response);
    };
    xmlHttp.send(JSON.stringify(body));
}

function getExistWallets(callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', serverUrl + serverGetWalletsUrl);
    req.onload  = function() {
        callback(req.response);
    };
    req.send();
}

function getBalance(callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', serverUrl + serverGetWalletsUrl);
    req.onload  = function() {
        callback(req.response);
    };
    req.send();
}

    function foo(callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.responseType = 'json';
        httpRequest.onreadystatechange = function () {
                    callback(httpRequest.response);
        };
        httpRequest.open('GET', serverUrl + serverGetWalletsUrl);
        httpRequest.send();
    }

export function saveWallet() {
    saveWalletRaw();
}

export function getWallets(func) {
    getExistWallets(func);
}

export function dep(values) {
    serverDep(values);
}

export function updateWallet(id) {
    updateWalletRaw(id);
}

export function deleteWallet(id) {
    deleteWalletRaw(id);
}

export function payBill(record) {
    return payBillRaw(record);
}

export function payAllBills(record) {
    message.info('Успешная оплата всех счетов.');
    payAllBillsRaw(record);
}