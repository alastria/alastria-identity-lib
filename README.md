# Typescript Alastria Identity Library
## What it does
This library interacts with the Alastria Identity smart contracts which are in the alastria-identity repository (https://github.com/alastria/alastria-identity).

## How to use it
In your working directory init npm with
```
npm init -y
```
Consume this library by running:
```
npm install --save github:alastria/alastria-identity-lib.git
```
Now, you can use it from any JavaScript file in your workiing directory. You can copy an example from `test/file.js` such as:
```javascript
const {transactionFactory, transactionProcess} = require('alastria-id-lib');
const identityForUse = new UserIdentity('myBlockchainServiceIp','walletAddress','privateKeyFromKeyStore');

identityForUse.addTransaction(transactionFactory.identityManager.addSubjectCredential(hash,uri));
let transactionStack = identityForUSe.getSignedTransactions();

doStuffWith(transactionStack);
```
Run it to check it works:
```
node file.js
```
## How to collaborate
You will work with two different directories:
- alastria-identity-lib : main folder of this lib that you get by clonning this repository where make your changes.
- example : an empty folder in the same path for testing your changing.

Steps for your first time:
1. Install dependencies in alastria-identity-lib directory. Then, make your changes.
```
npm install
```
2. From the root directory alastria-identity-lib , transpile with
```
tsc
```
3. Now, create a working directory `example` where you have your JavaScript file. You can copy paste the content of `alastria-identity-lib/test/file.js` doing:
```bash
cd ..
mkdir example
cd example
cp ../alastria-identity-lib/test/file.js .
```
4. Init npm with
```
npm init -y
```
5. Install the lib with
```
npm install --save github:alastria/alastria-identity-lib.git
```
6. Replace in your example directory `example/node-modules/alastria-identity-lib/dist` the folder `dist` with `alastria-identity-lib/dist` using the command:
```
cp -r  node_modules/alastria-identity-lib/dist/ ../alastria-identity-lib/dist/`
```
7. Run your file to test in your example directory
```
node file.js
```

Steps for your following times:
1. Make your changes in alastria-identity-lib directory.
2. From the root directory alastria-identity-lib , transpile with
```
tsc
```
3. Now, change to your working directory `example` where you have your JavaScript file (you can copy paste the content of `alastria-identity-lib/test/file.js`) doing:
```bash
cd ../example
cp ../alastria-identity-lib/test/file.js .
```
4. Replace in your example directory `example/node-modules/alastria-identity-lib/dist` the folder `dist` with `alastria-identity-lib/dist` using the command:
```
cp -r ../alastria-identity-lib/dist/ node_modules/alastria-identity-lib/dist/`
```
5. Run your file to test in your example directory
```
node file.js
```

If you make any changes in file.js, please comment and copy them to alastria-identity-lib/test/file.js and push. Thanks!

### How to use the Alastria Identity smart contracts
```javascript
// Import the main class and the anonimous transaction factory
const {transactionFactory, UserIdentity} = require('alastria-id-lib');

// Import the keyStore for the users
let keythereum = require('keythereum');
let keyStore //Import from your project
let privateKey = keythereum.recover('password', keyStore);

//Create the identity object
let Web3 = require('web3')
let myBlockchainServiceIp = 'http://yourIP:RPCPort' //dont forget to change it
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp));
let nonce = web3.eth.getTransactionCount(`0x${keyStore.address}`);
let userIdentity = new UserIdentity(web3,`0x${keyStore.address}`,privateKey,nonce);

//Create an identity in blockchain
//Remember that the dependancy of web3 is injected in the transaction factory
let transaction1 = serviceProviderIdentity.getKnownTransaction(transactionFactory.identityManager.generateAccessToken(web3, userIdentity.address));
let transaction2 = userIdentity.getKnownTransaction(transactionFactory.identityManager.createAlastriaIdentity(web3, publicKey));

//Use a Dapp with an Alastria Identity
let transaction3 = userIdentity.getKnownTransaction(tansactionFactory.identityManager.delegateCall(web3,dappAddress,valueInWei,dataForDapp));

//Use registry contracts
let transaction4 = userIdentity.getKnownTransaction(transactionFactory.credentialRegistry.addSubjectCredential(web3, subjectCredentialHash, URI))
let transaction5 = userIdentity.getKnownTransaction(transactionFactory.presentationRegistry.addSubjectPresentation(web3, subjectPresentationHash, URI))

//Send a transaction to the blockchain
web3.eth.sendSignedTransaction(transaction, (e, hash) => {
	console.log(hash);
})
```


### How to use functions that do not change the blockchain state
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

## Dependencies
This library is using functionality from others.

| Lib | URL |
|:------------- |:-------------|
| web3     | https://www.npmjs.com/package/web3 |
| web3-utils | https://www.npmjs.com/package/web3-utils |
| ethereumjs-tx   | https://www.npmjs.com/package/ethereumjs-tx |
| jsontokens-npm   | https://www.npmjs.com/package/jsontokens |

Enjoy and contribute!
