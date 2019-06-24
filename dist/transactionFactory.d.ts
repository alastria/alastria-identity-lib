export declare function createPublicKeyDidDocument(): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function createClaim(registryAddress: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function revokeClaim(registryAddress: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function addSubjectPresentation(registryAddress: any, presentationHash: any, uri: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getSubjectCredentialList(): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getSubjectCredentialStatus(subject: any, subjectCredentialHash: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
