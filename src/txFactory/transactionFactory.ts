import {
  addSubjectCredential,
  updateSubjectCredential,
  addIssuerCredential,
  updateIssuerCredential,
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
  createAlastriaIdentityHash,
  addIdentityIssuer,
  updateIdentityIssuerEidasLevel,
  deleteIdentityIssuer,
  getEidasLevel,
  addIdentityServiceProvider,
  deleteIdentityServiceProvider,
  isIdentityServiceProvider,
  isIdentityIssuer
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
  addPublicKey,
  revokePublicKey,
  revokePublicKeyHash,
  deletePublicKey,
  deletePublicKeyHash,
  getCurrentPublicKey,
  getPublicKeyStatus,
  getPublicKeyStatusHash,
} from './publicKeyRegistryTransactionFactory'

export const transactionFactory = {
  credentialRegistry: {
    addSubjectCredential: addSubjectCredential,
    updateSubjectCredential: updateSubjectCredential,
    addIssuerCredential: addIssuerCredential,
    updateIssuerCredential: updateIssuerCredential,
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
    getPublicKeyStatus: getPublicKeyStatus,
    getPublicKeyStatusHash: getPublicKeyStatusHash,
  }
}
