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
})

describe('validate createPresentationRequest', function () {
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

describe('validate createAlastriaToken', function () {
  const kid =
    'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a#keys-1'
  const jwk = '0x12345'
  const nbf = 1590567640136
  const gwu = 'http://0.0.0.0/rpc'
  const cbu = 'http://0.0.0.0:1234/alastria/did'
  const iss = 'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a'
  const exp = 1590654040136
  const ani = 'redT'
  const jti = 'FooBar/alastriaToken/1590567641603'

  it('should create a valid AlastriaToken with required params', () => {
    const expectedAlastriaToken = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid,
        jwk
      },
      payload: {
        iss: iss,
        gwu: gwu,
        cbu: cbu,
        iat: Math.round(Date.now() / 1000),
        ani: ani,
        exp: exp
      }
    }

    const alastriaToken = tokensFactory.tokens.createAlastriaToken(
      iss,
      gwu,
      cbu,
      ani,
      exp,
      kid,
      jwk
    )

    expect(JSON.stringify(alastriaToken)).equal(
      JSON.stringify(expectedAlastriaToken)
    )
  })

  it('should create a valid AlastriaToken with all params', () => {
    const expectedAlastriaToken = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid,
        jwk
      },
      payload: {
        iss: iss,
        gwu: gwu,
        cbu: cbu,
        iat: Math.round(Date.now() / 1000),
        ani: ani,
        nbf: nbf,
        exp: exp,
        jti: jti
      }
    }

    const alastriaToken = tokensFactory.tokens.createAlastriaToken(
      iss,
      gwu,
      cbu,
      ani,
      exp,
      kid,
      jwk,
      nbf,
      jti
    )

    expect(JSON.stringify(alastriaToken)).equal(
      JSON.stringify(expectedAlastriaToken)
    )
  })
})
