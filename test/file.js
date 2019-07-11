/*const {transactionFactory, UserIdentity} = require('alastria-identity-lib');
let Web3 = require('web3');

let myBlockchainServiceIp = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp))

let identityForUse = new UserIdentity(web3,'walletAddress','privateKeyFromKeyStore');
let subjectPresentationHash = '5d0ded0b5f707d8266ab0ca0cb3c70028ea2e232ae6380168101bfb94084f936'
let uri = 'www.google.es'

identityForUse.addTransaction(transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri));
let transactionStack = identityForUse.getSignedTransactions();
doStuffWith(transactionStack);
*/

// To test tokensFactory:

const {tokensFactory} = require('alastria-identity-lib')
console.log("Ejecutando prueba")
var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE0NDA3MTM0MTQuODV9.cnCOBNFSfzpn35pwo2aT74xoH7JzCwmCEAWvKRxwqGV4lUiKLmWeA6V4fnU9-NX8sYNrsrUzY-5g5oEhzQ3mqQ'
const rawPublicKey = '03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479'
const rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'
const tokenPayload = {"iat": 1440713414.85}
jwt = tokensFactory.presentation.signPresentationRequest(tokenPayload, rawPrivateKey)
const jsonvpr = tokensFactory.presentation.verifyPresentationRequest(jwt, rawPublicKey)
console.log(jsonvpr)
//jwt = tokensFactory.presentation.signPresentation(tokenPayload, rawPrivateKey)
//const jsonvp = tokensFactory.presentation.verifyPresentation(jwt, rawPublicKey)
console.log("Finaliza prueba")
