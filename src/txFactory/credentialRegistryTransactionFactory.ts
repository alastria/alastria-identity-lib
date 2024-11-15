import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'

/**
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD updateSubjectCredential
 * function addSubjectCredential(web3, subjectCredentialHash, URI)
 * Dev: get delegated invoke addSubjectCredential transaction object
 * @param web3 ethereum connection
 * @param subjectCredentialHash should have 32 bytes, credential identification
 * @param URI url for store the credentials for backup
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
 * function updateSubjectCredential(web3, subjectCredentialHash, status)
 * Dev: get delegated invoke updateSubjectCredential transaction object
 * @param web3 ethereum connection
 * @param subjectCredentialHash should have 32 bytes, credential identification
 * @param status uint that indicates the status of the credential
 */
export function updateSubjectCredential(web3, subjectCredentialHash, status) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.updateSubjectCredential,
    [subjectCredentialHash, status]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager // When delegated, target is alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD updateIssuerCredential
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
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD updateSubjectCredential
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
  const subjectAddr = AIdUtils.getProxyAddress(didSubject)
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
 * THIS METHOD WILL BE DEPREATED, USE INSTEAD updateIssuerCredential
 * function updateCredentialStatus(web3, issuerCredentialHash, status)
 * @param web3 ethereum connection
 * @param issuerCredentialHash should have 32 bytes
 * @param status uint that indicates the status of the credential
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
 * function updateIssuerCredential(web3, issuerCredentialHash, status)
 * @param web3 ethereum connection
 * @param issuerCredentialHash should have 32 bytes
 * @param status uint that indicates the status of the credential
 */
export function updateIssuerCredential(web3, issuerCredentialHash, status) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaCredentialRegistry.updateIssuerCredential,
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
 * @param didIssuer alastria Id
 * @param issuerCredentialHash should have 32 bytes
 */
export function getIssuerCredentialStatus(
  web3,
  didIssuer,
  issuerCredentialHash
) {
  const issuerAddr = AIdUtils.getProxyAddress(didIssuer)
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
 * THIS METHOD WILL BE DEPREATED
 * Dev: Defining three status functions avoid linking the subject to the issuer or the corresponding hashes
 * @param web3 ethereum connection
 * @param subjectStatus uint that indicates the status of the credential for subject
 * @param issuerStatus uint that indicates the status of the credential for issuer
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
