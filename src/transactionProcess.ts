import EthereumTx from 'ethereumjs-tx';

const alastriaIdentityManager = '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196';

export class UserIdentity {
    public endPoint: string;
    public address: string;
    private privateKey: string;
    public transactions: object[];
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

    public addTransaction(transaction) {
        this.transactions.push(customize(transaction,{}));
    }

    public signTransactions(){
        let processedTransactions = [];
        this.transactions.forEach(transaction => {
            processedTransactions.push(signTransaction(transaction,this.privateKey));
        });
        this.transactions = []
        return processedTransactions;
    }
}

/**
* Customize the transaction with the user data
* @param transaction 
* @param user 
*/
function customize(transaction, user) {
    try {
        transaction.nonce = getUserNonce(this.endPoint, 'web3', this.address);
        transaction.to = alastriaIdentityManager;
        return transaction;
    } catch(err) {
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
        const tx = new EthereumTx(transaction);
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
            endPoint.getTransactionCount(address);
        }
        default: {
            endPoint.getTransactionCount(address);
        }
    }
}
