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

/**
 * 
 * @param registryAddress
 * @param presentationHash should have 32 bytes
 */
const addSubjectPresentationSignature = '4e3a5de5';
const addSubjectPresentationCost = 200000;
export function addSubjectCredential(registryAddress, presentationHash, uri) {
    let transaction = basicTransaction;
    transaction.data =
        `0x${delegateCallInvoke(registryAddress)}${addSubjectPresentationSignature}${presentationHash}
    0000000000000000000000000000000000000000000000000000000000000040
    ${leftPad(uri.length, 64)}${toHex(uri)}`;
    transaction.gas = addSubjectPresentationCost;
    return transaction;
}

const getSubjectCredentialListSignature = '52bdf827';
export function getSubjectCredentialList() {
    let transaction = basicTransaction;
    transaction.data = `0x${getSubjectCredentialListSignature}`
    return transaction
}

export function getTransactionDeleteSubjectCredential() {
    return {};
}

/**
 * @param subject alastria Id
 * @param subjectCredentialHash should have 32 bytes 
 */
const getSubjectCredentialStatusSignature = '52bdf827'
export function getSubjectCredentialStatus(subject,subjectCredentialHash) {
    let transaction = basicTransaction;
    transaction.data = `0x${getSubjectCredentialStatusSignature}
    ${leftPad(subject,64)}
    ${subjectCredentialHash}`
    return transaction
}

export function getTransactionUpdateCredentialStatus() {
    return {};
}

export function getTransactionGetIssuerCredentialStatus() {
    return {};
}

export function getTransactionGetCredentialStatus() {
    return {};
}