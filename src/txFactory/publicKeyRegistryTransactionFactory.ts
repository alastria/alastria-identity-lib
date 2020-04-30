import { config } from '../config';

/**
 * function addKey(string memory publicKey, address subject) public
 * @param web3
 * @param publicKey
 */
export function addKey(web3, publicKey) {
  let transaction = Object.assign({}, config.basicTransaction)
  let delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["addKey"], 
    [publicKey]);
  transaction.data = delegated(web3, delegatedData);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction
}

/**
 * function revokePublicKey(string memory publicKey) public
 * @param web3
 * @param publicKey
 */
export function revokePublicKey(web3, publicKey) {
  let transaction = Object.assign({}, config.basicTransaction)
  let delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["revokePublicKey"], [publicKey]);
  transaction.data = delegated(web3, delegatedData);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function deletePublicKey(string memory publicKey) public
 * @param web3
 * @param publicKey
 */
export function deletePublicKey(web3, publicKey) {
  let transaction = Object.assign({}, config.basicTransaction)
  let delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["deletePublicKey"],
    [publicKey]);
  transaction.data = delegated(web3, delegatedData);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function getCurrentPublicKey(address subject) view public validAddress(subject) returns (string)
 * @param web3
 * @param subjdidSubjectect
 */
export function getCurrentPublicKey(web3, didSubject) {
  let subjectAddr = didSubject.split(':')[4]
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["getCurrentPublicKey"],
    [subjectAddr]);
  transaction.to = config.alastriaPublicKeyRegistry;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function getPublicKeyStatus(address subject, string memory publicKey) view public validAddress(subject)
 * @param web3
 * @param didSubject
 * @param publicKey
 */
export function getPublicKeyStatus(web3, didSubject, publicKey) {
  let subjectAddr = didSubject.split(':')[4]
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["getPublicKeyStatus"],
    [subjectAddr, publicKey]);
  transaction.to = config.alastriaPublicKeyRegistry;
  transaction.gasLimit = 600000;
  return transaction;
}


function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["delegateCall"],
    [config.alastriaPublicKeyRegistry, 0, delegatedData])
}
