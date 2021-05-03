import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'

/**
 * function addSubjectCredential(web3, subjectCredentialHash, URI)
 * Dev: get delegated invoke addSubjectCredential transaction object
 * @param web3 ethereum connection
 * @param subjectCredentialHash should have 32 bytes, credential identification
 */
export function addSubjectCredential(web3, subjectCredentialHash, URI) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.addSubjectCredential,
    [subjectCredentialHash, URI]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager // When delegated, target is alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function addIssuerCredential(web3, issuerCredentialHash)
 * Dev: get delegated invoke addIssuerCredential transaction object
 * @param web3 ethereum connection
 * @param issuerCredentialHash should have 32 bytes, credential identification
 */
export function addIssuerCredential(web3, issuerCredentialHash) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.addIssuerCredential,
    [issuerCredentialHash]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager // When delegated, target is alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function deleteSubjectCredential(web3, subjectCredentialHash)
 * Dev: get delegated invoke deleteSubjectCredential transaction object
 * @param web3 ethereum connection
 * @param subjectCredentialHash should have 32 bytes
 */
export function deleteSubjectCredential(web3, subjectCredentialHash) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.deleteSubjectCredential,
    [subjectCredentialHash]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager // When delegated, target is alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function getSubjectCredentialStatus(web3, subject, subjectCredentialHash)
 * Dev: get invoke getSubjectCredentialStatus transaction object
 * @param web3 ethereum connection
 * @param didSubject alastria Id
 * @param subjectCredentialHash should have 32 bytes
 */
export function getSubjectCredentialStatus(
  web3,
  didSubject,
  subjectCredentialHash
) {
  const subjectAddr = `0x${AIdUtils.getProxyAddress(didSubject)}`
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.getSubjectCredentialStatus,
    [subjectAddr, subjectCredentialHash]
  )
  transaction.to = config.alastriaCredentialRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function getSubjectCredentialList(web3, subject)
 * Dev: get invoke getSubjectCredentialList transaction object
 * @param web3 ethereum connection
 * @param didSubject subject to recover credential list
 */
export function getSubjectCredentialList(web3, didSubject) {
  const subjectAddr = `0x${AIdUtils.getProxyAddress(didSubject)}`
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.getSubjectCredentialList,
    [subjectAddr]
  )
  transaction.to = config.alastriaCredentialRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function updateCredentialStatus(web3, issuerCredentialHash, status)
 * @param web3
 * @param issuerCredentialHash
 * @param status
 */
export function updateCredentialStatus(web3, issuerCredentialHash, status) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.updateCredentialStatus,
    [issuerCredentialHash, status]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * Dev: get the invoke updateCredentialStatus transaction object
 * function getIssuerCredentialStatus(address issuer, bytes32 issuerCredentialHash) view public validAddress(issuer) returns (bool exists, Status status)
 * @param web3 ethereum connection
 * @param didIssuer
 * @param issuerCredentialHash
 */
export function getIssuerCredentialStatus(
  web3,
  didIssuer,
  issuerCredentialHash
) {
  const issuerAddr = `0x${AIdUtils.getProxyAddress(didIssuer)}`
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.getIssuerCredentialStatus,
    [issuerAddr, issuerCredentialHash]
  )
  transaction.to = config.alastriaCredentialRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * Dev: Defining three status functions avoid linking the subject to the issuer or the corresponding hashes
 * @param web3 ethereum connection
 * @param subjectStatus
 * @param issuerStatus
 */
export function getCredentialStatus(web3, subjectStatus, issuerStatus) {
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.getCredentialStatus,
    [subjectStatus, issuerStatus]
  )
  transaction.to = config.alastriaCredentialRegistry
  transaction.gasLimit = 600000
  return transaction
}

function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [config.alastriaCredentialRegistry, 0, delegatedData]
  )
}
