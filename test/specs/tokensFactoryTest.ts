import 'mocha'
import { expect } from 'chai'
import { tokensFactory } from '../../src/tokenFactory/tokensFactory'

describe('validate creatingDID results with custom networkID', function () {
    it('should return a valid DID with redT as a networkId', function () {
        const network = 'net';
        const proxyAddress = 'QmeeasCZ9jLbX...ueBJ7d7csxhb';
        const networkID = 'redT'
        const validDID = tokensFactory.tokens.createDID(network, proxyAddress, networkID);
        expect(validDID).equal('did:ala:net:redT:QmeeasCZ9jLbX...ueBJ7d7csxhb');
    });

    it('should return a valid DID with redB as a networkId', function () {
        const network = 'net';
        const proxyAddress = 'QmeeasCZ9jLbX...ueBJ7d7csxhb';
        const networkID = 'redB'
        const validDID = tokensFactory.tokens.createDID(network, proxyAddress, networkID);
        expect(validDID).equal('did:ala:net:redB:QmeeasCZ9jLbX...ueBJ7d7csxhb');
    });
});