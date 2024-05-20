import {
  addSubjectCredential,
  addIssuerCredential,
  deleteSubjectCredential,
  getSubjectCredentialStatus,
  updateCredentialStatus,
  getIssuerCredentialStatus,
  getCredentialStatus
} from './credentialRegistryTransactionFactory'

import {
  delegateCall,
  prepareAlastriaID,
  createAlastriaIdentity,
  addIdentityIssuer,
  updateIdentityIssuerEidasLevel,
  deleteIdentityIssuer,
  getEidasLevel,
  addIdentityServiceProvider,
  deleteIdentityServiceProvider,
  isIdentityServiceProvider,
  isIdentityIssuer,
  createAlastriaIdentityHash
} from './identityManagerTransactionFactory'

import {
  addEntity,
  setNameEntity,
  setCifEntity,
  setUrlLogo,
  setUrlCreateAID,
  setUrlAOA,
  getEntity,
  entitiesList
} from './alastriaNameServiceTransactionFactory'

import {
  addSubjectPresentation,
  updateSubjectPresentation,
  getSubjectPresentationStatus,
  updateReceiverPresentation,
  getReceiverPresentationStatus,
  getPresentationStatus
} from './presentationRegistryTransactionFactory'

import {
  addKey,
  revokePublicKey,
  deletePublicKey,
  getCurrentPublicKey,
  getPublicKeyStatus,
  getPublicKeyStatusDecodedAsJSON,
  isPublicKeyValidForDate,
  isPublicKeyValidForDateHash,
  getPublicKeyStatusDecodedAsJSONHash,
  getPublicKeyStatusHash,
  deletePublicKeyHash,
  revokePublicKeyHash,
  addPublicKey,
  getCurrentPublicKeyHash
} from './publicKeyRegistryTransactionFactory'

export const transactionFactory = {
  credentialRegistry: {
    addSubjectCredential: addSubjectCredential,
    addIssuerCredential: addIssuerCredential,
    deleteSubjectCredential: deleteSubjectCredential,
    getSubjectCredentialStatus: getSubjectCredentialStatus,
    updateCredentialStatus: updateCredentialStatus,
    getIssuerCredentialStatus: getIssuerCredentialStatus,
    getCredentialStatus: getCredentialStatus
  },
  alastriaNameService: {
    addEntity: addEntity,
    setNameEntity: setNameEntity,
    setCifEntity: setCifEntity,
    setUrlLogo: setUrlLogo,
    setUrlCreateAID: setUrlCreateAID,
    setUrlAOA: setUrlAOA,
    getEntity: getEntity,
    entitiesList: entitiesList
  },
  identityManager: {
    delegateCall: delegateCall,
    prepareAlastriaID: prepareAlastriaID,
    createAlastriaIdentity: createAlastriaIdentity,
    createAlastriaIdentityHash: createAlastriaIdentityHash,
    addIdentityIssuer: addIdentityIssuer,
    updateIdentityIssuerEidasLevel: updateIdentityIssuerEidasLevel,
    deleteIdentityIssuer: deleteIdentityIssuer,
    getEidasLevel: getEidasLevel,
    addIdentityServiceProvider: addIdentityServiceProvider,
    deleteIdentityServiceProvider: deleteIdentityServiceProvider,
    isIdentityServiceProvider: isIdentityServiceProvider,
    isIdentityIssuer: isIdentityIssuer
  },
  presentationRegistry: {
    addSubjectPresentation: addSubjectPresentation,
    updateSubjectPresentation: updateSubjectPresentation,
    getSubjectPresentationStatus: getSubjectPresentationStatus,
    updateReceiverPresentation: updateReceiverPresentation,
    getReceiverPresentationStatus: getReceiverPresentationStatus,
    getPresentationStatus: getPresentationStatus
  },
  publicKeyRegistry: {
    addKey: addKey,
    addPublicKey: addPublicKey,
    revokePublicKey: revokePublicKey,
    revokePublicKeyHash: revokePublicKeyHash,
    deletePublicKey: deletePublicKey,
    deletePublicKeyHash: deletePublicKeyHash,
    getCurrentPublicKey: getCurrentPublicKey,
    getCurrentPublicKeyHash: getCurrentPublicKeyHash,
    getPublicKeyStatus: getPublicKeyStatus,
    getPublicKeyStatusHash: getPublicKeyStatusHash,
    getPublicKeyStatusDecodedAsJSON: getPublicKeyStatusDecodedAsJSON,
    getPublicKeyStatusDecodedAsJSONHash: getPublicKeyStatusDecodedAsJSONHash,
    isPublicKeyValidForDate: isPublicKeyValidForDate,
    isPublicKeyValidForDateHash: isPublicKeyValidForDateHash
  }
}
