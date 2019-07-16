//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import * as EthereumTxAll from 'ethereumjs-tx';
// import Web3 from 'web3';

//TODO not hardcoded, import from config file
const alastriaIdentityManager = '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196';

export class UserIdentity {
    public endPoint: any;
    public address: string;
    private privateKey: any;
    public transactions = new Array<any>();
    public nonce: number;

    /**
     *
     * @param _endPoint
     * @param _address
     * @param _privateKey get from keythereum.recover(password, JSON.parse(fs.readFileSync(keyStorePath, 'utf8'))),
     */
    public constructor(_endPoint, _address, _privateKey, _startingNonce=0) {
        this.endPoint = _endPoint;
        this.address = _address;
        this.privateKey = _privateKey;
        this.nonce = _startingNonce;
    }

    public addTransaction(transaction, nonceType) {
      let tx =this.customize(transaction, nonceType);
        this.transactions.push(tx);
        console.log("ADD TRANSACTION ", tx);
    }

    public getSignedTransactions() {
        let processedTransactions = [];
        this.transactions.map(transaction => {
            processedTransactions.push(this.signTransaction(transaction, this.privateKey));
        });
        this.transactions = []
        return processedTransactions;
    }

    /**
    * Customize the transaction with the user data
    * @param transaction
    * @param user  //TODO quitar
    */
    private customize(transaction, nonceType) {
      transaction.nonce = this.getUserNonce(this.endPoint, nonceType, this.address)
      transaction.gasprice = 0;
        /*.then((result) => {
          console.log(result);
          transaction.nonce = result;
          transaction.gasprice = 0;
          return result;
        });*/
        return transaction;
    }

    /**
     * Sign the payload data
     * @param {object} transaction transaction to be signed
     * @return {string} tx hash
     */
    public signTransaction(transaction, privateKey) {
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

    /**
    *   Calculate the user nonce.
    *   It is async to ask Web3 bust it is sync to set it manually
    *   TODO: review the promise
    *   @param {object} endPoint
    *   @param {string} type web3, selfManaged or others..
    *   @param {address} address user
    */
    private getUserNonce(endPoint, type, address) {
        let nonce;
        switch (type) {
            case 'web3': {
                nonce = endPoint.eth.getTransactionCount(address);
                break;
            }
            case 'selfManaged': {
                nonce = this.nonce;
                this.nonce += 1;
                break;
            }
            default: {
                nonce = endPoint.getTransactionCount(address);
            }
        }
        return nonce;
    }
}
