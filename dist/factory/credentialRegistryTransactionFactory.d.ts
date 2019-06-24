export declare function getSubjectCredentialList(): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function deleteSubjectCredential(): {};
export declare function getSubjectCredentialStatus(subject: any, subjectCredentialHash: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getIssuerCredentialStatus(issuerAddr: any, issuerCredentialHash: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getCredentialStatus(subjectStatus: any, issuerStatus: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
