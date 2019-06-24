export declare function getSubjectPresentationStatus(subject: any, subjectPresentationHash: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getSubjectPresentationList(): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getReceiverPresentationStatus(receiver: any, receiverPresentationHash: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
export declare function getPresentationStatus(subjectStatus: any, receiverStatus: any): {
    from: string;
    to: string;
    data: string;
    gas: number;
    nonce: string;
};
