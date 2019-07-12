const {transactionFactory, UserIdentity, tokensFactory} = require('alastria-identity-lib')
let Web3 = require('web3')
let keythereum = require('keythereum')

//let myBlockchainServiceIp = 'http://yourIP:RPCPort'
let myBlockchainServiceIp = 'http://127.0.0.1:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp))

let userWallet = '6e3976aeaa3a59e4af51783cc46ee0ffabc5dc11'
let keyStore = {"address":"6e3976aeaa3a59e4af51783cc46ee0ffabc5dc11","crypto":{"cipher":"aes-128-ctr","ciphertext":"463a0bc2146023ac4b85f4e3675c338facb0a09c4f83f5f067e2d36c87a0c35e","cipherparams":{"iv":"d731f9793e33b3574303a863c7e68520"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"876f3ca79af1ec9b77f181cbefc45a2f392cb8eb99fe8b3a19c79d62e12ed173"},"mac":"230bf3451a7057ae6cf77399e6530a88d60a8f27f4089cf0c07319f1bf9844b3"},"id":"9277b6ec-6c04-4356-9e1c-dee015f459c5","version":3}
let userPrivateKey
try{
	userPrivateKey = keythereum.recover('Passw0rd', keyStore)
}catch(error){
	console.log("ERROR: ", error)
}

let identityForUse = new UserIdentity(web3, userWallet, userPrivateKey)

// Example of creating, signing and sending a tx
let subjectPresentationHash = 'subject-presentation-hash'
let uri = 'presentation-identifier-in-repository'
let tx = transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri)
console.log(tx);
identityForUse.addTransaction(tx)
let signedTransactionStack = identityForUse.getSignedTransactions()
console.log(signedTransactionStack)

/*let signedTx = signedTransactionStack[0]
console.log("SIGNED TX ", signedTx)
web3.eth.sendSignedTransaction(signedTx, (result, error) => {
	console.log("SEND", result, error)
})*/

// Using sign and verify functions which not directly interact with the blockchain

// Some fake data to test
const rawPublicKey = '03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479'

const rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'

let tokenPayload = {"iat": 1440713414.85}

//Sign a presentation request
let signedjwt = tokensFactory.presentation.signPresentationRequest(tokenPayload, rawPrivateKey)
console.log('The signed jwt is: ', signedjwt)

//Verify the signed presentation request and get the decoded token
let jwt = tokensFactory.presentation.verifyPresentationRequest(signedjwt, rawPublicKey)
console.log('The verified token is:', jwt)

//Sign a presentation
signedjwt = tokensFactory.presentation.signPresentation(tokenPayload, rawPrivateKey)
console.log('The signed jwt is: ', signedjwt)

//Verify the signed presentation and get the decoded token
jwt = tokensFactory.presentation.verifyPresentation(signedjwt, rawPublicKey)
console.log('The verified token is:', jwt)

