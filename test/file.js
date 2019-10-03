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
let myBlockchainServiceIp = 'http://63.33.206.111/rpc'
//let myBlockchainServiceIp = 'http://127.0.0.1:8545' //Ganache
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp))
console.log('VERSION: ', web3.version)



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
// It is important to add '0x' before the address
let identityForUse = new UserIdentity(web3, `0x${keyStore.address}`, userPrivateKey)

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
const signedJWT = tokensFactory.tokens.signJWT(tokenPayload, rawPrivateKey)
console.log('The signed token is: ', signedJWT)

// Decoding a JWT
let decodedJWT = tokensFactory.tokens.decodeJWT(signedJWT)
console.log('The decoded token is: ', decodedJWT)

// Verifying a JWT
let verifyJWT = tokensFactory.tokens.verifyJWT(signedJWT, rawPublicKey)
console.log('The signedToken is verified?: ', verifyJWT)

//------------------------------------------------------------------------------
console.log('\n ------ Example of AlastriaToken and AlastriaSession ------ \n')
//Some fake data
//The context of the jwt
let context = "https://w3id.org/did/v1"
//The user wallet public key
let userPublicKey = "AE2309349218937HASKHIUE9287432"
// The issuer DID will be stored in "iss" field
let didIsssuer = "did:ala:quor:telsius:0x12345"
//The provider gateway URL "gwu"
let providerURL = "https://regular.telsius.blockchainbyeveris.io:2000"
//Callback URL that must be answered with the user rawPublicKey "cbu"
let callbackURL = "https://serviceprovider.alastria.blockchainbyeveris.io/api/login/"
//Alastria network identifier "ani"
let alastriaNetId = "Alastria network"
//Token broadcast date "iat" (issued at) (timestamp)
let tokenBroadcastDate = 1563782792
//Token expiration time "exp" (timestamp)
let tokenExpTime = 1563783392
//(optional parameter)Token activation date "nbf" (timestamp)
let tokenActivationDate = 1563782792
//(optional parameter)Token identifier "jti"
let jsonTokenId = "ze298y42sba"

// Creating an AlastriaToken
const alastriaToken = tokensFactory.tokens.createAlastriaToken(didIsssuer, providerURL, callbackURL, alastriaNetId, tokenExpTime, tokenActivationDate, jsonTokenId)
console.log('The Alastria token is: ', alastriaToken)

// Signing the AlastriaToken
let signedAT = tokensFactory.tokens.signJWT(alastriaToken, rawPrivateKey)
console.log('The signed Alastria token is: ', signedAT)

// Creating an AlastriaSession using the signed AlastriaToken
const alastriaSession = tokensFactory.tokens.createAlastriaSession(context, didIsssuer, userPublicKey, signedAT, tokenExpTime, tokenActivationDate, jsonTokenId)
console.log('The Alastria session is: ', alastriaSession)

console.log('\n ------ Example of PSMHash ------ \n')
let psmHash = tokensFactory.tokens.PSMHash(web3, signedJWT, didIsssuer);
console.log("The PSMHash is:", psmHash);


//------------------------------------------------------------------------------
console.log('\n ------ Example of creating a credential ------ \n')
// Some fake data

let jti = "https://www.metrovacesa.com/alastria/credentials/3734";
//The "kid" (key ID) parameter indicates which key was used to secure (digitally sign) the JWT.
let kidCredential1 = "did:ala:quor:redt:QmeeasCZ9jLbXueBJ7d7csxhb#keys-1";
//The DID representing the AlastriaID of the subject to which the credential refers to.
let subjectAlastriaID1 = "did:alastria:quorum:redt:QmeeasCZ9jLbXueBJ7d7csxhb";

// Credential Map (key-->value)
let credentialSubject = {};
let credentialKey ="StudentID"
let credentialValue ="11235813"
credentialSubject[credentialKey]=credentialValue;
credentialSubject["levelOfAssurance"]="basic";

