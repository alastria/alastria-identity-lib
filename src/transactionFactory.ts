import { toHex, leftPad } from "web3-utils";

const basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
}
const delegateCallSignature = '597b2e9b';
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
const delegateCallInvoke = (registryAddress)=>{return `${delegateCallSignature}000000000000000000000000${registryAddress.slice(2,40)}${zeroValue}`} 

export function createPublicKeyDidDocument() {
    let transaction = basicTransaction;
    transaction.data = `0x6d69d99a
    0000000000000000000000000000000000000000000000000000000000000020
    0000000000000000000000000000000000000000000000000000000000000024
    60e6cfd87fdf96e9f8749d267319088775ad1cc245e5cd9fa0d6567426788a3e
    a10e675e00000000000000000000000000000000000000000000000000000000`;
    transaction.gas = 200000;
    return transaction;
}

export function createClaim(registryAddress){
    let transaction = basicTransaction;
    transaction.data = `0x${delegateCallInvoke(registryAddress)}`;
    transaction.gas = ;

    return transaction;
}

export function revokeClaim(registryAddress) {
    let transaction = basicTransaction;
    transaction.data = `0x${delegateCallInvoke(registryAddress)}`;
    transaction.gas = ;
    return transaction;
}

/**
 * 
 * @param registryAddress
 * @param presentationHash should have 32 bytes
 */
const addSubjectPresentationSignature = '4e3a5de5';
const addSubjectPresentationCost = 200000;
export function addSubjectPresentation(registryAddress,presentationHash,uri) {
    let transaction = basicTransaction;
    transaction.data = 
    `0x${delegateCallInvoke(registryAddress)}${addSubjectPresentationSignature}${presentationHash}
    0000000000000000000000000000000000000000000000000000000000000040
    ${leftPad(uri.length,64)}${toHex(uri)}`;
    transaction.gas = addSubjectPresentationCost;
    return transaction;
}

const getSubjectCredentialListSignature = '52bdf827';
export function getSubjectCredentialList() {
    let transaction = basicTransaction;
    transaction.data = `0x${getSubjectCredentialListSignature}`
    return transaction
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

