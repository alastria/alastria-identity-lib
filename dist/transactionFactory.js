"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_utils_1 = require("web3-utils");
var basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
};
var delegateCallSignature = '597b2e9b';
var zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
var delegateCallInvoke = function (registryAddress) { return delegateCallSignature + "000000000000000000000000" + registryAddress.slice(2, 40) + zeroValue; };
function createPublicKeyDidDocument() {
    var transaction = basicTransaction;
    transaction.data = "0x6d69d99a\n    0000000000000000000000000000000000000000000000000000000000000020\n    0000000000000000000000000000000000000000000000000000000000000024\n    60e6cfd87fdf96e9f8749d267319088775ad1cc245e5cd9fa0d6567426788a3e\n    a10e675e00000000000000000000000000000000000000000000000000000000";
    transaction.gas = 200000;
    return transaction;
}
exports.createPublicKeyDidDocument = createPublicKeyDidDocument;
function createClaim(registryAddress) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(registryAddress);
    transaction.gas = ;
    return transaction;
}
exports.createClaim = createClaim;
function revokeClaim(registryAddress) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(registryAddress);
    transaction.gas = ;
    return transaction;
}
exports.revokeClaim = revokeClaim;
/**
 *
 * @param registryAddress
 * @param presentationHash should have 32 bytes
 */
var addSubjectPresentationSignature = '4e3a5de5';
var addSubjectPresentationCost = 200000;
function addSubjectPresentation(registryAddress, presentationHash, uri) {
    var transaction = basicTransaction;
    transaction.data =
        "0x" + delegateCallInvoke(registryAddress) + addSubjectPresentationSignature + presentationHash + "\n    0000000000000000000000000000000000000000000000000000000000000040\n    " + web3_utils_1.leftPad(uri.length, 64) + web3_utils_1.toHex(uri);
    transaction.gas = addSubjectPresentationCost;
    return transaction;
}
exports.addSubjectPresentation = addSubjectPresentation;
var getSubjectCredentialListSignature = '52bdf827';
function getSubjectCredentialList() {
    var transaction = basicTransaction;
    transaction.data = "0x" + getSubjectCredentialListSignature;
    return transaction;
}
exports.getSubjectCredentialList = getSubjectCredentialList;
/**
 * @param subject alastria Id
 * @param subjectCredentialHash should have 32 bytes
 */
var getSubjectCredentialStatusSignature = '52bdf827';
function getSubjectCredentialStatus(subject, subjectCredentialHash) {
    var transaction = basicTransaction;
    transaction.data = "0x" + getSubjectCredentialStatusSignature + "\n    " + web3_utils_1.leftPad(subject, 64) + "\n    " + subjectCredentialHash;
    return transaction;
}
exports.getSubjectCredentialStatus = getSubjectCredentialStatus;
