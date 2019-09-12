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
/*
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
*/

// Esta es la cuenta que ha desplegado los smart contracts, la accounts[0] de ganache
let ganacheAdminIdentity = new UserIdentity(web3, '0xfe5f07475936930d5611a9e0f98adb3cf4f938cd', '7aa45c5835f5bd5c89cc47db86af44d5732d3e7c68941545bda6a0e3d9cb40f2')

//------------------------------------------------------------------------------
console.log('\n ------ Example of creating a Service Provider identity ------ \n')


let newSPKeyStore = {"address":"6e3976aeaa3a59e4af51783cc46ee0ffabc5dc11","crypto":{"cipher":"aes-128-ctr","ciphertext":"463a0bc2146023ac4b85f4e3675c338facb0a09c4f83f5f067e2d36c87a0c35e","cipherparams":{"iv":"d731f9793e33b3574303a863c7e68520"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"876f3ca79af1ec9b77f181cbefc45a2f392cb8eb99fe8b3a19c79d62e12ed173"},"mac":"230bf3451a7057ae6cf77399e6530a88d60a8f27f4089cf0c07319f1bf9844b3"},"id":"9277b6ec-6c04-4356-9e1c-dee015f459c5","version":3}

// Step 1, we create the transaction addIdentityServiceProvider
transactionFactory.identityManager.addIdentityServiceProvider(web3, newSPKeyStore.address, ganacheAdminIdentity.address)
.then(tx1 => {
    console.log('tx1 ---->', tx1)
    ganacheAdminIdentity.getKnownTransaction(tx1)
	.then(txAddIdentityServiceProvider => {
		console.log('txAddIdentityServiceProvider ---->', txAddIdentityServiceProvider)

	// Step 2, we add the transaction to the existingSPIdentity
		web3.eth.sendSignedTransaction(txAddIdentityServiceProvider, (err, sendSignedHash) => {
			if (err) { console.log(err); return; }
			console.log('sendSignedHash ---->', sendSignedHash)
		})
		
	})
	.catch(error2 => {
		console.log('Error2 -----> ', error2)
	})
})
.catch(error3 => {
	console.log('Error3 -----> ', error3)
})

/*
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
const alastriaToken = tokensFactory.presentation.createAlastriaToken(didIsssuer, providerURL, callbackURL, alastriaNetId, tokenBroadcastDate, tokenExpTime, tokenActivationDate, jsonTokenId)
console.log('The Alastria token is: ', alastriaToken)

// Signing the AlastriaToken
let signedAT = tokensFactory.presentation.signJWT(alastriaToken, rawPrivateKey)
console.log('The signed Alastria token is: ', signedAT)

// Creating an AlastriaSession using the signed AlastriaToken
const alastriaSession = tokensFactory.presentation.createAlastriaSession(context, didIsssuer, userPublicKey, signedAT, tokenBroadcastDate, tokenExpTime, tokenActivationDate, jsonTokenId)
console.log('The Alastria session is: ', alastriaSession)



//------------------------------------------------------------------------------
console.log('\n ------ Example of creating a credential ------ \n')

// Some fake data
let credentialKey ="StudentID"
let credentialValue ="11235813"

const credential1 = tokensFactory.presentation.createCredential("JWT", 2, credentialKey, credentialValue)
console.log('The credential1 is: ', credential1)

const credential2 = tokensFactory.presentation.createCredential("JWT", 2, "Email", "agp@gmail.com")
console.log('The credential2 is: ', credential2)

const credential3 = tokensFactory.presentation.createCredential("JWT", 2, "DNI", "71236152N")
console.log('The credential3 is: ', credential3)

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
