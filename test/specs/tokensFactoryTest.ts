import 'mocha'
import { expect } from 'chai'
import { tokensFactory } from '../../src/tokenFactory/tokensFactory'

describe('validate creatingDID results with custom networkID', function () {
    it('should return a valid DID with redT as a networkId', function () {
        const network = 'net';
        const proxyAddress = 'proxy';
        const networkID = 'redT'
        const validDID = tokensFactory.tokens.createDID(network, proxyAddress, networkID);
        expect(validDID).equal('did:ala:net:redT:proxy');
    });

    it('should return a valid DID with redB as a networkId', function () {
        const network = 'net';
        const proxyAddress = 'proxy';
        const networkID = 'redB'
        const validDID = tokensFactory.tokens.createDID(network, proxyAddress, networkID);
        expect(validDID).equal('did:ala:net:redB:proxy');
    });
});