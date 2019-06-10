//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import { toHex, leftPad } from "../../node_modules/web3-utils";

const basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
}
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';

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