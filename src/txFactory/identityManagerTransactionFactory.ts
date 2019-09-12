import { config } from '../config';

/**
 * function delegateCall(address _destination, uint256 _value, bytes _data) public
 * @param web3
 * @param _destination
 * @param _value
 * @param _data
 */
export function delegateCall(web3, _destination, _value, _data) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityManager"]["delegateCall"], [_destination, _value, _data]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 5000000;
  return transaction;
}

/**
 * function generateAccessToken(address _signAddress) public onlyIdentityServiceProvider(msg.sender)
 * @param web3
 * @param signAddress
 */
export function generateAccessToken(web3, signAddress) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityManager"]["generateAccessToken"], [signAddress]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function createAlastriaIdentity(bytes publicKeyData) public validAddress(msg.sender) isOnTimeToLiveAndIsFromCaller(msg.sender)
 * @param web3
 * @param publicKeyData
 */
export function createAlastriaIdentity(web3, publicKeyData) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityManager"]["createAlastriaIdentity"], [publicKeyData]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

// AlastriaIdentityIssuer.sol
/**
 * function addIdentityIssuer(address _identityIssuer, Eidas.EidasLevel _level) public alLeastLow(_level) notIdentityIssuer(_identityIssuer)
 * @param web3
 * @param identityIssuer
 * @param level
 */
export function addIdentityIssuer(web3, identityIssuer, level) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityIssuer"]["addIdentityIssuer"], [identityIssuer, level]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function updateIdentityIssuerEidasLevel(address _identityIssuer, Eidas.EidasLevel _level) public alLeastLow(_level) onlyIdentityIssuer(_identityIssuer)
 * @param web3
 * @param identityIssuer
 * @param level
 */
export function updateIdentityIssuerEidasLevel(web3, identityIssuer, level) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityIssuer"]["updateIdentityIssuerEidasLevel"], [identityIssuer, level]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function deleteIdentityIssuer(address _identityIssuer) public onlyIdentityIssuer(_identityIssuer)
 * @param web3
 * @param identityIssuer
 */
export function deleteIdentityIssuer(web3, identityIssuer) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityIssuer"]["deleteIdentityIssuer"], [identityIssuer]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function getEidasLevel(address _identityIssuer) public constant onlyIdentityIssuer(_identityIssuer) returns (Eidas.EidasLevel)
 * @param web3
 * @param identityIssuer
 */
export function getEidasLevel(web3, identityIssuer) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityIssuer"]["getEidasLevel"], [identityIssuer]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

// AlastriaIdentityServiceProvider.sol
/**
 * function addIdentityServiceProvider(address _identityServiceProvider) public notIdentityServiceProvider(_identityServiceProvider)
 * @param web3
 * @param identityServiceProvider
 */
export function addIdentityServiceProvider(web3, identityServiceProvider) {
  return new Promise((resolve, reject) => {
    let transaction = config.basicTransaction;
    transaction.from = '0xcc08cb64f42cacfa0e74375128147aae39105115';
    web3.eth.getTransactionCount(transaction.from)
    .then(mynonce => {
      transaction.nonce = mynonce
      transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityServiceProvider"]["addIdentityServiceProvider"], [identityServiceProvider]);
      transaction.to = config.alastriaIdentityManager;
      transaction.gasLimit = 600000;
      resolve(transaction)
    })
    .catch(error => {
      console.log('Error ----> ', error)
      reject(error)
    })
  })
}

/**
 * function deleteIdentityServiceProvider(address _identityServiceProvider) public onlyIdentityServiceProvider(_identityServiceProvider)
 * @param web3
 * @param identityServiceProvider
 */
export function deleteIdentityServiceProvider(web3, identityServiceProvider) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityServiceProvider"]["deleteIdentityServiceProvider"], [identityServiceProvider]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function isIdentityServiceProvider(address _identityServiceProvider) public constant returns (bool)
 * @param web3
 * @param identityServiceProvider
 */
export function isIdentityServiceProvider(web3, identityServiceProvider) {
  let transaction = config.basicTransaction;
  transaction.data = web3.eth.abi.encodeFunctionCall(config.contractsAbi["AlastriaIdentityServiceProvider"]["isIdentityServiceProvider"], [identityServiceProvider]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

  /*

EJEMPLO

  export function addIdentityServiceProvider(identityServiceProvider, web3) {
    return new Promise((resolve, reject) => {
      let transaction = basicTransaction;
      transaction.from = '0x' + identityServiceProvider
      web3.eth.getTransactionCount(transaction.from)
      .then(mynonce => {
          transaction.data = "0x" + addIdentityServiceProviderFunctionHash + padLeft(identityServiceProvider.slice(2), 64);
          transaction.gas = 600000;
          transaction.nonce = mynonce
          resolve(transaction)
      })
      .catch(error => {
          console.log(error)
          reject(error)
      })
  })
  }


  */
