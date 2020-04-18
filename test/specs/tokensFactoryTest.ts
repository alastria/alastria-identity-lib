import 'mocha'
import { expect } from 'chai'
import { tokensFactory } from '../../src/tokenFactory/tokensFactory'

describe('validate creatingDID results', function () {
    it('should return a valid DID', function () {
        const network = 'net';
        const proxyAddress = 'proxy'
        const validDID = tokensFactory.tokens.createDID(network, proxyAddress);
        expect(validDID).equal('did:ala:net:redT:proxy');
    });
});