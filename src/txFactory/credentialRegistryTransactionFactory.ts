import { config } from '../config';


//function addSubjectCredential(web3, subjectCredentialHash, URI)
/**
 * Dev: get delegated invoke addSubjectCredential transaction object
 * @param web3 ethereum connection
 * @param subjectCredentialHash should have 32 bytes, credential identification
 */
// export function addSubjectCredential(web3, subjectCredentialHash, URI) {
//     let transaction = config.basicTransaction;
//     let delegatedData = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaCredentialRegistry"]["addSubjectCredential"], [subjectCredentialHash, URI]);
//     transaction.data = delegated(web3, delegatedData);
//     transaction.to = config.alastriaCredentialRegistry;
//     transaction.gasLimit = 600000;
//     return transaction;
// }

export function addSubjectCredential(web3, subjectCredentialHash, URI, from) {
  return new Promise((resolve, reject) => {
    let transaction = config.basicTransaction;
    transaction.from = from;
    web3.eth.getTransactionCount(transaction.from)
    .then(mynonce =>{
      transaction.nonce = mynonce;
       let delegatedData = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaCredentialRegistry"]["addSubjectCredential"], [subjectCredentialHash, URI])
       transaction.data = delegated(web3, delegatedData);
       transaction.to = config.alastriaIdentityManager;
       transaction.gasLimit = 600000;
       resolve(transaction);
    })
    .catch(error => {
      console.log('Error ----> ', error)
      reject(error)
    })
  })
  }

//function deleteSubjectCredential(web3, subjectCredentialHash)
/**
 * Dev: get delegated invoke deleteSubjectCredential transaction object
 * @param web3 ethereum connection
 * @param subjectCredentialHash should have 32 bytes
 */
export function deleteSubjectCredential(web3, subjectCredentialHash) {
    let transaction = config.basicTransaction;
    let delegatedData = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaCredentialRegistry"]["deleteSubjectCredential"], [subjectCredentialHash]);
    transaction.data = delegated(web3, delegatedData);
    transaction.to = config.alastriaIdentityManager;
    transaction.gasLimit = 600000;
    return transaction;
}

//function getSubjectCredentialStatus(web3, subject, subjectCredentialHash)
/**
 * Dev: get invoke getSubjectCredentialStatus transaction object
 * @param web3 ethereum connection
 * @param subject alastria Id
 * @param subjectCredentialHash should have 32 bytes
 */
export function getSubjectCredentialStatus(web3, subject, subjectCredentialHash, from) {
    return new Promise((resolve, reject) => {
      let transaction = config.basicTransaction;
      transaction.from = from;
      web3.eth.getTransactionCount(transaction.from)
      .then(mynonce =>{
      transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaCredentialRegistry"]["getSubjectCredentialStatus"], [subject, subjectCredentialHash]);
      // let datos = web3.eth.abi.decodeParameters(['string', 'bytes32'],'0x55d64732000000000000000000000000a9728125c573924b2b1ad6a8a8cd9bf6858ced498efee390f577aeb8bd77d3969ea2480a86cef8030250849c2b55315092992862');
      // console.log("---------------------------------------------",datos);
      transaction.to = config.alastriaCredentialRegistry;
      transaction.gasLimit = 600000;
      transaction.nonce = mynonce;
      resolve(transaction);
      })
      .catch(error => {
        console.log('Error ----> ', error)
        reject(error)
      })
    })
}

//function getSubjectCredentialList(web3, subject)
/**
 * Dev: get invoke getSubjectCredentialList transaction object
 * @param web3 ethereum connection
 * @param subject subject to reover credenital list
 */
export function getSubjectCredentialList(web3, subject) {
    let transaction = config.basicTransaction;
    transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaCredentialRegistry"]["getSubjectCredentialList"], [subject]);
    transaction.to = config.alastriaCredentialRegistry;
    transaction.gasLimit = 600000;
    return transaction;
}

/**
 * function updateCredentialStatus(web3, issuerCredentialHash, status)
 * @param web3
 * @param issuerCredentialHash
 * @param status
 */
export function updateCredentialStatus(web3, issuerCredentialHash, status) {
    let transaction = config.basicTransaction;
    transaction.data = web3.eth.abi.encodeFunctionCall(
        config.contractsAbi["AlastriaCredentialRegistry"]["getIssuerCredentialStatus"],
        [issuerCredentialHash, status]);
    transaction.to = config.alastriaCredentialRegistry;
    transaction.gasLimit = 600000;
    return transaction;
}

/**
 * Dev: get the invoke updateCredentialStatus transaction object
 * function getIssuerCredentialStatus(address issuer, bytes32 issuerCredentialHash) view public validAddress(issuer) returns (bool exists, Status status)
 * @param web3 ethereum connection
 * @param issuerAddr
 * @param issuerCredentialHash
 */
export function getIssuerCredentialStatus(web3, issuer, issuerCredentialHash) {
    let transaction = config.basicTransaction;
    transaction.data = web3.eth.abi.encodeFunctionCall(
        config.contractsAbi["AlastriaCredentialRegistry"]["getIssuerCredentialStatus"],
        [issuer, issuerCredentialHash]);
    transaction.to = config.alastriaCredentialRegistry;
    transaction.gasLimit = 600000;
    return transaction;
}

/**
 * Dev: Defining three status functions avoid linking the subject to the issuer or the corresponding hashes
 * @param web3 ethereum connection
 * @param subjectStatus
 * @param issuerStatus
 */
export function getCredentialStatus(web3, subjectStatus, issuerStatus) {
    let transaction = config.basicTransaction;
    transaction.data = web3.eth.abi.encodeFunctionCall(
        config.contractsAbi["AlastriaCredentialRegistry"]["getCredentialStatus"],
        [subjectStatus, issuerStatus]);
    transaction.to = config.alastriaCredentialRegistry;
    transaction.gasLimit = 600000;
    return transaction;
}

function delegated(web3, delegatedData) {
    return web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityManager"]["delegateCall"], [config.alastriaCredentialRegistry, 0, delegatedData])
  }
