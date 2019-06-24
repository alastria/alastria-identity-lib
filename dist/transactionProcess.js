"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethereumjs_tx_1 = require("ethereumjs-tx");
var alastriaIdentityManager = '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196';
var UserIdentity = /** @class */ (function () {
    /**
     *
     * @param _endPoint
     * @param _address
     * @param _privateKey get from keythereum.recover(password, JSON.parse(fs.readFileSync(keyStorePath, 'utf8'))),
     */
    function UserIdentity(_endPoint, _address, _privateKey) {
        this.endPoint = _endPoint;
        this.address = _address;
        this.privateKey = _privateKey;
    }
    UserIdentity.prototype.addTransaction = function (transaction, target) {
        this.transactions.push(customize(transaction, {}, this.endPoint, this.address, target));
    };
    UserIdentity.prototype.signTransactions = function () {
        var _this = this;
        var processedTransactions = [];
        this.transactions.forEach(function (transaction) {
            processedTransactions.push(signTransaction(transaction, _this.privateKey));
        });
        this.transactions = [];
        return processedTransactions;
    };
    return UserIdentity;
}());
exports.UserIdentity = UserIdentity;
/**
* Customize the transaction with the user data
* @param transaction
* @param user
*/
function customize(transaction, user, endPoint, address, target) {
    try {
        transaction.nonce = getUserNonce(endPoint, 'web3', address);
        transaction.to = target;
        return transaction;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
/**
 * Sign the payload data
 * @param {object} transaction transaction to be signed
 * @return {string} tx hash
 */
function signTransaction(transaction, privateKey) {
    try {
        var tx = new ethereumjs_tx_1.default(transaction);
        tx.sign(privateKey);
        var signedTx = "0x" + tx.serialize().toString('hex');
        return signedTx;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
function getUserNonce(endPoint, type, address) {
    switch (type) {
        case 'web3': {
            endPoint.getTransactionCount(address);
        }
        default: {
            endPoint.getTransactionCount(address);
        }
    }
}
