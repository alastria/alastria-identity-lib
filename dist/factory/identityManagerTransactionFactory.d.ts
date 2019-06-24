export declare function generateAccessToken(signAddress: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function createAlastriaIdentity(publicKeyData: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function createIdentity(publicKey: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function addSubjectCredential(presentationHash: any, uri: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function addSubjectPresentation(subjectPresentationHash: any, uri: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function updateSubjectPresentation(subjectPresentationHash: any, status: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function updateReceiverPresentation(receiverPresentationHash: any, status: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function addKey(publicKey: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function revokePublicKey(publicKey: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function deletePublicKey(publicKey: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function updateCredentialStatus(issuerCredHash: any, status: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function addIdentityIssuer(identityIssuer: any, level: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function updateIdentityIssuerEidasLevel(identityIssuer: any, level: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function deleteIdentityIssuer(identityIssuer: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getEidasLevel(identityIssuer: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
