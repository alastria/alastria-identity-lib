import { config } from '../config'
import { transactionFactory } from './transactionFactory'
import { AIdUtils } from '../utils/AIdUtils'
import { PublicKeyStatus } from '../interfaces'
import { AddressUtils } from '../utils/AddressUtils'

/**
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
 * function revokePublicKey(string memory publicKey) public
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
 * function deletePublicKey(string memory publicKey) public
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
 * function getCurrentPublicKey(address subject) view public validAddress(subject) returns (string)
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
 * @param publicKey
 */
export function getPublicKeyStatusDecodedAsJSON(
  web3,
  did,
  publicKey
): Promise<PublicKeyStatus> {
  const publicKeyStatusTx = getPublicKeyStatus(web3, did, publicKey)

  return new Promise((resolve) => {
    web3.eth.call(publicKeyStatusTx).then((data) => {
      const publicKeyStatusDecoded = web3.eth.abi.decodeParameters(
        ['bool', 'uint8', 'uint', 'uint'],
        data
      )
      const publicKeyStatusDecodedAsJSON = {
        exists: publicKeyStatusDecoded['0'],
        status: publicKeyStatusDecoded['1'],
        startDate: parseInt(publicKeyStatusDecoded['2']),
        endDate: parseInt(publicKeyStatusDecoded['3'])
      }
      resolve(publicKeyStatusDecodedAsJSON)
    })
  })
}

/**
 * @param web3
 * @param did
 * @param publicKey
 * @param date in milliseconds
 */
export function isPublicKeyValidForDate(web3, did, publicKey, date) {
  publicKey = AddressUtils.getAddressWithHexPrefix(publicKey)
  return new Promise((resolve, reject) => {
    transactionFactory.publicKeyRegistry
      .getPublicKeyStatusDecodedAsJSON(web3, did, publicKey)
      .then((publicKeyStatusAsJSON) => {
        const existsPublicKey = publicKeyStatusAsJSON.exists

        if (existsPublicKey) {
          const isUserDateBetweenDates = _isUserDateBetweeenDates(
            date,
            publicKeyStatusAsJSON.startDate,
            publicKeyStatusAsJSON.endDate
          )
          resolve(isUserDateBetweenDates)
        } else {
          reject(new Error('Public key does not exist'))
        }
      })
      .catch(() => {
        reject(new Error('Unresolved error'))
      })
  })
}

/**
 * @param userDate in milliseconds
 * @param publicKeyStartDate in milliseconds
 * @param publicKeyEndDate in milliseconds. If equals to 0, there is no enddate
 */
function _isUserDateBetweeenDates(
  userDate,
  publicKeyStartDate,
  publicKeyEndDate
) {
  if (publicKeyStartDate && publicKeyEndDate === 0) return true
  else return userDate >= publicKeyStartDate && userDate <= publicKeyEndDate
}

function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [config.alastriaPublicKeyRegistry, 0, delegatedData]
  )
}
