//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import { toHex, padLeft, padRight } from 'web3-utils';

// TODO: import contract address from configfile
const publicKeyRegistry = '0x32340d1Fbe4b4290504A7486531FbB86242D0aA2';
const credentialRegistry = '0x879bC25943A7b430c3f456CaCCE9F056a4dEDF23';
const presentationRegistry = '0x44560E5d258E753D3Ff432a585Ef01de00D286f8';

const generateAccessTokenFunctionHash = '4284f8d4';
const createAlastriaIdentityFunctionHash = '6d69d99a';
const addSubjectCredentialFunctionHash = 'e04ce02c';
const addSubjectPresentationFunctionHash = '4e3a5de5';
const updateSubjectPresentationFunctionHash = 'e64af938';
const updateReceiverPresentationFunctionHash = '3000dc39';
const addIdentityIssuerFunctionHash = '889776a8';
const updateIdentityIssuerEidasLevelFunctionHash = '44963610';
const deleteIdentityIssuerFunctionHash = 'cb691599';
const getEidasLevelFunctionHash = '0e5a4fbb';
const addIdentityServiceProviderFunctionHash = '0ebbbffc';
const deleteServiceProviderFunctionHash = '3bf47215';
const isIdentityServiceProviderFunctionHash = 'd024d9a4';

const alastriaIdentityManager = '0x73864d52a004e968b7aca6042d4e351e283c3a60';
const basicTransaction = {
  from: '',
  to: alastriaIdentityManager,
  data: '',
  gas: 0,
  nonce: ''
}
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
const delegateCallSignature = '597b2e9b';
const delegateCallInvoke = (registryAddress) => { return `${delegateCallSignature}000000000000000000000000${registryAddress.slice(2, 40)}${zeroValue}` }



