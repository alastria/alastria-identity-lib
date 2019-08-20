/*
 * This file is a tutorial of using the alastria-identity-lib
 * Create an empty directory to test it following the instructions of
 * https://github.com/alastria/alastria-identity-lib README.md
*/

let any = require('jsontokens')
const {transactionFactory, UserIdentity, tokensFactory} = require('alastria-identity-lib')
let Web3 = require('web3')
let keythereum = require('keythereum')

// Init your blockchain provider
//let myBlockchainServiceIp = 'http://yourIP:RPCPort'
let myBlockchainServiceIp = 'http://127.0.0.1:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp))



//------------------------------------------------------------------------------
console.log('\n ------ Example of instantiating an identity ------ \n')

// Save the key store in a variable. You can read it from a file
let keyStore = {"address":"6e3976aeaa3a59e4af51783cc46ee0ffabc5dc11","crypto":{"cipher":"aes-128-ctr","ciphertext":"463a0bc2146023ac4b85f4e3675c338facb0a09c4f83f5f067e2d36c87a0c35e","cipherparams":{"iv":"d731f9793e33b3574303a863c7e68520"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"876f3ca79af1ec9b77f181cbefc45a2f392cb8eb99fe8b3a19c79d62e12ed173"},"mac":"230bf3451a7057ae6cf77399e6530a88d60a8f27f4089cf0c07319f1bf9844b3"},"id":"9277b6ec-6c04-4356-9e1c-dee015f459c5","version":3}
// Recover the private key from the keyStore
let userPrivateKey
try{
	userPrivateKey = keythereum.recover('Passw0rd', keyStore)
}catch(error){
	console.log("ERROR: ", error)
}
// Init a UserIdentity object with the previous values
let identityForUse = new UserIdentity(web3, keyStore.address, userPrivateKey)



//------------------------------------------------------------------------------
console.log('\n ------ Example of creating, signing and sending a transaction ------ \n')

// Some fake data to use as parameters
let subjectPresentationHash = 'subject-presentation-hash'
let uri = 'presentation-identifier-in-repository'
// Step 1, create the transaction
let tx = transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri)
// Step 2, Add the transaction to your existing identity
identityForUse.addTransaction(tx)
.then(() => {
	// Step 3, sign the queue of transactions
	let signedTransactionStack = identityForUse.getSignedTransactions()
	// Step 4, send them to the blockchain
	// let signedTx = signedTransactionStack
	// web3.eth.sendSignedTransaction(signedTx)
	// .then(sendSigned => {
	// 	console.log('SEND -> ', sendSigned)
	// })
	// .catch(error => {
	// 	console.log(error)
	// })
})



//------------------------------------------------------------------------------
console.log('\n ------ Example of creating a Service Provider identity ------ \n')

// You need an existing Service Provider which generates an access token to your new identity,
// Firstly, we get the keyStore of the existing SP and recover its private key
let SPkeyStore = {"address":"643266eb3105f4bf8b4f4fec50886e453f0da9ad","crypto":{"cipher":"aes-128-ctr","ciphertext":"019b915ddee1172f8475fb201bf9995cf3aac1b9fe22b438667def44a5537152","cipherparams":{"iv":"f8dd7c0eaa7a2b7c87991fe30dc9d632"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"966a16bff9a4b14df58a462ba3c49364d42f2804b9eb47daf241f08950af8bdb"},"mac":"924356fbaa036d416fd9ab8c48dec451634f47dd093af4ce1fa682e8bf6753b3"},"id":"3073c62d-2dc1-4c1e-aa1c-ca089b69de16","version":3}
let SPPrivateKey;
try{
	SPPrivateKey = keythereum.recover('Passw0rd', SPkeyStore)
}catch(error){
	console.log("ERROR: ", error)
}
// Secondly, we instantiate the existing Service Provider identity
let existingSPIdentity = new UserIdentity(web3, SPkeyStore.address, SPPrivateKey)
// Next, we get the keyStore of the new identity that you want to create
let newSPKeyStore = {"address":"da80820ade1f39fea17acdb0531e2bb3bd29bf72","crypto":{"cipher":"aes-128-ctr","ciphertext":"dcd1fa9399361c3b3dc1159d5e203c9ec823afb220f86c9c2d1d21d587b7d54a","cipherparams":{"iv":"097471b53645c92a66d082be0bdc3015"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"f0b6f108c60db715678b574f7807265b82b48b811b863496670287f1fee135c0"},"mac":"de93caf38eb66db86b95fec190cbfd101840e32b93529acdb315a8734f62c389"},"id":"744e725d-3968-4de4-ad8d-de53d912a0b6","version":3}
// Step 1, we create the transaction addIdentityServiceProvider
let txAddIdentityServiceProvider = transactionFactory.identityManager.addIdentityServiceProvider(newSPKeyStore.address, web3)
// Step 2, we add the transaction to the existingSPIdentity
existingSPIdentity.addTransaction(txAddIdentityServiceProvider)
.then(() => {
	// Step 3, sign the transactions in the queue
	let signedTransactionStack = existingSPIdentity.getSignedTransactions()
	// Step 4, send the transaction to the blockchain!!
	// web3.eth.sendSignedTransaction(signedTx)
	// .then(sendSigned => {
	// 	console.log('SEND -> ', sendSigned)
	// })
	// .catch(error => {
	// 	console.log(error)
	// })
})



//------------------------------------------------------------------------------
console.log('\n ------ Example of sign, verify and decode JWT functions (not interact with the blockchain) ------ \n')

// Some fake data to test
const rawPublicKey = '03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479'
const rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'
const tokenPayload = {
 "iss": "joe",
 "exp": 1300819380,
 "http://example.com/is_root": true
}

// Signing a JWT
const signedJWT = tokensFactory.presentation.signJWT(tokenPayload, rawPrivateKey)
console.log('The signed token is: ', signedJWT)

// Decoding a JWT
let decodedJWT = tokensFactory.presentation.decodeJWT(signedJWT)
console.log('The decoded token is: ', decodedJWT)

// Verifying a JWT
let verifyJWT = tokensFactory.presentation.verifyJWT(signedJWT, rawPublicKey)
console.log('The signedToken is verified?: ', verifyJWT)



//------------------------------------------------------------------------------
console.log('\n ------ Example of AlastriaToken and AlastriaSession ------ \n')

// Creating an alastriaToken
const alastriaToken = tokensFactory.presentation.createAlastriaToken("did:ala:quor:telsius:0x12345", "https://regular.telsius.blockchainbyeveris.io:2000", "https://serviceprovider.alastria.blockchainbyeveris.io/api/login/", 1563782792,1563783392,"Alastria network",1563782792, "ze298y42sba")
console.log('The Alastria token is: ', alastriaToken)

// Signing the alastriaToken
let signedAT = tokensFactory.presentation.signJWT(alastriaToken, rawPrivateKey)
console.log('The signed Alastria token is: ', signedAT)

// Creating an alastriaSession
const alastriaSession = tokensFactory.presentation.createAlastriaSession("https://w3id.org/did/v1", "did:ala:quor:telsius:0x123ABC", "AE2309349218937HASKHIUE9287432", signedAT, 123123145, 123131314, 123123145, "JWTID")
console.log('The Alastria session is: ', alastriaSession)
