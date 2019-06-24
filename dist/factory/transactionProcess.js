"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
var ethereumjs_tx_1 = require("ethereumjs-tx");
//TODO not hardcoded, import from config file
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
        this.transactions.push(this.customize(transaction, {}));
    };
    UserIdentity.prototype.getSignedTransactions = function () {
        var _this = this;
        var processedTransactions = [];
        this.transactions.forEach(function (transaction) {
            processedTransactions.push(signTransaction(transaction, _this.privateKey));
        });
        this.transactions = [];
        return processedTransactions;
    };
    /**
    * Customize the transaction with the user data
    * @param transaction
    * @param user
    */
    UserIdentity.prototype.customize = function (transaction, user) {
        try {
            transaction.nonce = getUserNonce(this.endPoint, 'web3', this.address);
            return transaction;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
    return UserIdentity;
}());
exports.UserIdentity = UserIdentity;
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
