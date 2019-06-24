"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
var web3_utils_1 = require("../../node_modules/web3-utils");
// TODO: import contract address from configfile
var publicKeyRegistry = '0x0b337E2aC98a9725615dE042E950dD8C8b66b0fA';
var credentialRegistry = '0xE4f91b47399Dc2560025Aafb4fFA7Cd5C483330e';
var presentationRegistry = '0x8e78E1BfBdcD1564309d86d4925fCF533a6dcBC8';
var generateAccessTokenFunctionHash = '4284f8d4';
var createAlastriaIdentityFunctionHash = '6d69d99a';
var addSubjectCredentialFunctionHash = 'e04ce02c';
var addSubjectPresentationFunctionHash = '4e3a5de5';
var updateSubjectPresentationFunctionHash = 'e64af938';
var updateReceiverPresentationFunctionHash = '3000dc39';
var addIdentityIssuerFunctionHash = '';
var updateIdentityIssuerEidasLevelFunctionHash = '';
var deleteIdentityIssuerFunctionHash = '';
var getEidasLevelFunctionHash = '';
var alastriaIdentityManager = '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196';
var basicTransaction = {
    from: '',
    to: alastriaIdentityManager,
    data: '',
    gas: 0,
    nonce: ''
};
var zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
var delegateCallSignature = '597b2e9b';
var delegateCallInvoke = function (registryAddress) { return delegateCallSignature + "000000000000000000000000" + registryAddress.slice(2, 40) + zeroValue; };
function generateAccessToken(signAddress) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(alastriaIdentityManager) + "\n  " + generateAccessTokenFunctionHash + "\n  " + web3_utils_1.leftPad(signAddress.slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.generateAccessToken = generateAccessToken;
function createAlastriaIdentity(publicKeyData) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(alastriaIdentityManager) + "\n  " + createAlastriaIdentityFunctionHash + "\n  0000000000000000000000000000000000000000000000000000000000000020\n  " + web3_utils_1.leftPad(web3_utils_1.toHex(publicKeyData.length).slice(2), 64) + "\n  " + web3_utils_1.rightPad(web3_utils_1.toHex(publicKeyData).slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.createAlastriaIdentity = createAlastriaIdentity;
function createIdentity(publicKey) {
    var transaction = basicTransaction;
    transaction.data = "0x6d69d99a\n    0000000000000000000000000000000000000000000000000000000000000020\n    " + web3_utils_1.leftPad(publicKey.length, 64) + "\n    60e6cfd87fdf96e9f8749d267319088775ad1cc245e5cd9fa0d6567426788a3e\n    a10e675e00000000000000000000000000000000000000000000000000000000";
    transaction.gas = 200000;
    return transaction;
}
exports.createIdentity = createIdentity;
/**
 * @param presentationHash should have 32 bytes
 */
var addSubjectPresentationCost = 200000;
function addSubjectCredential(presentationHash, uri) {
    var transaction = basicTransaction;
    transaction.data =
        "0x" + delegateCallInvoke(credentialRegistry) + addSubjectCredentialFunctionHash + presentationHash + "\n    0000000000000000000000000000000000000000000000000000000000000040\n    " + web3_utils_1.leftPad(uri.length, 64) + web3_utils_1.toHex(uri);
    transaction.gas = addSubjectPresentationCost;
    return transaction;
}
exports.addSubjectCredential = addSubjectCredential;
// PresentationRegistry.sol
function addSubjectPresentation(subjectPresentationHash, uri) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(presentationRegistry) + "\n  " + addSubjectPresentationFunctionHash + "\n  " + web3_utils_1.rightPad(subjectPresentationHash.slice(2), 64) + "\n  0000000000000000000000000000000000000000000000000000000000000040\n  " + web3_utils_1.leftPad(web3_utils_1.toHex(uri.length).slice(2), 64) + "\n  " + web3_utils_1.rightPad(web3_utils_1.toHex(uri).slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.addSubjectPresentation = addSubjectPresentation;
function updateSubjectPresentation(subjectPresentationHash, status) {
    var transaction = basicTransaction;
    transaction.data = delegateCallInvoke(presentationRegistry) + "\n  " + updateSubjectPresentationFunctionHash + "\n  " + web3_utils_1.rightPad(subjectPresentationHash.slice(2), 64) + "\n  " + web3_utils_1.leftPad(web3_utils_1.toHex(status).slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.updateSubjectPresentation = updateSubjectPresentation;
function updateReceiverPresentation(receiverPresentationHash, status) {
    var transaction = basicTransaction;
    transaction.data = delegateCallInvoke(presentationRegistry) + "\n  " + updateReceiverPresentationFunctionHash + "\n  " + web3_utils_1.rightPad(receiverPresentationHash.slice(2), 64) + "\n  " + web3_utils_1.leftPad(web3_utils_1.toHex(status).slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.updateReceiverPresentation = updateReceiverPresentation;
// PublicKey Registry TxFactory
function addKey(publicKey) {
    var callSignature = "60e6cfd8";
    var tx = basicTransaction;
    tx.data =
        "0x" + delegateCallInvoke(publicKeyRegistry) + "\n      " + callSignature + "\n      " + web3_utils_1.leftPad(publicKey.slice(2), 64);
    tx.gas = 600000;
    return tx;
}
exports.addKey = addKey;
function revokePublicKey(publicKey) {
    var callSignature = "a8c59169";
    var tx = basicTransaction;
    tx.data =
        "0x" + delegateCallInvoke(publicKeyRegistry) + "\n    " + callSignature + "\n    " + web3_utils_1.leftPad(publicKey.slice(2), 64);
    tx.gas = 600000;
    return tx;
}
exports.revokePublicKey = revokePublicKey;
function deletePublicKey(publicKey) {
    var callSignature = "1993b4f9";
    var tx = basicTransaction;
    tx.data =
        "0x" + delegateCallInvoke(publicKeyRegistry) + "\n    " + callSignature + "\n    " + web3_utils_1.leftPad(publicKey.slice(2), 64);
    tx.gas = 600000;
    return tx;
}
exports.deletePublicKey = deletePublicKey;
// Credential Registry TxFactory
function updateCredentialStatus(issuerCredHash, status) {
    var callSignature = "dd517e10";
    var tx = basicTransaction;
    tx.data =
        "0x" + delegateCallInvoke(credentialRegistry) + "\n    " + callSignature + "\n    " + web3_utils_1.leftPad(issuerCredHash.slice(2), 64) + "\n    " + web3_utils_1.toHex(web3_utils_1.leftPad(status, 64)).slice(2);
    tx.gas = 600000;
    return tx;
}
exports.updateCredentialStatus = updateCredentialStatus;
// AlastriaIdentityIssuer.sol
function addIdentityIssuer(identityIssuer, level) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(alastriaIdentityManager) + addIdentityIssuerFunctionHash + identityIssuer + "\n   0000000000000000000000000000000000000000000000000000000000000040\n   " + web3_utils_1.leftPad(level.length, 64) + web3_utils_1.toHex(level);
    transaction.gas = 600000;
    return transaction;
}
exports.addIdentityIssuer = addIdentityIssuer;
function updateIdentityIssuerEidasLevel(identityIssuer, level) {
    var transaction = basicTransaction;
    transaction.data = delegateCallInvoke(alastriaIdentityManager) + "\n   " + updateIdentityIssuerEidasLevelFunctionHash + "\n   " + web3_utils_1.rightPad(identityIssuer.slice(2), 64) + "\n   " + web3_utils_1.leftPad(web3_utils_1.toHex(level).slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.updateIdentityIssuerEidasLevel = updateIdentityIssuerEidasLevel;
function deleteIdentityIssuer(identityIssuer) {
    var callSignature = "1993b4f9";
    var transaction = basicTransaction;
    transaction.data =
        "0x" + delegateCallInvoke(alastriaIdentityManager) + deleteIdentityIssuerFunctionHash + "\n   " + callSignature + "\n   " + web3_utils_1.leftPad(identityIssuer.slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.deleteIdentityIssuer = deleteIdentityIssuer;
function getEidasLevel(identityIssuer) {
    var transaction = basicTransaction;
    transaction.data = "0x" + delegateCallInvoke(alastriaIdentityManager) + getEidasLevelFunctionHash + "\n   " + web3_utils_1.leftPad(identityIssuer.slice(2), 64);
    return transaction;
}
exports.getEidasLevel = getEidasLevel;
