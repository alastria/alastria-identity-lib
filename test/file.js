const {transactionFactory, UserIdentity, tokensFactory} = require('alastria-identity-lib')
let Web3 = require('web3')
let keythereum = require('keythereum')

//let myBlockchainServiceIp = 'http://yourIP:RPCPort'
let myBlockchainServiceIp = 'http://63.33.206.111/rpc'
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp))

// Instantiate a UserIdentity for an existing Service Provider
let existingSPAddress = '0xda80820ade1f39fea17acdb0531e2bb3bd29bf72'
let existingSPkeyStore = {"address":"da80820ade1f39fea17acdb0531e2bb3bd29bf72","crypto":{"cipher":"aes-128-ctr","ciphertext":"dcd1fa9399361c3b3dc1159d5e203c9ec823afb220f86c9c2d1d21d587b7d54a","cipherparams":{"iv":"097471b53645c92a66d082be0bdc3015"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"f0b6f108c60db715678b574f7807265b82b48b811b863496670287f1fee135c0"},"mac":"de93caf38eb66db86b95fec190cbfd101840e32b93529acdb315a8734f62c389"},"id":"744e725d-3968-4de4-ad8d-de53d912a0b6","version":3}
let existingSPPrivateKey
try{
	existingSPPrivateKey = keythereum.recover('Passw0rd', existingSPkeyStore)
}catch(error){
	console.log("ERROR: ", error)
}
// TODO find a better name to avoid "new", such as, UserIdentity.get_X_FromExistingIdentity
let existingSPIdentity = new UserIdentity(web3, existingSPAddress, existingSPPrivateKey, 1)
console.log(existingSPPrivateKey)
// Add a new Service Provider in Alastria, just its address
let newSPAddress = '0xda80820ade1f39fea17acdb0531e2bb3bd29bf74'

/*let anonimousTxAddIdentitySP = transactionFactory.identityManager.addIdentityServiceProvider(newSPAddress)
console.log("anonimousTxAddIdentitySP ", anonimousTxAddIdentitySP)
existingSPIdentity.addTransaction(anonimousTxAddIdentitySP, 'selfManaged')
console.log("TRANSACTIONS", existingSPIdentity.transactions)
let signedTransactionStack = existingSPIdentity.getSignedTransactions()
let signedTxAddIdentitySP = signedTransactionStack[0] // to get the one that we just added -> TODO make in batch
console.log("signedTxAddIdentitySP ", signedTxAddIdentitySP)
web3.eth.sendSignedTransaction(signedTxAddIdentitySP, (result, error) => {
	console.log("SEND", result, error)
})*/

let ret = existingSPIdentity.signTransaction(
	{ to: "0xf18bd0f5a4f3944f3074453ce2015e8af12ed196",
	  data: "0x0ebbbffc000000000000000000000000da80820ade1f39fea17acdb0531e2bb3bd29bf74",
	  gas: 600000,
	  gasPrice: 0,
	  nonce: 1 },
	existingSPPrivateKey)

console.log("RET", ret)

/*
Create a UserIdentity for the new Service Provider, we just created

let newSPKeyStore = {"address":"da80820ade1f39fea17acdb0531e2bb3bd29bf72","crypto":{"cipher":"aes-128-ctr","ciphertext":"dcd1fa9399361c3b3dc1159d5e203c9ec823afb220f86c9c2d1d21d587b7d54a","cipherparams":{"iv":"097471b53645c92a66d082be0bdc3015"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"f0b6f108c60db715678b574f7807265b82b48b811b863496670287f1fee135c0"},"mac":"de93caf38eb66db86b95fec190cbfd101840e32b93529acdb315a8734f62c389"},"id":"744e725d-3968-4de4-ad8d-de53d912a0b6","version":3}
let newSPPrivateKey;
try{
	newSPPrivateKey = keythereum.recover('Passw0rd', newSPKeyStore)
}catch(error){
	console.log("ERROR: ", error)
}
let newSPIdentity = new UserIdentity(web3, existingSPAddress, existingSPPrivateKey)
*/

/*
// Example of creating, signing and sending a tx
let subjectPresentationHash = 'subject-presentation-hash'
let uri = 'presentation-identifier-in-repository'
let tx = transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri)
console.log(tx)
identityForUse.addTransaction(tx)
let signedTransactionStack = identityForUse.getSignedTransactions()
console.log(signedTransactionStack)

let signedTx = signedTransactionStack[0]
console.log("SIGNED TX ", signedTx)
web3.eth.sendSignedTransaction(signedTx, (result, error) => {
	console.log("SEND", result, error)
})

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
*/
