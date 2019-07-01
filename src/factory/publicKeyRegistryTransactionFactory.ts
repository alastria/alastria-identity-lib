import { toHex, leftPad, rightPad } from "web3-utils";

const basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
}

export function getCurrentPublicKey(addr) {
    let callSignature = '31f7f259';
    let tx = basicTransaction;
    let preparedAddr = leftPad(addr.slice(2), 64);
    tx.data = `0x${callSignature}${preparedAddr}`;
    tx.gas = 600000;
    return tx;
}

export function getPublicKeyStatus(addr, publicKey) {
    let callSignature = '1226f6a5';
    let tx = basicTransaction;
    let preparedAddr = leftPad(addr.slice(2), 64);
    tx.data = `0x${callSignature}
        ${preparedAddr}
        ${rightPad(publicKey.slice(2), 64)}`;
    tx.gas = 600000;
    return tx;
}
