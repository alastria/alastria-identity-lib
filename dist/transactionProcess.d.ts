export declare class UserIdentity {
    endPoint: string;
    address: string;
    private privateKey;
    transactions: object[];
    /**
     *
     * @param _endPoint
     * @param _address
     * @param _privateKey get from keythereum.recover(password, JSON.parse(fs.readFileSync(keyStorePath, 'utf8'))),
     */
    constructor(_endPoint: any, _address: any, _privateKey: any);
    addTransaction(transaction: any, target: any): void;
    signTransactions(): any[];
}
