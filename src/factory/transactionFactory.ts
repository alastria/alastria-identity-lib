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
    generateAccessToken
 } from "./identityManagerTransactionFactory";

 import {getSubjectPresentationStatus,
    getSubjectPresentationList,
    getReceiverPresentationStatus,
    getPresentationStatus} from "./presenationRegistrytransactionFactory";

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
        'generateAccessToken': generateAccessToken
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