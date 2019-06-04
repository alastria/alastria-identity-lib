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
Open node_modules/alastria-id-lib/dist/alastria-id.js with your favourite. Introduce your trusted IP node, an account and its password to unlock it.
```javascript
var IP_NODE = "http://5.56.60.217/rpc";
var ACCOUNT = "";
var ACCOUNT_PSW = "";
```
Now, you can use this library from any JavaScript file in the project with:
```javascript
let lib = require('alastria-id-lib');
lib.sayHello();
lib.addSubjectPresentationRegistry("HASH", "URI", "ADDRESS_FROM");
```
Run it to check it works:
```
node file.js
```

Enjoy and contribute!
