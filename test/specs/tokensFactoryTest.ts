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
})

describe('validate createAlastriaSession', function () {
  const kid = 'kiss'
  const iss = 'iss'
  const context = ['https://w3id.org/did/v1', 'JWT']
  const type = ['type1', 'type2']
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
        '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(
          context
        ),
        type: ['AlastriaSession'].concat(type),
        iss: iss,
        iat: Math.round(Date.now() / 1000),
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
  })

  it('should return a valid AlastriaSession with only the mandatory fields', function () {
    const expectedAlastriaSession = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid: kid
      },
      payload: {
        '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(
          context
        ),
        type: ['AlastriaSession'].concat(type),
        iss: iss,
        iat: Math.round(Date.now() / 1000),
        exp: exp,
        alastriaToken: alastriaToken
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
  })

  it('should create a valid presentationRequest', () => {
    const kid = 'kiss'
    const iss = 'iss'
    const context = ['CustomContext1', 'CustomContext2']
    const procUrl = 'url'
    const procHash = 'url'
    const data = 'data'
    const jwk = '0x12345'
    const exp = 0
    const nbf = 0
    const jti = 'jwi'
    const cbu = 'url'
    const type = ['CustomType1', 'CustomType2']
    const expectedPresentationRequest = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid: kid,
        jwk
      },
      payload: {
        jti: jti,
        iss: iss,
        iat: Math.round(Date.now() / 1000),
        exp: exp,
        nbf: nbf,
        cbu: cbu,
        pr: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://alastria.github.io/identity/credentials/v1'
          ].concat(context),
          type: [
            'VerifiablePresentationRequest',
            'AlastriaVerifiablePresentationRequest'
          ].concat(type),
          procUrl: procUrl,
          procHash: procHash,
          data: data
        }
      }
    }

    const presentationRequest = tokensFactory.tokens.createPresentationRequest(
      kid,
      iss,
      context,
      procUrl,
      procHash,
      data,
      cbu,
      jwk,
      type,
      exp,
      nbf,
      jti
    )

    expect(JSON.stringify(presentationRequest)).equal(
      JSON.stringify(expectedPresentationRequest)
    )
  })
})

describe('validate createAIC', function () {
  const kid = 'kiss'
  const context = ["https://w3id.org/did/v1","JWT"]
  const type = ["type1","type2"]
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
})
