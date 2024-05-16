import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'
import { AddressUtils } from '../utils/AddressUtils'

/**
 * function delegateCall(address _destination, uint256 _value, bytes _data) public
 * @param web3
 * @param _destination
 * @param _value
 * @param _data
 */
export function delegateCall(web3, _destination, _value, _data) {
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [_destination, _value, _data]
  )
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 5000000
  return transaction
}

/**
 * function generateAccessToken(address _signAddress) public onlyIdentityServiceProvider(msg.sender)
 * @param web3
 * @param signAddress
 */
export function prepareAlastriaID(web3, signAddress) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.prepareAlastriaID,
    [AddressUtils.getAddressWithHexPrefix(signAddress)]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * THIS METHOD WILL BE DEPREATED
 * @param web3
 * @param publicKey publicKey is a String
 */
export function createAlastriaIdentity(web3, publicKey) {
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.gasLimit = 600000
  const publicKeyCallData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.addKey,
    [AddressUtils.getAddressWithoutHexPrefix(publicKey)]
  )
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.createAlastriaIdentity,
    [publicKeyCallData]
  )
  transaction.to = config.alastriaIdentityManager
  return transaction
}

/**

 * @param web3
 * @param publicKeyHash
 */
export function createAlastriaIdentityHash(web3, publicKeyHash) {
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.gasLimit = 600000
  const publicKeyCallData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.addPublicKey,
    [publicKeyHash]
  )
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.createAlastriaIdentity,
    [publicKeyCallData]
  )
  transaction.to = config.alastriaIdentityManager
  return transaction
}

/**
 * AlastriaIdentityIssuer.sol
 * function addIdentityIssuer(address _identityIssuer, Eidas.EidasLevel _level) public alLeastLow(_level) notIdentityIssuer(_identityIssuer)
 * @param web3
 * @param didIssuer
 * @param level
 */
export function addIdentityIssuer(web3, didIssuer, level) {
  const issuerAddr = AIdUtils.getProxyAddress(didIssuer)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityIssuer.addIdentityIssuer,
    [issuerAddr, level]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function updateIdentityIssuerEidasLevel(address _identityIssuer, Eidas.EidasLevel _level) public alLeastLow(_level) onlyIdentityIssuer(_identityIssuer)
 * @param web3
 * @param didIssuer
 * @param level
 */
export function updateIdentityIssuerEidasLevel(web3, didIssuer, level) {
  const issuerAddr = AIdUtils.getProxyAddress(didIssuer)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityIssuer.updateIdentityIssuerEidasLevel,
    [issuerAddr, level]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function deleteIdentityIssuer(address _identityIssuer) public onlyIdentityIssuer(_identityIssuer)
 * @param web3
 * @param didIssuer
 */
export function deleteIdentityIssuer(web3, didIssuer) {
  const issuerAddr = AIdUtils.getProxyAddress(didIssuer)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityIssuer.deleteIdentityIssuer,
    [issuerAddr]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function getEidasLevel(address _identityIssuer) public constant onlyIdentityIssuer(_identityIssuer) returns (Eidas.EidasLevel)
 * @param web3
 * @param didIssuer
 */
export function getEidasLevel(web3, didIssuer) {
  const issuerAddr = AIdUtils.getProxyAddress(didIssuer)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityIssuer.getEidasLevel,
    [issuerAddr]
  )
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * AlastriaIdentityServiceProvider.sol
 * function addIdentityServiceProvider(address _identityServiceProvider) public notIdentityServiceProvider(_identityServiceProvider)
 * @param web3
 * @param didServiceProvider
 */
export function addIdentityServiceProvider(web3, didServiceProvider) {
  const providerAddr = AIdUtils.getProxyAddress(didServiceProvider)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.addIdentityServiceProvider,
    [providerAddr]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function deleteIdentityServiceProvider(address _identityServiceProvider) public onlyIdentityServiceProvider(_identityServiceProvider)
 * @param web3
 * @param didServiceProvider
 */
export function deleteIdentityServiceProvider(web3, didServiceProvider) {
  const providerAddr = AIdUtils.getProxyAddress(didServiceProvider)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.deleteIdentityServiceProvider,
    [providerAddr]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function isIdentityServiceProvider(address _identityServiceProvider) public constant returns (bool)
 * @param web3
 * @param didServiceProvider
 */
export function isIdentityServiceProvider(web3, didServiceProvider) {
  const providerAddr = AIdUtils.getProxyAddress(didServiceProvider)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityServiceProvider
      .isIdentityServiceProvider,
    [providerAddr]
  )
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function isIdentityIssuer(address _identityIssuer) public constant returns (bool)
 * @param web3
 * @param didIssuer
 */
export function isIdentityIssuer(web3, didIssuer) {
  const issuerAddr = AIdUtils.getProxyAddress(didIssuer)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityIssuer.isIdentityIssuer,
    [issuerAddr]
  )
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [config.alastriaIdentityManager, 0, delegatedData]
  )
}
