const formIndex = 0;

const nameIndex = 0;
const phoneIndex = 1;
const tokenIndex = 2;
const full_nameIndex = 3;

const serverUrl = 'http://localhost:8080';
const serverSubUrlSaveWallet = '/save';

function saveWalletRaw() {
    const wallet = {
        name: document.forms.item(formIndex).elements.item(nameIndex).value,
        phone: document.forms.item(formIndex).elements.item(phoneIndex).value,
        token: document.forms.item(formIndex).elements.item(tokenIndex).value,
        full_name: document.forms.item(formIndex).elements.item(full_nameIndex).value
    }
    let result = '';

    if (wallet.name === '') {
        console.log('Name should be specified.')
        result += 'Name should be specified.\n';
    }
    if (wallet.phone === '') {
        console.log('Phone should be specified.')
        result += 'Phone should be specified.\n';
    }
    if (wallet.token === '') {
        console.log('API token should be specified.')
        result += 'API token should be specified.';
    }
    console.log(wallet)

    saveWalletToFile(wallet);

    return result === '' ? 'OK' : result;
}

function saveWalletToFile(wallet) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", serverUrl + serverSubUrlSaveWallet, true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(wallet));
}

export function saveWallet() {
    saveWalletRaw();
}