import 'mocha'
import { expect } from 'chai'
import { tokensFactory } from '../../src/tokenFactory/tokensFactory'

describe('validate creatingDID results', function () {
    it('should return a valid DID', function () {
        const network = 'net';
        const proxyAddress = 'proxy';
        const validDID = tokensFactory.tokens.createDID(network, proxyAddress);
        expect(validDID).equal('did:ala:net:redT:proxy');
    });

    it('should return a valid DID when customizing networkID', function() {
        const network = 'net';
        const proxyAddress = 'proxy';
        const networkID = 'netID';
        const validDID = tokensFactory.tokens.createDIDWithCustomNetworkID(network, proxyAddress, networkID);
        expect(validDID).equal('did:ala:net:netID:proxy');
    });
});