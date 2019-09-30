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

let identity1Keystore = {"address":"a9728125c573924b2b1ad6a8a8cd9bf6858ced49","crypto":{"cipher":"aes-128-ctr","ciphertext":"a38f4475ef7cdeb77f262cc03369061e28e37415269cc41977ddecd04d9d8429","cipherparams":{"iv":"d9be09d3895821995ca234502950ad39"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"c2c813066974631abe6cd325f904ea28c3a01b3c39a006a75f0e3fa7e390484d"},"mac":"a90b79da477cbad7e3817bcdad7d921306174da490e1ae1732cc90f4805e2459"},"id":"8f0eda33-ace1-4aec-a26b-510d924f920c","version":3};
let identity2Keystore = {"address":"ad88f1a89cf02a32010b971d8c8af3a2c7b3bd94","crypto":{"cipher":"aes-128-ctr","ciphertext":"bcef56807596862208759d1a0c4d46ab2be8aeff23b3f194f581e760e075a43b","cipherparams":{"iv":"4451c563d1efc0ab04d23e09cf9de9f5"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"13a33892beb9dd9b7e6290c900696ff0b542eda8735b0342a1bb26f22d07f863"},"mac":"fd10bdfca443cf86e443eb5c2800f292851e1e32e9af843a20f6efc582380316"},"id":"e4daad64-e96d-4120-9268-1d45bca4ad85","version":3};

let subjectPrivateKey
try{
	subjectPrivateKey = keythereum.recover('Passw0rd', identity1Keystore)
}catch(error){
	console.log("ERROR: ", error)
}

let subject2PrivateKey
try{
	subjectPrivateKey = keythereum.recover('Passw0rd', identity2Keystore)
}catch(error){
	console.log("ERROR: ", error)
}

let subjectIdentity = new UserIdentity(web3, `0x${identity1Keystore.address}`, subjectPrivateKey)
let subject2Identity = new UserIdentity(web3, `0x${identity2Keystore.address}`, subject2PrivateKey)
let sendPrepareAlastria;
let sendAddKey;
let sendCreate;
// transactionFactory.identityManager.prepareAlastriaID(web3, `0x${identity1Keystore.address}`, adminIdentity.address)
// .then(txPrepareAlastriaID => {
// 	console.log('(txPrepareAlastriaID)The transaction is: ', txPrepareAlastriaID)
// 	adminIdentity.getKnownTransaction(txPrepareAlastriaID)
// 	.then(txPrepareAlastriaIDSigned => {
// 		console.log('(txPrepareAlastriaIDSigned)The transaction bytes data is: ', txPrepareAlastriaIDSigned)
// 		sendPrepareAlastria = adminIdentity.sendSignedTransaction(web3, txPrepareAlastriaIDSigned)
// 		.then(hasTxPrepareAlastriaID => {
// 			console.log("(hasTxPrepareAlastriaID)The transaction hash is: ", hasTxPrepareAlastriaID);
// 		})
// 	})
// }).catch(error => { console.log('(prepareAlastriaID)Error -----> ', error)})
//
// transactionFactory.publicKeyRegistry.addKey(web3, `0x${identity1Keystore.address}`)
// .then(txAddkey => {
//   console.log('(txAddkey)The transaction is: ', txAddkey)
// 	subjectIdentity.getKnownTransaction(txAddkey)
// 	.then(txaddKeySigned => {
// 		console.log('(txaddKeySigned)The transaction is: ', txaddKeySigned)
// 			transactionFactory.identityManager.createAlastriaIdentity(web3, txaddKeySigned)
// 			.then(txCreateAlastriaID =>{
// 				console.log('(txCreateAlastriaID)The transaction is: ', txCreateAlastriaID)
// 				subjectIdentity.getKnownTransaction(txCreateAlastriaID)
// 				.then(txCreateAlastriaIDSigned => {
// 					console.log('(txCreateAlastriaIDSigned)The transaction bytes data is: ', txCreateAlastriaIDSigned)
// 					sendCreate = adminIdentity.sendSignedTransaction(web3, txCreateAlastriaIDSigned)
// 					.then(hashTxCreateAlastriaID => {
// 						console.log("(hashTxCreateAlastriaID)The transaction hash is: ", hashTxCreateAlastriaID);
// 					})
// 				})
// 			})
// 		})
// })
// .catch(error => { console.log('(createAlastriaIdentity)Error -----> ', error)})

let p1 = new Promise((resolve, reject) => {

	transactionFactory.identityManager.prepareAlastriaID(web3, `0x${identity2Keystore.address}`, adminIdentity.address)
	.then(txPrepareAlastriaID => {
		console.log('(txPrepareAlastriaID)The transaction is: ', txPrepareAlastriaID)
		adminIdentity.getKnownTransaction(txPrepareAlastriaID)
		.then(txPrepareAlastriaIDSigned => {
			console.log('(txPrepareAlastriaIDSigned)The transaction bytes data is: ', txPrepareAlastriaIDSigned)
				resolve(txPrepareAlastriaIDSigned)
		})
	}).catch(error => {
		console.log('(prepareAlastriaID)Error -----> ', error)
		reject(error)
		})
})

