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
let myBlockchainServiceIp = 'http://127.0.0.1:8545' //Ganache
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
const alastriaToken = tokensFactory.presentation.createAlastriaToken(didIsssuer, providerURL, callbackURL, alastriaNetId, tokenExpTime, tokenActivationDate, jsonTokenId)
console.log('The Alastria token is: ', alastriaToken)

// Signing the AlastriaToken
let signedAT = tokensFactory.presentation.signJWT(alastriaToken, rawPrivateKey)
console.log('The signed Alastria token is: ', signedAT)

// Creating an AlastriaSession using the signed AlastriaToken
const alastriaSession = tokensFactory.presentation.createAlastriaSession(context, didIsssuer, userPublicKey, signedAT, tokenExpTime, tokenActivationDate, jsonTokenId)
console.log('The Alastria session is: ', alastriaSession)


console.log('\n ------ Example of PSMHash ------ \n')
let psmHash = tokensFactory.presentation.PSMHash(web3, signedJWT, didIsssuer);
console.log("The PSMHash is:", psmHash);


//------------------------------------------------------------------------------
console.log('\n ------ Example of creating a credential ------ \n')
// Some fake data
let credentialKey ="StudentID"
let credentialValue ="11235813"
let jti = "https://www.metrovacesa.com/alastria/credentials/3734";

let kidCredential1 = "did:ala:quor:redt:QmeeasCZ9jLbXueBJ7d7csxhb#keys-1";
let subCredential1 = "did:alastria:quorum:redt:QmeeasCZ9jLbXueBJ7d7csxhb";
let credentialSubject = {};
credentialSubject[credentialKey]=credentialValue;
credentialSubject["levelOfAssurance"]="basic";

let kidCredential2 = "did:ala:quor:redt:QmeeasCZ9jLbXueBJ7d7csxhb#keys-2";
let subCredential2 = "did:alastria:quorum:redt:QmeeasCZ9jLbXueBJ7d7csxkm";

let kidCredential3 = "did:ala:quor:redt:QmeeasCZ9jLbXueBJ7d7csxhb#keys-3";
let subCredential3 = "did:alastria:quorum:redt:QmeeasCZ9jLbXueBJ7d7csxlb";

const credential1 = tokensFactory.presentation.createCredential(kidCredential1, didIsssuer, subCredential1, context, credentialSubject, tokenExpTime, tokenActivationDate, jti)
console.log('The credential1 is: ', credential1)

credentialSubject[credentialKey]="65487962";
credentialSubject["name"]="Kevin";
const credential2 = tokensFactory.presentation.createCredential(kidCredential2, didIsssuer, subCredential2, context, credentialSubject, tokenExpTime, tokenActivationDate, jti)
console.log('The credential2 is: ', credential2)

credentialSubject[credentialKey]="98562317";
credentialSubject["phone_number"]="9191919194";
const credential3 = tokensFactory.presentation.createCredential(kidCredential3, didIsssuer, subCredential3, context, credentialSubject, tokenExpTime, tokenActivationDate, jti)
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

const presentation = tokensFactory.presentation.createPresentation(didIssuer, didSubject, credentials, timeExp, timeNbf, jti)
console.log('The presentation is: ', presentation)
*/

console.log('\n ------ Example of sending a transaction to the blockchain (for example creating a Service Provider identity) ------ \n')
// This is the account thtat deployed all the smart contracts (accounts[0])
// These values must be changed with the ones that ganache provides
// *IMPORTANT!* Take a look that the Private Key has no '0x'. Dont forget to remove it!
let ganacheAdminIdentity = new UserIdentity(web3, '0xC3B8c4af278b40813Cd841F6892E72e961eba1E5', '8be8e97988b013cffb352865b81c5b33341a10ec2ea9c9acec1857350b9d5c32')

// The new Service Provider
let newSPKeyStore = {"address":"6e3976aeaa3a59e4af51783cc46ee0ffabc5dc11","crypto":{"cipher":"aes-128-ctr","ciphertext":"463a0bc2146023ac4b85f4e3675c338facb0a09c4f83f5f067e2d36c87a0c35e","cipherparams":{"iv":"d731f9793e33b3574303a863c7e68520"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"876f3ca79af1ec9b77f181cbefc45a2f392cb8eb99fe8b3a19c79d62e12ed173"},"mac":"230bf3451a7057ae6cf77399e6530a88d60a8f27f4089cf0c07319f1bf9844b3"},"id":"9277b6ec-6c04-4356-9e1c-dee015f459c5","version":3}

// Step 1, we call the function addIdentityServiceProvider which is in AlastriaIdentityManager.sol contract
transactionFactory.identityManager.addIdentityServiceProvider(web3, newSPKeyStore.address, ganacheAdminIdentity.address)
.then(tx1 => {
	console.log('The transaction is: ', tx1)
	// Step 2, we customize and sign the transaction by calling the function getKnownTransaction
	ganacheAdminIdentity.getKnownTransaction(tx1)
	.then(txAddIdentityServiceProvider => {
		console.log('The transaction bytes data is: ', txAddIdentityServiceProvider)
		// Step 3, we send the signed transaction to the blockchain
		ganacheAdminIdentity.sendSignedTransaction(web3, txAddIdentityServiceProvider)
		.then(signedTx => {
			console.log("The transaction hash is: ", signedTx);
		})
		.catch (error => { console.log("Error ---->", error)})
	})
	.catch(error2 => {
		console.log('Error -----> ', error)
	})
})
.catch(error3 => {
	console.log('Error -----> ', error)
})
