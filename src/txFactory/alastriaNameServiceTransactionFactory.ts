import { config } from '../config'
import { AIdUtils } from '../utils/AIdUtils'

/**
 * function addEntity(address _addressEntity, string _name, string _cif, string _url_logo, string _url_createAID, string _url_AOA, bool _active) public onlyIdentityEntity(msg.sender)
 * @param web3
 * @param didEntity
 * @param name
 * @param cif
 * @param urlLogo
 * @param urlCreateAID
 * @param urlAOA
 */
export function addEntity(
  web3,
  didEntity,
  name,
  cif,
  urlLogo,
  urlCreateAID,
  urlAOA
) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.addEntity,
    [entityAddr, name, cif, urlLogo, urlCreateAID, urlAOA]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function setNameEntity(address _addressEntity, string _name) public
 * @param web3
 * @param didEntity
 * @param name
 */
export function setNameEntity(web3, didEntity, name) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.setNameEntity,
    [entityAddr, name]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function setCifEntity(address _addressEntity, string _cif) public
 * @param web3
 * @param didEntity
 * @param cif
 */
export function setCifEntity(web3, didEntity, cif) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.setCifEntity,
    [entityAddr, cif]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function setUrlLogo(address _addressEntity, string _url_logo) public
 * @param web3
 * @param didEntity
 * @param urlLogo
 */
export function setUrlLogo(web3, didEntity, urlLogo) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.setUrlLogo,
    [entityAddr, urlLogo]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function setUrlCreateAID(address _addressEntity, string _url_createAID) public
 * @param web3
 * @param didEntity
 * @param urlCreateAID
 */
export function setUrlCreateAID(web3, didEntity, urlCreateAID) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.setUrlCreateAID,
    [entityAddr, urlCreateAID]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function setUrlAOA(address _addressEntity, string _url_AOA) public
 * @param web3
 * @param didEntity
 * @param urlAOA
 */
export function setUrlAOA(web3, didEntity, urlAOA) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  const delegatedData = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.setUrlAOA,
    [entityAddr, urlAOA]
  )
  transaction.data = delegated(web3, delegatedData)
  transaction.to = config.alastriaIdentityManager
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function getEntity(address _addressEntity) public view returns(string _name, string _cif, string _url_logo, string _url_createAID, string _url_AOA, bool _active)
 * @param web3
 * @param didEntity
 */
export function getEntity(web3, didEntity) {
  const entityAddr = AIdUtils.getProxyAddress(didEntity)
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.getEntity,
    [entityAddr]
  )
  transaction.to = config.alastriaNameService
  transaction.gasLimit = 600000
  return transaction
}

/**
 * function entitiesList() public view returns(address[])
 * @param web3
 */
export function entitiesList(web3) {
  const transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaNameService.entitiesList,
    []
  )
  transaction.to = config.alastriaNameService
  transaction.gasLimit = 600000
  return transaction
}

function delegated(web3, delegatedData) {
  return web3.eth.abi.encodeFunctionCall(
    config.contractsAbi.AlastriaIdentityManager.delegateCall,
    [config.alastriaNameService, 0, delegatedData]
  )
}