let kidCredential2 = "did:ala:quor:redt:QmeeasCZ9jLbXueBJ7d7csxhb#keys-2";
let subjectAlastriaID2 = "did:alastria:quorum:redt:QmeeasCZ9jLbXueBJ7d7csxkm";

let kidCredential3 = "did:ala:quor:redt:QmeeasCZ9jLbXueBJ7d7csxhb#keys-3";
let subjectAlastriaID3 = "did:alastria:quorum:redt:QmeeasCZ9jLbXueBJ7d7csxlb";

const credential1 = tokensFactory.tokens.createCredential(kidCredential1, didIsssuer, subjectAlastriaID1, context, credentialSubject, tokenExpTime, tokenActivationDate, jti)
console.log('The credential1 is: ', credential1)

credentialSubject[credentialKey]="65487962";
credentialSubject["name"]="Kevin";
const credential2 = tokensFactory.tokens.createCredential(kidCredential2, didIsssuer, subjectAlastriaID2, context, credentialSubject, tokenExpTime, tokenActivationDate, jti)
console.log('The credential2 is: ', credential2)

credentialSubject[credentialKey]="98562317";
credentialSubject["phone_number"]="9191919194";
const credential3 = tokensFactory.tokens.createCredential(kidCredential3, didIsssuer, subjectAlastriaID3, context, credentialSubject, tokenExpTime, tokenActivationDate, jti)
console.log('The credential3 is: ', credential3)
/* ------------------- WORK IN PROGRESS ---------------
//------------------------------------------------------------------------------
console.log('\n ------ Example of creating a presentation ------ \n')

// Some fake data

// The issuer DID will be stored in "iss" field
let didIssuer = "did:alastria:quorum:testnet1:QmeeasCZ9jLbX...ueBJ7d7csxhb"
// The subject DID will be stored in "sub" field
let didSubject = "did:alastria:quorum:testnet1:QmeeasCZ9jLbX...ueBJ7d7csxhb"
// A credentials array that follows the createCredential method format
let credentials = [credential1, credential2, credential3]
// (optional parameter) milli seconds that the token will be valid. This number will be added from the "iat" timestampo to create the "exp"
let timeExp = 2030735444
// (optional parameter) milli seconds when the token starts to be valid that will be a timestamp that will be copied in the "nbf" field
let timeNbf = 1525465044
// (optional parameter) A unique token identifier "jti"

let jti =  "https://www.metrovacesa.com/alastria/credentials/3732"

const presentation = tokensFactory.tokens.createPresentation(didIssuer, didSubject, credentials, timeExp, timeNbf, jti)
console.log('The presentation is: ', presentation)
*/

console.log('\n ------ Example of sending a transaction to the blockchain (for example creating a Service Provider identity) ------ \n')
// This is the account thtat deployed all the smart contracts (accounts[0])
// These values must be changed with the ones that ganache provides
// *IMPORTANT!* Take a look that the Private Key has no '0x'. Dont forget to remove it!

let adminKeyStore = {"address":"6e3976aeaa3a59e4af51783cc46ee0ffabc5dc11","crypto":{"cipher":"aes-128-ctr","ciphertext":"463a0bc2146023ac4b85f4e3675c338facb0a09c4f83f5f067e2d36c87a0c35e","cipherparams":{"iv":"d731f9793e33b3574303a863c7e68520"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"876f3ca79af1ec9b77f181cbefc45a2f392cb8eb99fe8b3a19c79d62e12ed173"},"mac":"230bf3451a7057ae6cf77399e6530a88d60a8f27f4089cf0c07319f1bf9844b3"},"id":"9277b6ec-6c04-4356-9e1c-dee015f459c5","version":3};

let adminPrivateKey
try{
	adminPrivateKey = keythereum.recover('Passw0rd', adminKeyStore)
}catch(error){
	console.log("ERROR: ", error)
}

let adminIdentity = new UserIdentity(web3, `0x${adminKeyStore.address}`, adminPrivateKey)

