import { toHex, leftPad } from "../../node_modules/web3-utils";

const basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
}
const delegateCallSignature = '597b2e9b';
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
const delegateCallInvoke = (registryAddress) => { return `${delegateCallSignature}000000000000000000000000${registryAddress.slice(2, 40)}${zeroValue}` }

export function getTransactionAddKey() {
    return {};
}

export function getTransactionRevokePublicKey() {
    return {};
}

export function getTransactionDeletePublicKey() {
    return {};
}

export function getTransactionGetCurrentPublicKey() {
    return {};
}

export function getTransactionGetPublicKeyStatus() {
    return {};
}
