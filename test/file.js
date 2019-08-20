let  any = require('jsontokens')
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

// Example of creating an identity
// A Service Provider generates access tokens to the new address
let keyStoreSP = {"address":"643266eb3105f4bf8b4f4fec50886e453f0da9ad","crypto":{"cipher":"aes-128-ctr","ciphertext":"019b915ddee1172f8475fb201bf9995cf3aac1b9fe22b438667def44a5537152","cipherparams":{"iv":"f8dd7c0eaa7a2b7c87991fe30dc9d632"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"966a16bff9a4b14df58a462ba3c49364d42f2804b9eb47daf241f08950af8bdb"},"mac":"924356fbaa036d416fd9ab8c48dec451634f47dd093af4ce1fa682e8bf6753b3"},"id":"3073c62d-2dc1-4c1e-aa1c-ca089b69de16","version":3}
let SPPrivateKey;
try{
	SPPrivateKey = keythereum.recover('Passw0rd', keyStoreSP)
}catch(error){
	console.log("ERROR: ", error)
}
// Create a new Service Provider
let newSPKeyStore = {"address":"da80820ade1f39fea17acdb0531e2bb3bd29bf72","crypto":{"cipher":"aes-128-ctr","ciphertext":"dcd1fa9399361c3b3dc1159d5e203c9ec823afb220f86c9c2d1d21d587b7d54a","cipherparams":{"iv":"097471b53645c92a66d082be0bdc3015"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"f0b6f108c60db715678b574f7807265b82b48b811b863496670287f1fee135c0"},"mac":"de93caf38eb66db86b95fec190cbfd101840e32b93529acdb315a8734f62c389"},"id":"744e725d-3968-4de4-ad8d-de53d912a0b6","version":3}

transactionFactory.identityManager.addIdentityServiceProvider(newSPKeyStore.address, web3)
.then(txGenerateAccessToken => {
	console.log('TXGENERATEACCESSTOKEN -> ', txGenerateAccessToken)
})


// Example of creating, signing and sending a tx
let subjectPresentationHash = 'subject-presentation-hash'
let uri = 'presentation-identifier-in-repository'
let tx = transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri)
identityForUse.addTransaction(tx)
.then(txs => {
	let signedTransactionStack = identityForUse.getSignedTransactions()
	console.log('SIGNEDTRANSACTIONSTACK -> ', signedTransactionStack)
	// let signedTx = signedTransactionStack
	// web3.eth.sendSignedTransaction(signedTx)
	// .then(sendSigned => {
	// 	console.log('SEND -> ', sendSigned)
	// })
	// .catch(error => {
	// 	console.log(error)
	// })
})


// Using sign and verify functions which not directly interact with the blockchain

// Some fake data to test
const rawPublicKey = '03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479'

const rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'

//const tokenPayload = {"iat": 1440713414.85}

const tokenPayload = {
 "iss": "joe",
 "exp": 1300819380,
 "http://example.com/is_root": true
}

//Sign a presentation request
/*let signedjwt = tokensFactory.presentation.signPresentationRequest(tokenPayload, rawPrivateKey)
console.log('The signed jwt is: ', signedjwt)
let signature = new any.TokenSigner('ES256K', rawPrivateKey).sign(tokenPayload)
console.log(signature)
/*
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

const token = tokensFactory.presentation.signJWT(tokenPayload, rawPrivateKey)
console.log('The token is: ', token)

//Decoding a jwt
let decodedJwt = tokensFactory.presentation.decodeJWT(token)
console.log('The decoded token is: ', decodedJwt)

let verifyJwt = tokensFactory.presentation.verifyJWT(token, rawPublicKey)
console.log('The verified token is: ', verifyJwt)

const alastriaToken = tokensFactory.presentation.createAlastriaToken("did:ala:quor:telsius:0x12345", "https://regular.telsius.blockchainbyeveris.io:2000", "https://serviceprovider.alastria.blockchainbyeveris.io/api/login/", 1563782792,1563783392,"Alastria network",1563782792, "ze298y42sba")
console.log('The Alastria token is: ', alastriaToken)

let signedAT = tokensFactory.presentation.signJWT(alastriaToken, rawPrivateKey)
console.log(signedAT)
const alastriaSession = tokensFactory.presentation.createAlastriaSession("https://w3id.org/did/v1", "did:ala:quor:telsius:0x123ABC", "AE2309349218937HASKHIUE9287432", signedAT, 123123145, 123131314, 123123145, "JWTID")
console.log(alastriaSession)
//Creating a credential
/*let jsonCredential = tokensFactory.presentation.createCredential(context, levelOfAssurance, fieldName, fieldValue)
console.log('The credential is: ', jsonCredential)

//Sign JWT
signedjwt = tokensFactory.presentation.signJWT(tokenPayload, rawPrivateKey)
console.log('The signed jwt is: ', signedjwt)

jwt = tokensFactory.presentation.verifyJWT(signedjwt, rawPublicKey)
console.log('The verifed token is:', jwt)
*/

//
