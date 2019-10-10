# Typescript Alastria Identity Library
## What it does
This library interacts with the Alastria Identity smart contracts which are in the alastria-identity repository (https://github.com/alastria/alastria-identity).

This library has three different modules:
- User Functions: It helps to manage the wallet and the identity user
- Blockchain Functions: It encapsulates Alastria Identity Smart Contracts
- Tokens Functions: It manages JWTs, AlastriaSession...

If you want to deploy Alastria Identity Smart Contracts on a local network and try this library, please follow the steps described [here](#ganache)
## How to use it

If you want to use the library, you must go to the wiki of [Alastria-identity-example](https://github.com/alastria/alastria-identity-example)

## How to collaborate
We recommend you to clone both repositories in your working directory.
```
git clone https://github.com/alastria/alastria-identity-example.git

git clone https://github.com/alastria/alastria-identity-lib.git
```
Then, you change to the alastria-identity-example folder and execute the following command
```
npm install --save github:alastria/alastria-identity-lib.git#develop
```
The last command creates the node_module´s folder, `cd  node_modules/alastria-identity-lib/src`

You can change this library and go back to the last directory  "node_modules/alastria-identity-lib"

Transpile the library
```
tsc  
```
Once it´s done you must go to alastria-identity-example´s directory.

Now, you can use it from any JavaScript file in your working directory.

You can execute some of our examples by running:
```sh
node file_name.js 
```
## Connecting with ganache

## Dependencies
This library is using functionality from others.

| Lib | URL |
|:------------- |:-------------|
| web3     | https://www.npmjs.com/package/web3 |
| web3-utils | https://www.npmjs.com/package/web3-utils |
| ethereumjs-tx   | https://www.npmjs.com/package/ethereumjs-tx |
| jsontokens-npm   | https://www.npmjs.com/package/jsontokens |

Enjoy and contribute!
