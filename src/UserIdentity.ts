// With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
// TODO: change encoding when v1.0.0 releases stable version
import * as EthereumTxAll from 'ethereumjs-tx'
import { AddressUtils } from './utils/AddressUtils'

export class UserIdentity {
  public endPoint: any
  public address: string
  private privateKey: any
  public transactions: any[]
  public nonce: number

  /**
   *
   * @param _endPoint
   * @param _address
   * @param _privateKey get from keythereum.recover(password, JSON.parse(fs.readFileSync(keyStorePath, 'utf8'))),
   */
  public constructor(_endPoint, _address, _privateKey, _initialNonce) {
    this.endPoint = _endPoint
    this.address = AddressUtils.getAddressWithHexPrefix(_address)
    this.privateKey = _privateKey
    this.nonce = _initialNonce
  }

  /**
   * @Dev Add an anonimous transaction to the user, signed but not sended
   * @param transaction
   */
  public addTransaction(transaction) {
    this.transactions.push(this.customize(transaction))
  }

  /**
   * @Dev Returns all the transactions signed for the user. Empty the stack
   */
  public getSignedTransactions() {
    const processedTransactions = []
    this.transactions.forEach((transaction) => {
      processedTransactions.push(
        this.signTransaction(transaction, this.privateKey)
      )
    })
    this.transactions = []
    return processedTransactions
  }

  /**
   * @Dev Returns a known transaction from an anonimous transaction
   */
  public async getKnownTransaction(transaction) {
    const customizedTransaction = await this.customize(transaction)
    const signedTx = await this.signTransaction(
      customizedTransaction,
      this.privateKey
    )
    return signedTx
  }

  /**
   * Customize the transaction with the user data
   * @param transaction
   */
  private async customize(transaction) {
    const mynonce = await this.getUserNonce(this.endPoint, this.address)
    transaction.nonce = mynonce
    transaction.gasPrice = 0
    return transaction
  }

  /**
   * Sign the payload data
   * @param {object} transaction transaction to be signed
   * @return {string} tx hash
   */
  public signTransaction(transaction, privateKey) {
    try {
      const tx = new EthereumTxAll(transaction)
      const privKeyBuffered = Buffer.from(privateKey, 'hex')
      tx.sign(privKeyBuffered)
      const signedTx = `0x${tx.serialize().toString('hex')}`
      return signedTx
    } catch (err) {
      console.log(err)
      throw err
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
  private async getUserNonce(endPoint, address) {
    try {
      return await endPoint.eth.getTransactionCount(address)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
