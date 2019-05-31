# Typescript Alastria Identity Library 
## What it does
This library interacts with the Alastria Identity smart contracts. 
[https://github.com/alastria/alastria-identity](https://github.com/alastria/alastria-identity)

## How to use it
Init npm on your working directory with
```
npm init -y
```
Consume this library anywhere you want by running:
```
npm install --save github:alastria/alastria-identity-lib.git
```
Check you have alastria-id-lib in node-modules.
You can use it from somotherproject/src/file.js with:
```
let lib = require('alastria-id-lib');
lib.addSubjectPresentationRegistry("HASH", "URI", "ADDRESS_FROM");
```
And test it with:
```
node file.js
```
If you want to use it from command line:
```
sudo -g npm install --save github:alastria/alastria-identity-lib.git
```
