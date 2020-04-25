import { config } from '../config';

/**
 * function addKey(string memory publicKey, address subject) public
 * @param web3
 * @param publicKey
 * @param subject
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
 * @param subject
 */
export function getCurrentPublicKey(web3, subject) {
  let transaction = Object.assign({}, config.basicTransaction)
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
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaPublicKeyRegistry"]["getPublicKeyStatus"],
    [subject, publicKey]);
  transaction.to = config.alastriaPublicKeyRegistry;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function isPublicKeyValidForDate(address subject, string memory publicKey, date as int8)
 * @param web3
 * @param subject
 * @param publicKey
 * @param date in milliseconds
 */
export function isPublicKeyValidForDate(web3, subject, publicKey, date) {
  let publicKeyStatus = getPublicKeyStatus(web3, subject, publicKey);
  web3.eth.call(publicKeyStatus)
		.then(PublicKeyStatus => {
      let decodedPublicKeyStatus = web3.eth.abi.decodeParameters(["bool","uint8", 'uint', 'uint'], PublicKeyStatus)
      let existsPublicKey = decodedPublicKeyStatus[0];

      return(existsPublicKey) ? _isUserDateBetweeenDates(date, decodedPublicKeyStatus[2], decodedPublicKeyStatus[3]) : false;
	});
}

function _isUserDateBetweeenDates(userDate, publicKeyStartDate, publicKeyEndDate) {
  return (userDate >= publicKeyStartDate && userDate <= publicKeyEndDate);
}


function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["delegateCall"],
    [config.alastriaPublicKeyRegistry, 0, delegatedData])
}
