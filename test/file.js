const {transactionFactory, UserIdentity} = require('alastria-identity-lib');
let Web3 = require('web3');

let myBlockchainServiceIp = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(myBlockchainServiceIp))

let identityForUse = new UserIdentity(web3,'walletAddress','privateKeyFromKeyStore');
let subjectPresentationHash = '5d0ded0b5f707d8266ab0ca0cb3c70028ea2e232ae6380168101bfb94084f936'
let uri = 'www.google.es'

identityForUse.addTransaction(transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri));
let transactionStack = identityForUse.getSignedTransactions();
doStuffWith(transactionStack);
