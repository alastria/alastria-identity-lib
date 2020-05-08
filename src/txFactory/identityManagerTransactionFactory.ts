import { config } from '../config';
import { didUtils } from '../utils/didUtils';


/**
 * function delegateCall(address _destination, uint256 _value, bytes _data) public
 * @param web3
 * @param _destination
 * @param _value
 * @param _data
 */
export function delegateCall(web3, _destination, _value, _data) {
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["delegateCall"],
    [_destination, _value, _data]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 5000000;
  return transaction;
}

/**
 * function generateAccessToken(address _signAddress) public onlyIdentityServiceProvider(msg.sender)
 * @param web3
 * @param signAddress
 */
export function prepareAlastriaID(web3, signAddress) {
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.to = config.alastriaIdentityManager;
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["prepareAlastriaID"],
    [signAddress]);
  transaction.gasLimit = 600000;
  return transaction
}

/**
 * function createAlastriaIdentity(bytes publicKeyData) public validAddress(msg.sender) isOnTimeToLiveAndIsFromCaller(msg.sender)
 * @param web3
 * @param publicKey publicKey is a String
 */
export function createAlastriaIdentity(web3, publicKey) {
    let transaction = Object.assign({}, config.basicTransaction)
    transaction.gasLimit = 600000;
    let publicKeyCallData = web3.eth.abi.encodeFunctionCall(
      config.contractsAbi["AlastriaPublicKeyRegistry"]["addKey"],
      [publicKey])
    transaction.data = web3.eth.abi.encodeFunctionCall(
      config.contractsAbi["AlastriaIdentityManager"]["createAlastriaIdentity"],
      [publicKeyCallData]);
    transaction.to = config.alastriaIdentityManager;
    return transaction;
}

/**
 * AlastriaIdentityIssuer.sol
 * function addIdentityIssuer(address _identityIssuer, Eidas.EidasLevel _level) public alLeastLow(_level) notIdentityIssuer(_identityIssuer)
 * @param web3
 * @param didIssuer
 * @param level
 */
