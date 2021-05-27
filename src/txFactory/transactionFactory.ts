import {
  addSubjectCredential,
  addIssuerCredential,
  deleteSubjectCredential,
  getSubjectCredentialStatus,
  getSubjectCredentialList,
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
  getSubjectPresentationList,
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
  isPublicKeyValidForDate
} from './publicKeyRegistryTransactionFactory'

export const transactionFactory = {
  credentialRegistry: {
    addSubjectCredential: addSubjectCredential,
    addIssuerCredential: addIssuerCredential,
    deleteSubjectCredential: deleteSubjectCredential,
    getSubjectCredentialStatus: getSubjectCredentialStatus,
    getSubjectCredentialList: getSubjectCredentialList,
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
    getSubjectPresentationList: getSubjectPresentationList,
    updateReceiverPresentation: updateReceiverPresentation,
    getReceiverPresentationStatus: getReceiverPresentationStatus,
    getPresentationStatus: getPresentationStatus
  },
  publicKeyRegistry: {
    addKey: addKey,
    revokePublicKey: revokePublicKey,
    deletePublicKey: deletePublicKey,
    getCurrentPublicKey: getCurrentPublicKey,
    getPublicKeyStatus: getPublicKeyStatus,
    getPublicKeyStatusDecodedAsJSON: getPublicKeyStatusDecodedAsJSON,
    isPublicKeyValidForDate: isPublicKeyValidForDate
  }
}
