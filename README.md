# Typescript Alastria Identity Library

## What it does

This library interacts with the Alastria Identity smart contracts which are in the temp-alastriaID-truffle-contracts repository ([https://github.com/alastria/temp-alastriaID-truffle-contracts](https://github.com/alastria/temp-alastriaID-truffle-contracts)).

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

## Code linter and formatter

The project uses ESLint as Javascript and Typescript linter and Prettier as code formatter

We strongly recommend using VSCode as code editor due to the plugins available to install, witch will make us work better and easier

The recommended plugins to use these tools are

- ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Prettier: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

The repository already has configuration files for both, so you won't have to configure anything after the plugins installation

### How to use them?

- ESLint: running `npm run lint` will show any linter errors. Some errors may be automatically fixed if the flag `--fix` is added to the script execution. Also, thanks to the ESLint plugin, VSCode will mark linter errors with red color and warnings with yellow color
- Prettier: with a file open, `cmd+shift+p` (macOS) to open VSCode execution menu, write `Format document with...` and choose Prettier or configure your VSCode workspace to automatically use Prettier if you choose `Format document`: in your VSCode `settings.json` add

```json
"[javascript]": {
   "editor.defaultFormatter": "esbenp.prettier-vscode"
 }
"[typescript]": {
   "editor.defaultFormatter": "esbenp.prettier-vscode"
 }
```

To automatically format Javascript and Typescript code

If you have installed some plugin that add keyboard shortcuts, like IntelliJ IDEA Keybindings (https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings) you will be able to format documents with Prettier with shortcuts like `cmd+alt+l`
