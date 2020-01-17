import {
    addSubjectCredential,
    addIssuerCredential,
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
    isIdentityServiceProvider,
    isIdentityIssuer,
    addEntity,
    setNameEntity,
    setCifEntity,
    setUrlLogo,
    setUrlCreateAID,
    setUrlAOA,
    getEntity,
    entitiesList
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
        "addIssuerCredential": addIssuerCredential,
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
        "isIdentityServiceProvider": isIdentityServiceProvider,
        "isIdentityIssuer": isIdentityIssuer,
        "addEntity":addEntity,
        "setNameEntity":setNameEntity,
        "setCifEntity":setCifEntity,
        "setUrlLogo":setUrlLogo,
        "setUrlCreateAID":setUrlCreateAID,
        "setUrlAOA":setUrlAOA,
        "getEntity":getEntity,
        "entitiesList":entitiesList
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
