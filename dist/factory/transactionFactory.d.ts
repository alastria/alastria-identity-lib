import { getSubjectCredentialList, deleteSubjectCredential, getSubjectCredentialStatus, getIssuerCredentialStatus, getCredentialStatus } from "./credentialRegistryTransactionFactory";
import { updateCredentialStatus, deletePublicKey, revokePublicKey, addKey, updateReceiverPresentation, updateSubjectPresentation, addSubjectPresentation, addSubjectCredential, createIdentity, createAlastriaIdentity, generateAccessToken, addIdentityIssuer, updateIdentityIssuerEidasLevel, deleteIdentityIssuer, getEidasLevel, addIdentityServiceProvider, deleteIdentityServiceProvider, isIdentityServiceProvider } from "./identityManagerTransactionFactory";
import { getSubjectPresentationStatus, getSubjectPresentationList, getReceiverPresentationStatus, getPresentationStatus } from "./presentationRegistryTransactionFactory";
import { getCurrentPublicKey, getPublicKeyStatus } from "./publicKeyRegistryTransactionFactory";
export declare const transactionFactory: {
    credentialRegistry: {
        'getSubjectCredentialList': typeof getSubjectCredentialList;
        'deleteSubjectCredential': typeof deleteSubjectCredential;
        'getSubjectCredentialStatus': typeof getSubjectCredentialStatus;
        'getIssuerCredentialStatus': typeof getIssuerCredentialStatus;
        'getCredentialStatus': typeof getCredentialStatus;
    };
    identityManager: {
        'updateCredentialStatus': typeof updateCredentialStatus;
        'deletePublicKey': typeof deletePublicKey;
        'revokePublicKey': typeof revokePublicKey;
        'addKey': typeof addKey;
        'updateReceiverPresentation': typeof updateReceiverPresentation;
        'updateSubjectPresentation': typeof updateSubjectPresentation;
        'addSubjectPresentation': typeof addSubjectPresentation;
        'addSubjectCredential': typeof addSubjectCredential;
        'createIdentity': typeof createIdentity;
        'createAlastriaIdentity': typeof createAlastriaIdentity;
        'generateAccessToken': typeof generateAccessToken;
        'addIdentityIssuer': typeof addIdentityIssuer;
        'updateIdentityIssuerEidasLevel': typeof updateIdentityIssuerEidasLevel;
        'deleteIdentityIssuer': typeof deleteIdentityIssuer;
        'getEidasLevel': typeof getEidasLevel;
        'addIdentityServiceProvider': typeof addIdentityServiceProvider;
        'deleteIdentityServiceProvider': typeof deleteIdentityServiceProvider;
        'isIdentityServiceProvider': typeof isIdentityServiceProvider;
    };
    presentationRegistry: {
        'getSubjectPresentationStatus': typeof getSubjectPresentationStatus;
        'getSubjectPresentationList': typeof getSubjectPresentationList;
        'getReceiverPresentationStatus': typeof getReceiverPresentationStatus;
        'getPresentationStatus': typeof getPresentationStatus;
    };
    publicKeyRegistry: {
        'getCurrentPublicKey': typeof getCurrentPublicKey;
        'getPublicKeyStatus': typeof getPublicKeyStatus;
    };
};