export function addIdentityIssuer(web3, didIssuer, level) {
  let issuerAddr = didUtils.getProxyAddress(didIssuer)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityIssuer"]["addIdentityIssuer"],
    [issuerAddr, level]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function updateIdentityIssuerEidasLevel(address _identityIssuer, Eidas.EidasLevel _level) public alLeastLow(_level) onlyIdentityIssuer(_identityIssuer)
 * @param web3
 * @param didIssuer
 * @param level
 */
export function updateIdentityIssuerEidasLevel(web3, didIssuer, level) {
  let issuerAddr = didUtils.getProxyAddress(didIssuer)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityIssuer"]["updateIdentityIssuerEidasLevel"],
    [issuerAddr, level]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function deleteIdentityIssuer(address _identityIssuer) public onlyIdentityIssuer(_identityIssuer)
 * @param web3
 * @param didIssuer
 */
export function deleteIdentityIssuer(web3, didIssuer) {
  let issuerAddr = didUtils.getProxyAddress(didIssuer)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityIssuer"]["deleteIdentityIssuer"],
    [issuerAddr]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function getEidasLevel(address _identityIssuer) public constant onlyIdentityIssuer(_identityIssuer) returns (Eidas.EidasLevel)
 * @param web3
 * @param didIssuer
 */
export function getEidasLevel(web3, didIssuer) {
  let issuerAddr = didUtils.getProxyAddress(didIssuer)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityIssuer"]["getEidasLevel"],
    [issuerAddr]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * AlastriaIdentityServiceProvider.sol
 * function addIdentityServiceProvider(address _identityServiceProvider) public notIdentityServiceProvider(_identityServiceProvider)
 * @param web3
 * @param didServiceProvider
 */
export function addIdentityServiceProvider(web3, didServiceProvider) {
  let providerAddr = didUtils.getProxyAddress(didServiceProvider)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.to = config.alastriaIdentityManager;
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["addIdentityServiceProvider"],
    [providerAddr]);
  transaction.gasLimit = 600000;
  return transaction
}

/**
 * function deleteIdentityServiceProvider(address _identityServiceProvider) public onlyIdentityServiceProvider(_identityServiceProvider)
 * @param web3
 * @param didServiceProvider
 */
export function deleteIdentityServiceProvider(web3, didServiceProvider) {
  let providerAddr = didUtils.getProxyAddress(didServiceProvider)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityManager"]["deleteIdentityServiceProvider"],
    [providerAddr]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function isIdentityServiceProvider(address _identityServiceProvider) public constant returns (bool)
 * @param web3
 * @param didServiceProvider
 */
export function isIdentityServiceProvider(web3, didServiceProvider) {
  let providerAddr = didUtils.getProxyAddress(didServiceProvider)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityServiceProvider"]["isIdentityServiceProvider"],
    [providerAddr]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}


/**
 * function isIdentityIssuer(address _identityIssuer) public constant returns (bool)
 * @param web3
 * @param didIssuer
 */
export function isIdentityIssuer(web3, didIssuer) {
  let issuerAddr = didUtils.getProxyAddress(didIssuer)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityIssuer"]["isIdentityIssuer"],
    [issuerAddr]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function addEntity(address _addressEntity, string _name, string _cif, string _url_logo, string _url_createAID, string _url_AOA, bool _active) public onlyIdentityEntity(msg.sender)
 * @param web3
 * @param didEntity
 * @param name
 * @param cif
 * @param urlLogo
 * @param urlCreateAID
 * @param urlAOA
 * @param status
 */
export function addEntity(web3, didEntity, name, cif, urlLogo, urlCreateAID, urlAOA, status) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["addEntity"],
    [entityAddr, name, cif, urlLogo, urlCreateAID, urlAOA, status]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function setNameEntity(address _addressEntity, string _name) public
 * @param web3
 * @param didEntity
 * @param name 
 */
export function setNameEntity(web3, didEntity, name) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["setNameEntity"],
    [entityAddr, name]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function setCifEntity(address _addressEntity, string _cif) public
 * @param web3
 * @param didEntity
 * @param cif 
 */
export function setCifEntity(web3, didEntity, cif) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["setCifEntity"],
    [entityAddr, cif]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function setUrlLogo(address _addressEntity, string _url_logo) public
 * @param web3
 * @param didEntity
 * @param urlLogo 
 */
export function setUrlLogo(web3, didEntity, urlLogo) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["setUrlLogo"],
    [entityAddr, urlLogo]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function setUrlCreateAID(address _addressEntity, string _url_createAID) public
 * @param web3
 * @param didEntity
 * @param urlCreateAID 
 */
export function setUrlCreateAID(web3, didEntity, urlCreateAID) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["setUrlCreateAID"],
    [entityAddr, urlCreateAID]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function setUrlAOA(address _addressEntity, string _url_AOA) public
 * @param web3
 * @param didEntity
 * @param urlAOA 
 */
export function setUrlAOA(web3, didEntity, urlAOA) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["setUrlAOA"],
    [entityAddr, urlAOA]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function getEntity(address _addressEntity) public view returns(string _name, string _cif, string _url_logo, string _url_createAID, string _url_AOA, bool _active)
 * @param web3
 * @param didEntity
 */
export function getEntity(web3, didEntity) {
  let entityAddr = didUtils.getProxyAddress(didEntity)
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["getEntity"],
    [entityAddr]);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}

/**
 * function entitiesList() public view returns(address[])
 * @param web3
 */
export function entitiesList(web3) {
  let transaction = Object.assign({}, config.basicTransaction)
  transaction.data = web3.eth.abi.encodeFunctionCall(
    config.contractsAbi["AlastriaIdentityEntity"]["entitiesList"],
    []);
  transaction.to = config.alastriaIdentityManager;
  transaction.gasLimit = 600000;
  return transaction;
}