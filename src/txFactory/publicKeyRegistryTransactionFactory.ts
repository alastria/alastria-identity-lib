import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'
import { AddressUtils } from '../utils/AddressUtils'

/**
 * THIS METHOD WILL BE DEPREATED
 * function addKey(string memory publicKey, address subject) public
 * @param web3
 * @param publicKey
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
 * @param web3
 * @param publicKeyHash
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
 * THIS METHOD WILL BE DEPREATED
 * @param web3
 * @param publicKey
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
 * @param web3
 * @param publicKeyHash
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
 * THIS METHOD WILL BE DEPREATED
 * @param web3
 * @param publicKey
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
 * @param web3
 * @param publicKeyHash
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
 * THIS METHOD WILL BE DEPREATED
 * @param web3
 * @param did
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
 * THIS METHOD WILL BE DEPREATED
 * @param web3
 * @param did
 * @param publicKey
 */
export function getPublicKeyStatus(web3, did, publicKey) {
  const subjectAddr = AIdUtils.getProxyAddress(did)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPublicKeyRegistry.getPublicKeyStatus,
    [subjectAddr, AddressUtils.getAddressWithoutHexPrefix(publicKey)]
  )
  transaction.to = config.alastriaPublicKeyRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * @param web3
 * @param did
 * @param publicKeyHash
 */
export function getPublicKeyStatusHash(web3, did, publicKeyHash) {
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
