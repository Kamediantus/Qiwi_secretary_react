const formIndex = 0;

const nameIndex = 0;
const phoneIndex = 1;
const tokenIndex = 2;
const full_nameIndex = 3;

function validateNameRaw() {
    const name = {
        name: document.forms.item(formIndex).elements.item(nameIndex).value,
    }
    let result = '';

    if (name.name === '') {
        console.log('Name should be specified.')
        result += 'Name should be specified.\n';
    }
    return result === '' ? 'OK' : result;
}
function validatePhoneRaw(phone) {
    console.log(phone)
    if (phone.length != 11) {
        return false;
    }
}


export function validateName() {
    validateNameRaw();
}

export function validatePhone() {
    validatePhoneRaw();
}