//*IMPORTANT!* Also change the address here
new Promise((resolver, rechazar) => {
web3.eth.personal.unlockAccount(adminIdentity.address,"Passw0rd", 500)
.then(() => {
	resolver(0);
}).catch(error=> {
	console.log(error);
	rechazar(error);
})});


// The new Service Provider
// let newSPKeyStore = {"address":"643266eb3105f4bf8b4f4fec50886e453f0da9ad","crypto":{"cipher":"aes-128-ctr","ciphertext":"019b915ddee1172f8475fb201bf9995cf3aac1b9fe22b438667def44a5537152","cipherparams":{"iv":"f8dd7c0eaa7a2b7c87991fe30dc9d632"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"966a16bff9a4b14df58a462ba3c49364d42f2804b9eb47daf241f08950af8bdb"},"mac":"924356fbaa036d416fd9ab8c48dec451634f47dd093af4ce1fa682e8bf6753b3"},"id":"3073c62d-2dc1-4c1e-aa1c-ca089b69de16","version":3}
// // Step 1, we call the function addIdentityServiceProvider which is in AlastriaIdentityManager.sol contract
// transactionFactory.identityManager.addIdentityServiceProvider(web3, `0x${newSPKeyStore.address}`, adminIdentity.address)
// .then(tx1 => {
// 	console.log('(addIdentityServiceProvider)The transaction is: ', tx1)
// 	// Step 2, we customize and sign the transaction by calling the function getKnownTransaction
// 	adminIdentity.getKnownTransaction(tx1)
// 	.then(txAddIdentityServiceProvider => {
// 		console.log('(addIdentityServiceProvider)The transaction bytes data is: ', txAddIdentityServiceProvider)
// 		// Step 3, we send the signed transaction to the blockchain
// 		adminIdentity.sendSignedTransaction(web3, txAddIdentityServiceProvider)
// 		.then(signedTx => {
// 			console.log("(addIdentityServiceProvider)The transaction hash is: ", signedTx);
// 		})
// 		.catch (error => { console.log("(addIdentityServiceProvider)Error ---->", error)})
// 	})
// 	.catch(error2 => {
// 		console.log('(addIdentityServiceProvider)Error -----> ', error)
// 	})
// })
// .catch(error3 => {
// 	console.log('(addIdentityServiceProvider)Error -----> ', error)
// })

// console.log('\n ------ Example of Alastria ID Credential Issuance (US-2.2) ------ \n')
// //Step 1 --> Create a credential
// //const credential4 = tokensFactory.tokens.createCredential(kidCredential3, didIsssuer, subjectAlastriaID3, contextAddSubject, credentialSubject, tokenExpTime, tokenActivationDate, jti)
// console.log('The credential1 is: ', credential1)
//
// //Step 2 --> call signJWT(credential4)
// const signedJWTCredential = tokensFactory.tokens.signJWT(credential1, adminPrivateKey)
// console.log('The signed token is: ', signedJWTCredential)
// //Step 3 --> call PSMHash(signedJWT)
// const cradminIdentityedentialHash = tokensFactory.tokens.PSMHash(web3, signedJWTCredential, didIsssuer);
// console.log("The PSMHash is:", credentialHash);
//
// const uri = "www.google.com"
//
// // Step 4, we call the function addSubjectCredential which is in AlastriaCredentialRegistry.sol contract
//
// 	transactionFactory.credentialRegistry.addSubjectCredential(web3, credentialHash, uri, adminIdentity.address)
// 	.then(transaction => {
// 		console.log('(addSubjectCredential)The transaction is: ', transaction)
// 		// Step 5, we customize and sign the transaction by calling the function getKnownTransaction
// 		adminIdentity.getKnownTransaction(transaction)
// 		.then(txAddSubjectCredential => {
// 			console.log('(addSubjectCredential)The transaction bytes data is: ', txAddSubjectCredential)
// 			// Step 6, we send the signed transaction to the blockchain
// 			adminIdentity.sendSignedTransaction(web3, txAddSubjectCredential)
// 			.then(signedTx2 => {
// 				console.log("(addSubjectCredential)The transaction hash is: ", signedTx2);
// 			})
// 			.catch (error => { console.log("Error ---->", error)})
// 		})
// 		.catch(error2 => {
// 			console.log('(addSubjectCredential)Error -----> ', error2)
// 		})
// 	})
// 	.catch(error3 => {
// 		console.log('Error -----> ', error3)
// })

