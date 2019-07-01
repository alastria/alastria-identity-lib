const {transactionFactory, UserIdentity} = require('alastria-id-lib');
let Web3 = require('web3');

let myBlockchainServiceIp = 'http://www.google.com';
const web3 = new Web3(myBlockchainServiceIp)
const identityForUse = new UserIdentity(web3,'walletAddress','privateKeyFromKeyStore');
let subjectPresentationHash = '5d0ded0b5f707d8266ab0ca0cb3c70028ea2e232ae6380168101bfb94084f936'
let uri = 'www.google.es'

identityForUse.addTransaction(transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri));
let transactionStack = identityForUSe.getSignedTransactions();

doStuffWith(transactionStack);