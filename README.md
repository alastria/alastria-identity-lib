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
let lib = require('alastria-id-lib');
lib.sayHello();
lib.setProvider("http://5.56.60.217/rpc");
lib.setAccount("YOUR_ACCOUNT", "YOUR_PSW");
lib.setContract();
lib.addSubjectPresentationRegistry("HASH", "URI");
```
Run it to check it works:
```
node file.js
```

Enjoy and contribute!
