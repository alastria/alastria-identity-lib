import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'
import { AddressUtils } from '../utils/AddressUtils'

/**
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD addPublicKey
 * function addKey(string memory publicKey) public
 * @param web3 ethereum connection
 * @param publicKey the public key.
 */
export function addKey(web3, publicKey) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.addKey,
    [AddressUtils.getAddressWithoutHexPrefix(publicKey)]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function addPublicKey(bytes32 publicKeyHash) public
 * @param web3 ethereum connection
 * @param publicKeyHash the hash of the publickey. should have 32 bytes
 */
export function addPublicKey(web3, publicKeyHash) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.addPublicKey,
    [publicKeyHash]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD revokePublicKeyHash
 * function revokePublicKey(string memory publicKey) public
 * @param web3 ethereum connection
 * @param publicKey the public key.
 */
export function revokePublicKey(web3, publicKey) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.revokePublicKey,
    [AddressUtils.getAddressWithoutHexPrefix(publicKey)]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function revokePublicKey(bytes32 publicKeyHash) public
 * @param web3 ethereum connection
 * @param publicKeyHash the hash of the publickey. should have 32 bytes
 */
export function revokePublicKeyHash(web3, publicKeyHash) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.revokePublicKey,
    [publicKeyHash]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD deletePublicKeyHash
 * function deletePublicKey(string memory publicKey) public
 * @param web3 ethereum connection
 * @param publicKey the public key.
 */
export function deletePublicKey(web3, publicKey) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.deletePublicKey,
    [AddressUtils.getAddressWithoutHexPrefix(publicKey)]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function deletePublicKey(bytes32 publicKeyHash) public
 * @param web3 ethereum connection
 * @param publicKeyHash the hash of the publickey. should have 32 bytes
 */
export function deletePublicKeyHash(web3, publicKeyHash) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.deletePublicKey,
    [publicKeyHash]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD getPublicKeyStatusHash
 * function getCurrentPublicKey(address subject) view public
 * @param web3 ethereum connection
 * @param did alastri Id
 */
export function getCurrentPublicKey(web3, did) {
  const subjectAddr = AIdUtils.getProxyAddress(did)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.getCurrentPublicKey,
    [subjectAddr]
  )
  transaction.to = config.alastriaPublicKeyRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function getPublicKeyStatus(address subject, bytes32 publicKeyHash) view public
 * @param web3 ethereum connection
 * @param did alastri Id
 * @param publicKeyHash the hash of the publickey. should have 32 bytes
 */
export function getPublicKeyStatus(web3, did, publicKeyHash) {
  const subjectAddr = AIdUtils.getProxyAddress(did)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.getPublicKeyStatus,
    [subjectAddr, publicKeyHash]
  )
  transaction.to = config.alastriaPublicKeyRegistry
  transaction.gasLimit = 600000
  return transaction
}

function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [config.alastriaPublicKeyRegistry, 0, delegatedData]
  )
}
