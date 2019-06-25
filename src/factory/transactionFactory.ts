import {getSubjectCredentialList,
    deleteSubjectCredential,
    getSubjectCredentialStatus,
    getIssuerCredentialStatus,
    getCredentialStatus} from "./credentialRegistryTransactionFactory";

 import {updateCredentialStatus,
    deletePublicKey,
    revokePublicKey,
    addKey,
    updateReceiverPresentation,
    updateSubjectPresentation,
    addSubjectPresentation,
    addSubjectCredential,
    createIdentity,
    createAlastriaIdentity,
    generateAccessToken,
    addIdentityIssuer,
    updateIdentityIssuerEidasLevel,
    deleteIdentityIssuer,
    getEidasLevel,
    addIdentityServiceProvider,
    deleteIdentityServiceProvider,
    isIdentityServiceProvider
 } from "./identityManagerTransactionFactory";

 import {getSubjectPresentationStatus,
    getSubjectPresentationList,
    getReceiverPresentationStatus,
    getPresentationStatus} from "./presentationRegistryTransactionFactory";

 import {getCurrentPublicKey,
    getPublicKeyStatus} from "./publicKeyRegistryTransactionFactory";

 export const transactionFactory = {
    credentialRegistry: {
        'getSubjectCredentialList': getSubjectCredentialList,
        'deleteSubjectCredential': deleteSubjectCredential,
        'getSubjectCredentialStatus': getSubjectCredentialStatus,
        'getIssuerCredentialStatus': getIssuerCredentialStatus,
        'getCredentialStatus': getCredentialStatus
    },
    identityManager: {
        'updateCredentialStatus': updateCredentialStatus,
        'deletePublicKey': deletePublicKey,
        'revokePublicKey': revokePublicKey,
        'addKey': addKey,
        'updateReceiverPresentation': updateReceiverPresentation,
        'updateSubjectPresentation': updateSubjectPresentation,
        'addSubjectPresentation': addSubjectPresentation,
        'addSubjectCredential': addSubjectCredential,
        'createIdentity': createIdentity,
        'createAlastriaIdentity': createAlastriaIdentity,
        'generateAccessToken': generateAccessToken,
        'addIdentityIssuer': addIdentityIssuer,
        'updateIdentityIssuerEidasLevel': updateIdentityIssuerEidasLevel,
        'deleteIdentityIssuer': deleteIdentityIssuer,
        'getEidasLevel': getEidasLevel,
        'addIdentityServiceProvider': addIdentityServiceProvider,
        'deleteIdentityServiceProvider': deleteIdentityServiceProvider,
        'isIdentityServiceProvider': isIdentityServiceProvider
    },
    presentationRegistry: {
        'getSubjectPresentationStatus': getSubjectPresentationStatus,
        'getSubjectPresentationList': getSubjectPresentationList,
        'getReceiverPresentationStatus': getReceiverPresentationStatus,
        'getPresentationStatus': getPresentationStatus
    },
    publicKeyRegistry: {
        'getCurrentPublicKey': getCurrentPublicKey,
        'getPublicKeyStatus': getPublicKeyStatus
    }
 };
