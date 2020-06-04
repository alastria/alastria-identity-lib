import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'

export function addSubjectPresentation(web3, subjectPresentationHash, URI) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry.addSubjectPresentation,
    [subjectPresentationHash, URI]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * Subject functions
 * function updateSubjectPresentation(bytes32 subjectPresentationHash, Status status) public validStatus(status)
 * @param web3
 * @param subjectPresentationHash
 */
export function updateSubjectPresentation(
  web3,
  subjectPresentationHash,
  status
) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry.updateSubjectPresentation,
    [subjectPresentationHash, status]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * If the Presentation does not exists the return is a void Presentation
 * If we want a log, should we add an event?
 * function getSubjectPresentationStatus(address subject, bytes32 subjectPresentationHash) view public validAddress(subject) returns(bool exists, Status status)
 * @param web3
 * @param didSubject
 * @param subsubjectPresentationHashject
 */
export function getSubjectPresentationStatus(
  web3,
  didSubject,
  subsubjectPresentationHashject
) {
  const subjectAddr = AIdUtils.getProxyAddress(didSubject)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry
      .getSubjectPresentationStatus,
    [subjectAddr, subsubjectPresentationHashject]
  )
  transaction.to = config.alastriaPresentationRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function getSubjectPresentationList(address subject) public view returns(uint, bytes32[])
 * @param web3
 * @param didSubject
 */
export function getSubjectPresentationList(web3, didSubject) {
  const subjectAddr = AIdUtils.getProxyAddress(didSubject)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry.getSubjectPresentationList,
    [subjectAddr]
  )
  transaction.to = config.alastriaPresentationRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * Receiver functions
 * function updateReceiverPresentation(bytes32 receiverPresentationHash, Status status) public validStatus(status)
 * @param web3
 * @param receiverPresentationHash
 * @param status
 */
export function updateReceiverPresentation(
  web3,
  receiverPresentationHash,
  status
) {
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry.updateReceiverPresentation,
    [receiverPresentationHash, status]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * If the Presentation does not exists the return is a void Presentation
 * If we want a log, should we add an event?
 * function getReceiverPresentationStatus(address receiver, bytes32 receiverPresentationHash) view public validAddress(receiver) returns(bool exists, Status status) {
 * @param web3
 * @param didReceiver
 * @param receiverPresentationHash
 */
export function getReceiverPresentationStatus(
  web3,
  didReceiver,
  receiverPresentationHash
) {
  const receiverAddr = AIdUtils.getProxyAddress(didReceiver)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry
      .getReceiverPresentationStatus,
    [receiverAddr, receiverPresentationHash]
  )
  transaction.to = config.alastriaPresentationRegistry
  transaction.gasLimit = 600000
  return transaction
}

/**
 * Utility function
 * Defining three status functions avoids linking the Subject to the Receiver or the corresponding hashes
 * function getPresentationStatus(Status subjectStatus, Status receiverStatus) pure public validStatus(subjectStatus) validStatus(receiverStatus) returns(Status){
 * @param web3
 * @param subjectStatus
 * @param receiverStatus
 */
export function getPresentationStatus(web3, subjectStatus, receiverStatus) {
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaPresentationRegistry.getPresentationStatus,
    [subjectStatus, receiverStatus]
  )
  transaction.to = config.alastriaPresentationRegistry
  transaction.gasLimit = 600000
  return transaction
}

function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [config.alastriaPresentationRegistry, 0, delegatedData]
  )
}
