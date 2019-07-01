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
var getSubjectPresentationStatusFunctionHash = '0x5205080f';
var getSubjectPresentationListFunctionHash = '0xee47717f';
var getReceiverPresentationStatusFunctionHash = '0x9373014a';
var getPresentationStatusFunctionHash = '0x034f8408';
function getSubjectPresentationStatus(subject, subjectPresentationHash) {
    var transaction = basicTransaction;
    transaction.data = getSubjectPresentationStatusFunctionHash + "\n  " + web3_utils_1.leftPad(subject.slice(2), 64) + "\n  " + web3_utils_1.rightPad(subjectPresentationHash.slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.getSubjectPresentationStatus = getSubjectPresentationStatus;
function getSubjectPresentationList() {
    var transaction = basicTransaction;
    transaction.data = "" + getSubjectPresentationListFunctionHash;
    transaction.gas = 600000;
    return transaction;
}
exports.getSubjectPresentationList = getSubjectPresentationList;
function getReceiverPresentationStatus(receiver, receiverPresentationHash) {
    var transaction = basicTransaction;
    transaction.data = getReceiverPresentationStatusFunctionHash + "\n  " + web3_utils_1.leftPad(receiver.slice(2), 64) + "\n  " + web3_utils_1.rightPad(receiverPresentationHash.slice(32), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.getReceiverPresentationStatus = getReceiverPresentationStatus;
function getPresentationStatus(subjectStatus, receiverStatus) {
    var transaction = basicTransaction;
    transaction.data = getPresentationStatusFunctionHash + "\n  " + web3_utils_1.leftPad(web3_utils_1.toHex(subjectStatus).slice(2), 64) + "\n  " + web3_utils_1.leftPad(web3_utils_1.toHex(receiverStatus).slice(2), 64);
    transaction.gas = 600000;
    return transaction;
}
exports.getPresentationStatus = getPresentationStatus;