export function generateAccessToken(signAddress) {
  let transaction = basicTransaction;
  transaction.data = `0x${delegateCallInvoke(alastriaIdentityManager)}
  ${generateAccessTokenFunctionHash}
  ${padLeft(signAddress.slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}

export function createAlastriaIdentity(publicKeyData) {
  let transaction = basicTransaction;
  transaction.data = `0x${delegateCallInvoke(alastriaIdentityManager)}
  ${createAlastriaIdentityFunctionHash}
  0000000000000000000000000000000000000000000000000000000000000020
  ${padLeft(toHex(publicKeyData.length).slice(2), 64)}
  ${padRight(toHex(publicKeyData).slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}

export function createIdentity(publicKey) {
  let transaction = basicTransaction;
  transaction.data = `0x6d69d99a
    0000000000000000000000000000000000000000000000000000000000000020
    ${padLeft(publicKey.length, 64)}
    60e6cfd87fdf96e9f8749d267319088775ad1cc245e5cd9fa0d6567426788a3e
    a10e675e00000000000000000000000000000000000000000000000000000000`;
  transaction.gas = 200000;
  return transaction;
}

/**
 * @param presentationHash should have 32 bytes
 */
const addSubjectPresentationCost = 200000;
export function addSubjectCredential(presentationHash, uri) {
  let transaction = basicTransaction;
  transaction.data =
    `0x${delegateCallInvoke(credentialRegistry)}${addSubjectCredentialFunctionHash}${presentationHash}
    0000000000000000000000000000000000000000000000000000000000000040
    ${padLeft(uri.length, 64)}${toHex(uri)}`;
  transaction.gas = addSubjectPresentationCost;
  return transaction;
}

// PresentationRegistry.sol

export function addSubjectPresentation(subjectPresentationHash, uri) {
  let transaction = basicTransaction;
  transaction.data = `0x${delegateCallInvoke(presentationRegistry)}
  ${addSubjectPresentationFunctionHash}
  ${padRight(subjectPresentationHash.slice(2), 64)}
  0000000000000000000000000000000000000000000000000000000000000040
  ${padLeft(toHex(uri.length).slice(2), 64)}
  ${padRight(toHex(uri).slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}

export function updateSubjectPresentation(subjectPresentationHash, status) {
  let transaction = basicTransaction;
  transaction.data = `${delegateCallInvoke(presentationRegistry)}
  ${updateSubjectPresentationFunctionHash}
  ${padRight(subjectPresentationHash.slice(2), 64)}
  ${padLeft(toHex(status).slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}

export function updateReceiverPresentation(receiverPresentationHash, status) {
  let transaction = basicTransaction;
  transaction.data = `${delegateCallInvoke(presentationRegistry)}
  ${updateReceiverPresentationFunctionHash}
  ${padRight(receiverPresentationHash.slice(2), 64)}
  ${padLeft(toHex(status).slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}


// PublicKey Registry TxFactory
export function addKey(publicKey) {
  let callSignature = "60e6cfd8";
  let tx = basicTransaction;
  tx.data =
    `0x${delegateCallInvoke(publicKeyRegistry)}
      ${callSignature}
      ${padLeft(publicKey.slice(2), 64)}`;
  tx.gas = 600000;
  return tx;
}

export function revokePublicKey(publicKey) {
  let callSignature = "a8c59169";
  let tx = basicTransaction;
  tx.data =
    `0x${delegateCallInvoke(publicKeyRegistry)}
    ${callSignature}
    ${padLeft(publicKey.slice(2), 64)}`;
  tx.gas = 600000;
  return tx;
}

export function deletePublicKey(publicKey) {
  let callSignature = "1993b4f9";
  let tx = basicTransaction;
  tx.data =
    `0x${delegateCallInvoke(publicKeyRegistry)}
    ${callSignature}
    ${padLeft(publicKey.slice(2), 64)}`;
  tx.gas = 600000;
  return tx;
}


// Credential Registry TxFactory
export function updateCredentialStatus(issuerCredHash, status) {
  let callSignature = "dd517e10";
  let tx = basicTransaction;
  tx.data =
    `0x${delegateCallInvoke(credentialRegistry)}
    ${callSignature}
    ${padLeft(issuerCredHash.slice(2), 64)}
    ${toHex(padLeft(status, 64)).slice(2)}`;
  tx.gas = 600000;
  return tx;
}

 // AlastriaIdentityIssuer.sol

 export function addIdentityIssuer(identityIssuer, level) {
   let transaction = basicTransaction;
   transaction.data = `0x${delegateCallInvoke(alastriaIdentityManager)}${addIdentityIssuerFunctionHash}${identityIssuer}
   0000000000000000000000000000000000000000000000000000000000000040
   ${padLeft(level.length, 64)}${toHex(level)}`;
   transaction.gas = 600000;
   return transaction;
 }

 export function updateIdentityIssuerEidasLevel(identityIssuer, level) {
   let transaction = basicTransaction;
   transaction.data = `${delegateCallInvoke(alastriaIdentityManager)}
   ${updateIdentityIssuerEidasLevelFunctionHash}
   ${padRight(identityIssuer.slice(2), 64)}
   ${padLeft(toHex(level).slice(2), 64)}`;
   transaction.gas = 600000;
   return transaction;
 }

 export function deleteIdentityIssuer(identityIssuer) {
   let callSignature = "1993b4f9";
   let transaction = basicTransaction;
   transaction.data =
   `0x${delegateCallInvoke(alastriaIdentityManager)}${deleteIdentityIssuerFunctionHash}
   ${callSignature}
   ${padLeft(identityIssuer.slice(2), 64)}`;
   transaction.gas = 600000;
   return transaction;
 }

 export function getEidasLevel(identityIssuer) {
   let transaction = basicTransaction;
   transaction.data = `0x${delegateCallInvoke(alastriaIdentityManager)}${getEidasLevelFunctionHash}
   ${padLeft(identityIssuer.slice(2), 64)}`;
   return transaction;
 }

  // AlastriaIdentityServiceProvider.sol

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

  export function deleteIdentityServiceProvider(identityServiceProvider) {
    let callSignature = "1993b4f9";
    let transaction = basicTransaction;
    transaction.data = `0x${delegateCallInvoke(alastriaIdentityManager)}${deleteServiceProviderFunctionHash}
    ${callSignature}
    ${padLeft(identityServiceProvider.slice(2), 64)}`;
    transaction.gas = 600000;
    return transaction;
  }

  export function isIdentityServiceProvider(identityServiceProvider) {
      let transaction = basicTransaction;
      transaction.data = `0x${delegateCallInvoke(alastriaIdentityManager)}${isIdentityServiceProviderFunctionHash}
      ${padLeft(identityServiceProvider.slice(2), 64)}`;
      return transaction;
  }
