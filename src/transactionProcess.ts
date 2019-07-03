//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import * as EthereumTxAll from 'ethereumjs-tx';
// import Web3 from 'web3';

//TODO not hardcoded, import from config file
const alastriaIdentityManager = '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196';

export class UserIdentity {
    public endPoint: any;
    public address: string;
    private privateKey: string;
    public transactions = new Array<any>();
    /**
     * 
     * @param _endPoint 
     * @param _address 
     * @param _privateKey get from keythereum.recover(password, JSON.parse(fs.readFileSync(keyStorePath, 'utf8'))),
     */
    public constructor(_endPoint, _address, _privateKey) {
        this.endPoint = _endPoint;
        this.address = _address;
        this.privateKey = _privateKey;
    }

    public addTransaction(transaction, target) {
        this.transactions.push(this.customize(transaction, {}));
    }

    public getSignedTransactions() {
        let processedTransactions = [];
        this.transactions.forEach(transaction => {
            processedTransactions.push(signTransaction(transaction, this.privateKey));
        });
        this.transactions = []
        return processedTransactions;
    }

    /**
    * Customize the transaction with the user data
    * @param transaction 
    * @param user 
    */
    private customize(transaction, user) {
        try {
            transaction.nonce = getUserNonce(this.endPoint, 'web3', this.address);
            return transaction;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

/**
 * Sign the payload data
 * @param {object} transaction transaction to be signed
 * @return {string} tx hash
 */
function signTransaction(transaction, privateKey) {
    try {
        const tx = new EthereumTxAll(transaction);
        tx.sign(privateKey);
        const signedTx = `0x${tx.serialize().toString('hex')}`;
        return signedTx;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function getUserNonce(endPoint, type, address) {
    switch (type) {
        case 'web3': {
            endPoint.eth.getTransactionCount(address);
            break;
        }
        default: {
            endPoint.eth.getTransactionCount(address);
        }
    }
}
