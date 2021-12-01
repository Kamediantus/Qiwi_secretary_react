const formIndex = 0;

const nameIndex = 0;
const phoneIndex = 1;
const tokenIndex = 2;
const full_nameIndex = 3;

const serverUrl = 'http://localhost:8080';
const serverSubUrlSaveWallet = '/save';
const serverGetWalletsUrl = '/wallets';
const serverDepUrl = '/transaction/dep';

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

function serverDep(values) {
    simplePost(serverUrl + serverDepUrl, values);
}

function simplePost(url, body) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
        // httpRequest.open('GET', serverUrl + serverGetWalletsUrl);
        httpRequest.onreadystatechange = function () {
            // if (httpRequest.readyState === 4) { // request is done
            //     if (httpRequest.status === 200) { // successfully
                    callback(httpRequest.response); // we're calling our method
                // }
            // }
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

export function dep(func) {
    serverDep(func);
}