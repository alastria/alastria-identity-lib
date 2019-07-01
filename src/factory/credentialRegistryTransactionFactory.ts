//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import { toHex, leftPad, rightPad } from 'web3-utils';

const basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
}
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
const delegateCallSignature = '597b2e9b';
const delegateCallInvoke = (registryAddress) => { return `${delegateCallSignature}000000000000000000000000${registryAddress.slice(2, 40)}${zeroValue}` }

const getSubjectCredentialListSignature = '52bdf827';
export function getSubjectCredentialList() {
    let transaction = basicTransaction;
    transaction.data = `0x${getSubjectCredentialListSignature}`
    return transaction
}

export function deleteSubjectCredential(subjectCredentialHash) {
  let callSignature = "";
  let transaction = basicTransaction;
  transaction.data = '';
  return transaction;
}

/**
 * @param subject alastria Id
 * @param subjectCredentialHash should have 32 bytes
 */
const getSubjectCredentialStatusSignature = '52bdf827'
export function getSubjectCredentialStatus(subject,subjectCredentialHash) {
    let transaction = basicTransaction;
    transaction.data = `0x${getSubjectCredentialStatusSignature}
    ${leftPad(subject.slice(2), 64)}
    ${rightPad(subjectCredentialHash.slice(2), 64)}`
    return transaction
}


export function getIssuerCredentialStatus(issuerAddr, issuerCredentialHash) {
    let callSignature = '5faf7d94';
    let tx = basicTransaction;
    tx.data = `0x${callSignature}
        ${leftPad(issuerAddr.slice(2), 64)}
        ${rightPad(issuerCredentialHash.slice(2), 64)}`;
    tx.gas = 600000;
    return tx;
}

export function getCredentialStatus(subjectStatus, issuerStatus) {
    let callSignature = '5faf7d94';
    let tx = basicTransaction;
    tx.data = `0x${callSignature}
        ${leftPad(toHex(subjectStatus).slice(2), 64)}
        ${leftPad(toHex(issuerStatus).slice(2), 64)}`;
    tx.gas = 600000;
    return tx;
}
