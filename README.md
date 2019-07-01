# Typescript Alastria Identity Library
## What it does
This library interacts with the Alastria Identity smart contracts which are in the
alastria-identity repository](https://github.com/alastria/alastria-identity)

## How to use it
Init npm on your working directory with
```
npm init -y
```
Consume this library anywhere you want by running:
```
npm install --save github:alastria/alastria-identity-lib.git
```
Now, you can use this library from any JavaScript file in the project in this way:
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
## Dependencies
This library is using functionality from others.

| Lib | URL |
|:------------- |:-------------|
| web3     | https://www.npmjs.com/package/web3 | 
| web3-utils | https://www.npmjs.com/package/web3-utils | 
| ethereumjs-tx   | https://www.npmjs.com/package/ethereumjs-tx |
| jsontokens-npm   | https://www.npmjs.com/package/jsontokens |

Enjoy and contribute!