let p2 = new Promise((resolve, reject) => {

	transactionFactory.publicKeyRegistry.addKey(web3, `0x${identity2Keystore.address}`)
	.then(txAddkey => {
	  console.log('(txAddkey)The transaction is: ', txAddkey)
			console.log('(txaddKeySigned)The transaction is: ', txAddkey.data)
				// let arrayByte = new Uint8Array([30 78 63 33 74 68 6c 36 6f 74 33 71 35 72 74 32 75 31 39 33 6b 74 32 6f 36 76 79 68 35 36 35 76 79 6f 6b 35 72 6a 6d 64 78 6b 79 31 33 64 39 33 62 6f 64 31 74 73 6b 76 75 70 73 6c 6a 32 6c 6c 6f 64 72 64 61 7a 69 67 63 69 38 30 34 32 6a 63 36 77 35 31 6a 75 6b 79 63 6b 6a 32 69 6f 67 6f 79 31 79 36 33 6c 39 6f 6c 35 69 78 69 62 63 35 6f 6c 62 63 61 7a 70 72 31 6e 6b 77 73 69 77 66 78 72 34 76 79 65 77 73 39 65 70 78 76 38 38 38 68 6b 6d 68 63 35 74 7a 74 36 78 74 6f 6f 75 39 7a 65 6e 79 32 62 34 6d 74 33 71 7a 78 33 6e 39 62 78 61 6d 35 66 79 38 38 7a 67])
				var txCreateAlastriaID = transactionFactory.identityManager.createAlastriaIdentity(web3,  'c3thl6ot3q5rt2u193kt2o6vyh565vyok5rjmdxky13d93bod1tskvupslj2llodrdazigci8042jc6w51jukyckj2iogoy1y63l9ol5ixibc5olbcazpr1nkwsiwfxr4vyews9epxv888hkmhc5tzt6xtoou9zeny2b4mt3qzx3n9bxam5fy88zg')
					console.log('(txCreateAlastriaID)The transaction is: ', txCreateAlastriaID)
					subjectIdentity.getKnownTransaction(txCreateAlastriaID)
					.then(txCreateAlastriaIDSigned => {
						console.log('(txCreateAlastriaIDSigned)The transaction bytes data is: ', txCreateAlastriaIDSigned)
							resolve(txCreateAlastriaIDSigned)
			})
	}).catch(error => {
		console.log('(addKey)Error -----> ', error)
		reject(error)
		})
})
var version = web3.version;
console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVS',version);
Promise.all([p1, p2]).then(values => {
	console.log("---------------------------------------------------------------------",values);
	new Promise((resolve, reject) => {
		console.log('+++++++++++++++++++++++++++++++',p1);
		adminIdentity.sendSignedTransaction(web3, values[0])
		.on('receipt',hasTxPrepareAlastriaID => {
			//.then(hasTxPrepareAlastriaID => {
			console.log("(hasTxPrepareAlastriaID)The transaction hash is: ", hasTxPrepareAlastriaID);
			adminIdentity.sendSignedTransaction(web3, values[1])
			.then(hashTxCreateAlastriaID => {
				console.log("(hashTxCreateAlastriaID)The transaction hash is: ", hashTxCreateAlastriaID);
	})
	//resolve()
}).catch(error =>{
	console.log('-+-+--+-+-+-+-+',error)
})
})
})







// console.log('\n ------ Example of getSubjectCredentialStatus ------ \n')
//
// let p3 = new Promise((resolve, reject) => {
// 	transactionFactory.credentialRegistry.getSubjectCredentialStatus(web3, `0x${identity1Keystore.address}`, "0x8efee390f577aeb8bd77d3969ea2480a86cef8030250849c2b55315092992862", adminIdentity.address)
// 	.then(txgetSubjectCredential => {
// 		console.log('(txgetSubjectCredential)The transaction is: ', txgetSubjectCredential)
// 		adminIdentity.getKnownTransaction(txgetSubjectCredential)
// 		.then(txgetSubjectCredentialKnown => {
// 			console.log('(txgetSubjectCredentialKnown)The transaction is: ', txgetSubjectCredentialKnown)
// 			adminIdentity.call(web3, txgetSubjectCredentialKnown)
// 			.then(outputTx => {
//     		console.log("(outputTx)The transaction hash is: ", outputTx);
// 				resolve(outputTx)
// 			})
// 		})
// 	})
// }).catch(error => {
// 		console.log('(txgetSubjectCredential)Error -----> ', error)
// 		reject(error)
// })
