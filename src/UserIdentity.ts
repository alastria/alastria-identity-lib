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
    public constructor(_endPoint, _address, _privateKey, _initialNonce) {
        this.endPoint = _endPoint;
        this.address = _address;
        this.privateKey = _privateKey;
        this.nonce = _initialNonce;
    }

    /**
     * @Dev Add an anonimous transaction to the user, signed but not sended
     * @param transaction
     */
    public addTransaction(transaction) {
        this.transactions.push(this.customize(transaction));
    }
/*
    public addTransaction(transaction) {
        return new Promise((resolve, reject) => {
            nonceType = 'web3'
            this.customize(transaction)
            .then(tx => {
                console.log("ADD TRANSACTION ", tx);
                this.transactions.push(tx)
                resolve(this.transactions)
            })
            .catch(error => {
                console.log('ERROR -> ', error)
                reject(error)
            })
        })
    }*/

    /**
     * @Dev Returns all the transactions signed for the user. Empty the stack
     */
    public getSignedTransactions() {
        let processedTransactions = [];
        //TODO: the function can be simplified with processedTransactions=this.transactions. Check.
        this.transactions.map(transaction => {
            processedTransactions.push(this.signTransaction(transaction, this.privateKey));
        });
        this.transactions = []
        return processedTransactions;
    }

    /**
     * @Dev Returns a signed transaction
     *   @param {web3} web3 object
     *   @param {tx} transaction
     */
    public async sendSignedTransaction(web3, tx) {
	     return new Promise((resolve, reject) => {
		       web3.eth.sendSignedTransaction(tx, (err, sendSignedHash) => {
			      if (err) { console.log(err); return; }
			      resolve(sendSignedHash);
    		});
    	});
    }

    /**
     * @Dev Returns a signed transaction
     *   @param {web3} web3 object
     *   @param {tx} transaction
     */
    public async call(web3, tx) {
	     return new Promise((resolve, reject) => {
		       web3.eth.call(tx, (err, outputTx) => {
			      if (err) { console.log(err); return; }
			      resolve(outputTx);
    		});
    	});
    }


    /**
    * @Dev Returns a known transaction from an anonimous transaction
    */
    public async getKnownTransaction(transaction) {
      return new Promise((resolve, reject) => {
          this.customize(transaction)
          .then(customizedTransaction => {
            var signedTx = this.signTransaction(customizedTransaction,this.privateKey)
            resolve(signedTx);
          })
          .catch(error => {
              console.log(error)
              reject(error)
          })
      })
    }


    /**
    * Customize the transaction with the user data
    * @param transaction
    */
    private async customize(transaction) {
        return new Promise((resolve, reject) => {
            this.getUserNonce(this.endPoint, transaction.from)
            .then(mynonce => {
                transaction.nonce = mynonce
                transaction.gasPrice = 0;
                resolve(transaction)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    /**
     * Sign the payload data
     * @param {object} transaction transaction to be signed
     * @return {string} tx hash
     */
     public signTransaction(transaction, privateKey) {
         try {
             const tx = new EthereumTxAll(transaction);
             let privKeyBuffered = Buffer.from(privateKey, 'hex')
             tx.sign(privKeyBuffered);
             const signedTx = `0x${tx.serialize().toString('hex')}`;
             return signedTx;
         } catch (err) {
             console.log(err);
             throw err;
         }
     }

     // public signTransaction(web3, transaction, privateKey){
     //   return new Promise((resolve, reject) => {
     //       web3.eth.accounts.signTransaction(transaction, privateKey)
     //       .then(result => {
     //         console.log("RESULT ---------------->",result)
     //         resolve(result);
     //       })
     //       .catch(error => {
     //           console.log(error)
     //           reject(error)
     //       })
     //   })
     // }

    /**
    *   Calculate the user nonce.
    *   It is async to ask Web3 bust it is sync to set it manually
    *   TODO: review the promise
    *   @param {object} endPoint
    *   @param {string} type web3, selfManaged or others..
    *   @param {address} address user
    */
    private getUserNonce(endPoint, address) {
        return new Promise((resolve, reject) => {
            let nonce
            endPoint.eth.getTransactionCount(address)
            .then(mynonce => {
                nonce = mynonce
                resolve(nonce)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
}
