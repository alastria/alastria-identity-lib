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

describe('validate createAIC', function () {
    const kid = 'kiss'
    const iss = 'iss'
    const context = [
      "https://w3id.org/did/v1",
      "JWT"
    ]
    const type = [
      "type1",
      "type2"
    ]
    const alastriaToken = 'data'
    const publicKey = '0xA1B2C3'
    const jwk = '0x12345'
    const createAlastriaTX = '0xABCDEF'
    const exp = 12345
    const nbf = 12345
    const iat = 12345
    const jti = 'jwi'
    
    it('should return a valid AlastriaIdentityCreation with all the fields', function () {
        const expectedAIC = {
            header: {
                alg: 'ES256K',
                typ: 'JWT',
                kid: kid,
                jwk: jwk
            },
            payload: {
                '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(context),
                type: ['AlastriaIdentityCreation'].concat(type),
                createAlastriaTX:createAlastriaTX,
                alastriaToken:alastriaToken,
                publicKey:publicKey,
                jti: jti,
                iat: iat,
                exp: exp,
                nbf: nbf
            }
        }

        const aic = tokensFactory.tokens.createAIC(
            kid,
            context, 
            type, 
            createAlastriaTX, 
            alastriaToken, 
            publicKey, 
            jwk,
            jti, 
            iat, 
            exp, 
            nbf
        )

        expect(JSON.stringify(aic)).equal(
            JSON.stringify(expectedAIC)
        )
    });

    it('should return a valid AlastriaIdentityCreation with only the mandatory fields', function () {
        const expectedAIC = {
            header: {
                alg: 'ES256K',
                typ: 'JWT',
                kid: kid
            },
            payload: {
                '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(context),
                type: ['AlastriaIdentityCreation'].concat(type),
                createAlastriaTX:createAlastriaTX,
                alastriaToken:alastriaToken,
                publicKey:publicKey
            }
        }

        const aic = tokensFactory.tokens.createAIC(
            kid,
            context, 
            type, 
            createAlastriaTX, 
            alastriaToken, 
            publicKey
        )
    
        expect(JSON.stringify(aic)).equal(
            JSON.stringify(expectedAIC)
        )
    });
});