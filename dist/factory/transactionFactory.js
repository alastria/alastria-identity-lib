"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var credentialRegistryTransactionFactory_1 = require("./credentialRegistryTransactionFactory");
var identityManagerTransactionFactory_1 = require("./identityManagerTransactionFactory");
var presentationRegistryTransactionFactory_1 = require("./presentationRegistryTransactionFactory");
var publicKeyRegistryTransactionFactory_1 = require("./publicKeyRegistryTransactionFactory");
exports.transactionFactory = {
    credentialRegistry: {
        'getSubjectCredentialList': credentialRegistryTransactionFactory_1.getSubjectCredentialList,
        'deleteSubjectCredential': credentialRegistryTransactionFactory_1.deleteSubjectCredential,
        'getSubjectCredentialStatus': credentialRegistryTransactionFactory_1.getSubjectCredentialStatus,
        'getIssuerCredentialStatus': credentialRegistryTransactionFactory_1.getIssuerCredentialStatus,
        'getCredentialStatus': credentialRegistryTransactionFactory_1.getCredentialStatus
    },
    identityManager: {
        'updateCredentialStatus': identityManagerTransactionFactory_1.updateCredentialStatus,
        'deletePublicKey': identityManagerTransactionFactory_1.deletePublicKey,
        'revokePublicKey': identityManagerTransactionFactory_1.revokePublicKey,
        'addKey': identityManagerTransactionFactory_1.addKey,
        'updateReceiverPresentation': identityManagerTransactionFactory_1.updateReceiverPresentation,
        'updateSubjectPresentation': identityManagerTransactionFactory_1.updateSubjectPresentation,
        'addSubjectPresentation': identityManagerTransactionFactory_1.addSubjectPresentation,
        'addSubjectCredential': identityManagerTransactionFactory_1.addSubjectCredential,
        'createIdentity': identityManagerTransactionFactory_1.createIdentity,
        'createAlastriaIdentity': identityManagerTransactionFactory_1.createAlastriaIdentity,
        'generateAccessToken': identityManagerTransactionFactory_1.generateAccessToken,
        'addIdentityIssuer': identityManagerTransactionFactory_1.addIdentityIssuer,
        'updateIdentityIssuerEidasLevel': identityManagerTransactionFactory_1.updateIdentityIssuerEidasLevel,
        'deleteIdentityIssuer': identityManagerTransactionFactory_1.deleteIdentityIssuer,
        'getEidasLevel': identityManagerTransactionFactory_1.getEidasLevel,
        'addIdentityServiceProvider': identityManagerTransactionFactory_1.addIdentityServiceProvider,
        'deleteIdentityServiceProvider': identityManagerTransactionFactory_1.deleteIdentityServiceProvider,
        'isIdentityServiceProvider': identityManagerTransactionFactory_1.isIdentityServiceProvider
    },
    presentationRegistry: {
        'getSubjectPresentationStatus': presentationRegistryTransactionFactory_1.getSubjectPresentationStatus,
        'getSubjectPresentationList': presentationRegistryTransactionFactory_1.getSubjectPresentationList,
        'getReceiverPresentationStatus': presentationRegistryTransactionFactory_1.getReceiverPresentationStatus,
        'getPresentationStatus': presentationRegistryTransactionFactory_1.getPresentationStatus
    },
    publicKeyRegistry: {
        'getCurrentPublicKey': publicKeyRegistryTransactionFactory_1.getCurrentPublicKey,
        'getPublicKeyStatus': publicKeyRegistryTransactionFactory_1.getPublicKeyStatus
    }
};