console.log('\n ------ Example of prepare Alastria ID, addKey and createAlastrisID ------ \n')

let identityKeystore = {"address":"de7ab34219563ac50ccc7b51d23b9a61d22a383e","crypto":{"cipher":"aes-128-ctr","ciphertext":"f066be0beb82e68322631c4f0f40281c66e960703db2c6594e4ce0d78939b746","cipherparams":{"iv":"bc51f4f3cbbf2f96309cf9bd5a064ddc"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"dd8ddb3fd111c7a8d3087d6f893f6035a04231db7fa35945c68f9f9f0701201b"},"mac":"bb7004ae356e468bd500921ae43e47edc0a96cc4a0ce71b45d85f808eaa7d58d"},"id":"f9b634c0-d151-4751-ac0f-9686761aec03","version":3};

let subjectPrivateKey
try{
	subjectPrivateKey = keythereum.recover('Passw0rd', identityKeystore)
}catch(error){
	console.log("ERROR: ", error)
}

let subjectIdentity = new UserIdentity(web3, `0x${identityKeystore.address}`, subjectPrivateKey)

// let preparedId = transactionFactory.identityManager.prepareAlastriaID(web3, identityKeystore.address)
// let txCreateAlastriaID = transactionFactory.identityManager.createAlastriaIdentity(web3, rawPublicKey)

let p1 = new Promise (async(resolve, reject) => {
	let preparedId = await transactionFactory.identityManager.prepareAlastriaID(web3, identityKeystore.address)
	resolve(preparedId)
})

let p2 = new Promise(async(resolve, reject) => {
	let txCreateAlastriaID = await transactionFactory.identityManager.createAlastriaIdentity(web3, rawPublicKey)
	resolve(txCreateAlastriaID)
})

Promise.all([p1, p2])
.then(async values => {
	let signedCreateTransaction =	await subjectIdentity.getKnownTransaction(values[1])
	let signedPreparedTransaction = await adminIdentity.getKnownTransaction(values[0])
	web3.eth.sendSignedTransaction(signedPreparedTransaction)
	.on('transactionHash', function (hash) {
		console.log("HASH: ", hash)
	})
	.on('receipt', function (receipt) {
		console.log("RECEIPT: ", receipt)
		web3.eth.sendSignedTransaction(signedCreateTransaction)
		.on('transactionHash', function (hash) {
				console.log("HASH: ", hash)
		})
		.on('receipt', function (receipt) {
				console.log("RECEIPT: ", receipt)
				web3.eth.call({
					to: '0x70e7e63928b8f274f018160207d4275fd8ea5bbe',				       
					data: '0x0c91465e000000000000000000000000de7ab34219563ac50ccc7b51d23b9a61d22a383e'
				})
				.then (AlastriaIdentity => {
					console.log(AlastriaIdentity)
				})
		})
		.on('error', console.error); // If a out of gas error, the second parameter is the receipt.
	})
	.on('error', console.error); // If a out of gas error, the second parameter is the receipt.
})



// console.log('\n ------ Example of getSubjectCredentialStatus ------ \n')

// let subjectCredentialTransaction = transactionFactory.credentialRegistry.getSubjectCredentialStatus(web3, identityKeystore.address, "0x8efee390f577aeb8bd77d3969ea2480a86cef8030250849c2b55315092992862")
// web3.eth.call(subjectCredentialTransaction)
// .then(SubjectCredentialStatus => {
// 	console.log("(SubjectCredentialStatus) -----> ", SubjectCredentialStatus);
// })
// .catch(error => {
// 	console.log('(CALL) ERROR -------> ', error)
// })