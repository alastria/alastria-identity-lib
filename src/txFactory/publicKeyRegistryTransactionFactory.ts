import { config } from '../config';

/**
 * function addKey(string memory publicKey, address subject) public
 * @param web3
 * @param publicKey
 * @param subject
 */
export function addKey(web3, publicKey) {
  let transaction = config.basicTransaction;
  let delegatedData = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaPublicKeyRegistry"]["addKey"], [publicKey]);
  transaction.data = delegated(web3, delegatedData);
  transaction.to = config.alastriaPublicKeyRegistry;
  transaction.gasLimit = 600000;
  return transaction
}

/**
 * function revokePublicKey(string memory publicKey) public
 * @param web3
 * @param publicKey
 */
export function revokePublicKey(web3, publicKey) {
  let transaction = config.basicTransaction;
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
  let transaction = config.basicTransaction;
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
 * @param subject
 */
export function getCurrentPublicKey(web3, subject) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["getCurrentPublicKey"],
    [subject]);
  transaction.to = config.alastriaPublicKeyRegistry;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function getPublicKeyStatus(address subject, string memory publicKey) view public validAddress(subject)
 * @param web3
 * @param subject
 * @param publicKey
 */
export function getPublicKeyStatus(web3, subject, publicKey) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["getPublicKeyStatus"],
    [subject, publicKey]);
  transaction.to = config.alastriaPublicKeyRegistry;
  transaction.gasLimit = 600000;
  return transaction;
}


function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["delegateCall"],
    [config.alastriaPublicKeyRegistry, 0, delegatedData])
}
