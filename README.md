# Typescript Alastria Identity Library

## What it does

This library interacts with the Alastria Identity smart contracts which are in the alastria-identity repository ([https://github.com/alastria/alastria-identity](https://github.com/alastria/alastria-identity)).

This library has three different modules:

- User Functions: It helps to manage the wallet and the identity user
- Blockchain Functions: It encapsulates Alastria Identity Smart Contracts
- Tokens Functions: It manages JWTs, AlastriaSession...

If you want to deploy Alastria Identity Smart Contracts on a local network and try this library, please follow the steps described [here](#ganache)

## How to use it

If you want to use the library, you must follow the steps of the README.md in [Alastria-identity-example](https://github.com/alastria/alastria-identity-example)

## How to collaborate

We recommend you to clone both repositories in your working directory.

```
git clone https://github.com/alastria/alastria-identity-example.git

git clone https://github.com/alastria/alastria-identity-lib.git
```

Then, you must go to the alastria-identity-example's folder and run the following command

```
npm install --save github:alastria/alastria-identity-lib.git#develop
```

This command creates the node_module´s folder.

Now `cd node_modules/alastria-identity-lib/src`

You can modify the library and go back to the directory _"node_modules/alastria-identity-lib"_ once you are done.

Transpile the library

```
tsc
```

Once you have finished you must go to _alastria-identity-example_'s directory.

Now, you can use it from any JavaScript file in your working directory.

You can execute some of our examples by running:

```
node file_name.js
```

## Dependencies

This library is using functionality from others.

| Lib            | URL                                         |
| :------------- | :------------------------------------------ |
| web3           | https://www.npmjs.com/package/web3          |
| web3-utils     | https://www.npmjs.com/package/web3-utils    |
| ethereumjs-tx  | https://www.npmjs.com/package/ethereumjs-tx |
| jsontokens-npm | https://www.npmjs.com/package/jsontokens    |

Or create yours.

## Run test suite

```bash
npm test
```

## Dependencies

This library is using functionality from others.

| Lib            | URL                                                                                        |
| :------------- | :----------------------------------------------------------------------------------------- |
| web3           | [https://www.npmjs.com/package/web3](https://www.npmjs.com/package/web3)                   |
| web3-utils     | [https://www.npmjs.com/package/web3-utils](https://www.npmjs.com/package/web3-utils)       |
| ethereumjs-tx  | [https://www.npmjs.com/package/ethereumjs-tx](https://www.npmjs.com/package/ethereumjs-tx) |
| jsontokens-npm | [https://www.npmjs.com/package/jsontokens](https://www.npmjs.com/package/jsontokens)       |

Enjoy and contribute!
