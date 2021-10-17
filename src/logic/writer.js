import data from '../data/wallets.json'

function test() {
    console.log(document.forms.item(0).elements.item(0).value)
    // console.log(document.getElementById("phone").value)
}

function saveWallet(s_name, s_phone, s_token, s_fio) {
    const wallet = {
        name: document.forms.item(0).elements.item(0).value,
        phone: document.forms.item(0).elements.item(1).value,
        token: document.forms.item(0).elements.item(2).value,
        full_name: document.forms.item(0).elements.item(3).value
    }
    console.log(wallet.name)
    console.log(wallet)
}

export function dark() {
    test();
}
export function newWallet() {
    saveWallet();
}
