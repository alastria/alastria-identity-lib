"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_utils_1 = require("../../node_modules/web3-utils");
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
function getCurrentPublicKey(addr) {
    var callSignature = '31f7f259';
    var tx = basicTransaction;
    var preparedAddr = web3_utils_1.leftPad(addr.slice(2), 64);
    tx.data = "0x" + callSignature + preparedAddr;
    tx.gas = 600000;
    return tx;
}
exports.getCurrentPublicKey = getCurrentPublicKey;
function getPublicKeyStatus(addr, publicKey) {
    var callSignature = '1226f6a5';
    var tx = basicTransaction;
    var preparedAddr = web3_utils_1.leftPad(addr.slice(2), 64);
    tx.data = "0x" + callSignature + "\n        " + preparedAddr + "\n        " + web3_utils_1.rightPad(publicKey.slice(2), 64);
    tx.gas = 600000;
    return tx;
}
exports.getPublicKeyStatus = getPublicKeyStatus;
