import 'mocha'
import { expect } from 'chai'
import { tokensFactory } from '../../src/tokenFactory/tokensFactory'

describe('validate creatingDID results with custom networkID', function () {
    it('should return a valid DID with redT as a networkId', function () {
      const network = 'net'
      const proxyAddress = 'QmeeasCZ9jLbX...ueBJ7d7csxhb'
      const networkID = 'redT'
  
      const validDID = tokensFactory.tokens.createDID(
        network,
        proxyAddress,
        networkID
      )
  
      expect(validDID).equal('did:ala:net:redT:QmeeasCZ9jLbX...ueBJ7d7csxhb')
    })
  
    it('should return a valid DID with redB as a networkId', function () {
      const network = 'net'
      const proxyAddress = 'QmeeasCZ9jLbX...ueBJ7d7csxhb'
      const networkID = 'redB'
  
      const validDID = tokensFactory.tokens.createDID(
        network,
        proxyAddress,
        networkID
      )
  
      expect(validDID).equal('did:ala:net:redB:QmeeasCZ9jLbX...ueBJ7d7csxhb')
    })
});

describe('validate createAlastriaSession', function () {
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
    const jwk = '0x12345'
    const exp = 12345
    const nbf = 12345
    const jti = 'jwi'
    
    it('should return a valid AlastriaSession with all the fields', function () {
      const expectedAlastriaSession = {
        header: {
          alg: 'ES256K',
          typ: 'JWT',
          jwk: jwk,
          kid: kid
        },
        payload: {
          '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(context),
          type:['AlastriaSession'].concat(type),
          iss: iss,
          iat: Math.round(Date.now()/1000),
          exp: exp,
          nbf: nbf,
          alastriaToken: alastriaToken,
          jti: jti
        }
      }

      const alastriaSession = tokensFactory.tokens.createAlastriaSession(
        context, 
        iss, 
        kid, 
        type,
        alastriaToken, 
        exp, 
        jwk, 
        nbf, 
        jti
      )

      expect(JSON.stringify(alastriaSession)).equal(
        JSON.stringify(expectedAlastriaSession)
      )
    });

    it('should return a valid AlastriaSession with only the mandatory fields', function () {
      const expectedAlastriaSession = {
        header: {
          alg: 'ES256K',
          typ: 'JWT',
          kid: kid
        },
        payload: {
          '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(context),
          type:['AlastriaSession'].concat(type),
          iss: iss,
          iat: Math.round(Date.now()/1000),
          exp: exp,
          alastriaToken: alastriaToken,
        }
      }

      const alastriaSession = tokensFactory.tokens.createAlastriaSession(
        context, 
        iss, 
        kid, 
        type,
        alastriaToken, 
        exp
      )

      expect(JSON.stringify(alastriaSession)).equal(
        JSON.stringify(expectedAlastriaSession)
      )
    });
});