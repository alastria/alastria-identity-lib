import {
    addSubjectCredential,
    deleteSubjectCredential,
    getSubjectCredentialStatus,
    getSubjectCredentialList,
    updateCredentialStatus,
    getIssuerCredentialStatus,
    getCredentialStatus,

} from "./credentialRegistryTransactionFactory";

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
    isIdentityServiceProvider
} from "./identityManagerTransactionFactory";

import {
    addSubjectPresentation,
    updateSubjectPresentation,
    getSubjectPresentationStatus,
    getSubjectPresentationList,
    updateReceiverPresentation,
    getReceiverPresentationStatus,
    getPresentationStatus,
} from "./presentationRegistryTransactionFactory";

import {
    addKey,
    revokePublicKey,
    deletePublicKey,
    getCurrentPublicKey,
    getPublicKeyStatus,
} from "./publicKeyRegistryTransactionFactory";

export const transactionFactory = {
    credentialRegistry: {
        "addSubjectCredential": addSubjectCredential,
        "deleteSubjectCredential": deleteSubjectCredential,
        "getSubjectCredentialStatus": getSubjectCredentialStatus,
        "getSubjectCredentialList": getSubjectCredentialList,
        "updateCredentialStatus": updateCredentialStatus,
        "getIssuerCredentialStatus": getIssuerCredentialStatus,
        "getCredentialStatus": getCredentialStatus
    },
    identityManager: {
        "delegateCall": delegateCall,
        "prepareAlastriaID": prepareAlastriaID,
        "createAlastriaIdentity": createAlastriaIdentity,
        "addIdentityIssuer": addIdentityIssuer,
        "updateIdentityIssuerEidasLevel": updateIdentityIssuerEidasLevel,
        "deleteIdentityIssuer": deleteIdentityIssuer,
        "getEidasLevel": getEidasLevel,
        "addIdentityServiceProvider": addIdentityServiceProvider,
        "deleteIdentityServiceProvider": deleteIdentityServiceProvider,
        "isIdentityServiceProvider": isIdentityServiceProvider
    },
    presentationRegistry: {
        "addSubjectPresentation": addSubjectPresentation,
        "updateSubjectPresentation": updateSubjectPresentation,
        "getSubjectPresentationStatus": getSubjectPresentationStatus,
        "getSubjectPresentationList": getSubjectPresentationList,
        "updateReceiverPresentation": updateReceiverPresentation,
        "getReceiverPresentationStatus": getReceiverPresentationStatus,
        "getPresentationStatus": getPresentationStatus,
    },
    publicKeyRegistry: {
        "addKey": addKey,
        "revokePublicKey": revokePublicKey,
        "deletePublicKey": deletePublicKey,
        "getCurrentPublicKey": getCurrentPublicKey,
        "getPublicKeyStatus": getPublicKeyStatus,
    }
};
