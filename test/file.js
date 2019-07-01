const {transactionFactory, transactionProcess} = require('alastria-id-lib');
const identityForUse = new UserIdentity('myBlockchainServiceIp','walletAddress','privateKeyFromKeyStore');

identityForUse.addTransaction(transactionFactory.identityManager.addSubjectPresentation(subjectPresentationHash,uri));
let transactionStack = identityForUSe.getSignedTransactions();

doStuffWith(transactionStack);
