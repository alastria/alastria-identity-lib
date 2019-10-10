# Typescript Alastria Identity Library
## What it does
This library interacts with the Alastria Identity smart contracts which are in the alastria-identity repository (https://github.com/alastria/alastria-identity).

This library has three different modules:
- User Functions: It helps to manage the wallet and the identity user
- Blockchain Functions: It encapsulates Alastria Identity Smart Contracts
- Tokens Functions: It manages JWTs, AlastriaSession...

If you want to deploy Alastria Identity Smart Contracts on a local network and try this library, please follow the steps described [here](#ganache)
## How to use it

If yoy want to use the library, you must go to the wiki of [Alastria-identity-example](https://github.com/alastria/alastria-identity-example)

## How to collaborate
We recommend you to create a `example` directory to test the lib while changing it.

### A. Steps for your first time:

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

### B.Steps for your following times:
1. Make your changes in `example/node-modules/alastria-identity-lib` directory and transpile:
```
tsc
```
3. Now, move to the root of your working directory `example` where you have your JavaScript file and try it!
```
cd ../../
node file.js
```

If you make any changes in file.js, please comment them and copy the file to `node-modules/alastria-identity-lib/test/file.js` and push. Thanks!

<a name="ganache"></a>
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
