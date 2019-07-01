"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
var web3_utils_1 = require("web3-utils");
var basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
};
var zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
var delegateCallSignature = '597b2e9b';
var delegateCallInvoke = function (registryAddress) { return delegateCallSignature + "000000000000000000000000" + registryAddress.slice(2, 40) + zeroValue; };
var getSubjectCredentialListSignature = '52bdf827';
function getSubjectCredentialList() {
    var transaction = basicTransaction;
    transaction.data = "0x" + getSubjectCredentialListSignature;
    return transaction;
}
exports.getSubjectCredentialList = getSubjectCredentialList;
function deleteSubjectCredential(subjectCredentialHash) {
    var callSignature = "";
    var transaction = basicTransaction;
    transaction.data = '';
    return transaction;
}
exports.deleteSubjectCredential = deleteSubjectCredential;
/**
 * @param subject alastria Id
 * @param subjectCredentialHash should have 32 bytes
 */
var getSubjectCredentialStatusSignature = '52bdf827';
function getSubjectCredentialStatus(subject, subjectCredentialHash) {
    var transaction = basicTransaction;
    transaction.data = "0x" + getSubjectCredentialStatusSignature + "\n    " + web3_utils_1.leftPad(subject.slice(2), 64) + "\n    " + web3_utils_1.rightPad(subjectCredentialHash.slice(2), 64);
    return transaction;
}
exports.getSubjectCredentialStatus = getSubjectCredentialStatus;
function getIssuerCredentialStatus(issuerAddr, issuerCredentialHash) {
    var callSignature = '5faf7d94';
    var tx = basicTransaction;
    tx.data = "0x" + callSignature + "\n        " + web3_utils_1.leftPad(issuerAddr.slice(2), 64) + "\n        " + web3_utils_1.rightPad(issuerCredentialHash.slice(2), 64);
    tx.gas = 600000;
    return tx;
}
exports.getIssuerCredentialStatus = getIssuerCredentialStatus;
function getCredentialStatus(subjectStatus, issuerStatus) {
    var callSignature = '5faf7d94';
    var tx = basicTransaction;
    tx.data = "0x" + callSignature + "\n        " + web3_utils_1.leftPad(web3_utils_1.toHex(subjectStatus).slice(2), 64) + "\n        " + web3_utils_1.leftPad(web3_utils_1.toHex(issuerStatus).slice(2), 64);
    tx.gas = 600000;
    return tx;
}
exports.getCredentialStatus = getCredentialStatus;
