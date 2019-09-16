# Typescript Alastria Identity Library
## What it does
This library interacts with the Alastria Identity smart contracts which are in the alastria-identity repository (https://github.com/alastria/alastria-identity).

This library has two different modules:
- User Functions: It helps to manage the wallet and the identity user.
- Blockchain Functions: It encapsulates Alastria Identity Smart Contracts
- Tokens Functions: It manages JWTs, AlastriaSession...

## How to use it
In your working directory init npm with
```
npm init -y
```
Consume this library by running:
```
npm install --save github:alastria/alastria-identity-lib.git
```
Now, you can use it from any JavaScript file in your workiing directory. You can copy an example from `test/file.js`.

First you need to instantiate an identity:

```javascript
const {transactionFactory, transactionProcess} = require('alastria-identity-lib');
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
```

Then you can build and send transactions to the blockchain. Please mind the promises!
```javascript
transactionFactory.identityManager.addIdentityServiceProvider(web3, newSPKeyStore.address, ganacheAdminIdentity.address)
.then(tx1 => {
	console.log('The transaction is: ', tx1)
	// Step 2, we customize and sign the transaction by calling the function getKnownTransaction
	identityForUse.getKnownTransaction(tx1)
	.then(txAddIdentityServiceProvider => {
		console.log('The transaction bytes data is: ', txAddIdentityServiceProvider)
		// Step 3, we send the signed transaction to the blockchain
		identityForUse.sendSignedTransaction(web3, txAddIdentityServiceProvider)
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
```

There are some functions that do not change the blockchain state but are useful (and recommendable) to manage tokens:
```javascript
// Import tokensFactory to sign and verify
const {tokensFactory} = require('alastria-identity-lib')

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
```

Run it to check it works:
```
node file.js
```
## How to collaborate
We recommend you to create a `example` directory to test the lib while changing it.

Steps for your first time:

1. Create a working directory `example` where you will have your JavaScript file `file.js`
```bash
cd ..
mkdir example
cd example
```
3. Init npm with
```
npm init -y
```
4. Clone the lib inside the `node-modules` directory and install the dependencies
```
git clone https://github.com/alastria/alastria-identity-lib.git
git checkout develop
npm install
```
5. Copy in your example directory `example/file.js` the file `example/node-modules/alastria-identity-lib/file.js` using the command:
```
cd example
cp node-modules/alastria-identity/test/file.js .
```
6. Run it to test in your example directory
```
node file.js
```

Steps for your following times:
1. Make your changes in `example/node-modules/alastria-identity-lib` directory.
2. From the root directory alastria-identity-lib , transpile with
```
tsc
```
3. Now, change to the root of your working directory `example` where you have your JavaScript file and try it!
```
cd ../../
node file.js
```

If you make any changes in file.js, please comment them and copy the file to `node-modules/alastria-identity-lib/test/file.js` and push. Thanks!



## Dependencies
This library is using functionality from others.

| Lib | URL |
|:------------- |:-------------|
| web3     | https://www.npmjs.com/package/web3 |
| web3-utils | https://www.npmjs.com/package/web3-utils |
| ethereumjs-tx   | https://www.npmjs.com/package/ethereumjs-tx |
| jsontokens-npm   | https://www.npmjs.com/package/jsontokens |

Enjoy and contribute!
