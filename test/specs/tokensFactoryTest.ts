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
        jwk,
        kid
      },
      payload: {
        '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(
          context
        ),
        type: ['AlastriaSession'].concat(type),
        iss,
        iat: Math.round(Date.now() / 1000),
        exp,
        nbf,
        alastriaToken,
        jti
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
        kid
      },
      payload: {
        '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(
          context
        ),
        type: ['AlastriaSession'].concat(type),
        iss,
        iat: Math.round(Date.now() / 1000),
        exp,
        alastriaToken
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
  const kid = 'did:ala:quor:redt:QmeeasCZ9jLbX...ueBJ7d7csxhb#keys-1'
  const jwk = '0x12345'
  const jti = 'empresa/alastria/presentationrequest/7864'
  const iss = 'did:alastria:quorum:testnet1:QmeeasCZ9jLbX...ueBJ7d7csxhb'
  const context = ['CustomContext1', 'CustomContext2']
  const procUrl = 'url'
  const procHash = 'url'
  const data = [
    {
      '@context': 'https://alastria.github.io/identity/covid/v1',
      levelOfAssurance: 3,
      required: true,
      field_name: 'covid_test'
    },
    {
      '@context': 'https://alastria.github.io/identity/examples/v1',
      levelOfAssurance: 2,
      required: true,
      field_name: 'phone_number'
    }
  ]
  const exp = 1530735444
  const nbf = 1525465044
  const cbu = 'https://www.empresa.com/alastria/presentation?jtipr=7864'
  const type = ['CustomType1', 'CustomType2']

  it('should create a valid presentationRequest with required params', () => {
    const expectedPresentationRequest = {
      header: {
        alg: 'ES256K',
        typ: 'JWT'
      },
      payload: {
        iss,
        iat: Math.round(Date.now() / 1000),
        cbu,
        pr: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://alastria.github.io/identity/credentials/v1'
          ].concat(context),
          type: [
            'VerifiablePresentationRequest',
            'AlastriaVerifiablePresentationRequest'
          ].concat(type),
          procHash,
          procUrl,
          data
        }
      }
    }

    const presentationRequest = tokensFactory.tokens.createPresentationRequest(
      iss,
      context,
      procUrl,
      procHash,
      data,
      cbu,
      type
    )

    expect(JSON.stringify(presentationRequest)).equal(
      JSON.stringify(expectedPresentationRequest)
    )
  })

  it('should create a valid presentationRequest with all params', () => {
    const expectedPresentationRequest = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid,
        jwk
      },
      payload: {
        jti,
        iss,
        iat: Math.round(Date.now() / 1000),
        exp,
        nbf,
        cbu,
        pr: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://alastria.github.io/identity/credentials/v1'
          ].concat(context),
          type: [
            'VerifiablePresentationRequest',
            'AlastriaVerifiablePresentationRequest'
          ].concat(type),
          procHash,
          procUrl,
          data
        }
      }
    }

    const presentationRequest = tokensFactory.tokens.createPresentationRequest(
      iss,
      context,
      procUrl,
      procHash,
      data,
      cbu,
      type,
      kid,
      jwk,
      exp,
      nbf,
      jti
    )

    expect(JSON.stringify(presentationRequest)).equal(
      JSON.stringify(expectedPresentationRequest)
    )
  })
})

describe('validate createPresentation', function () {
  const kid = 'kiss'
  const jwk = '0x12345'
  const jti = 'https://www.empresa.com/alastria/credentials/3732'
  const iss = 'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a'
  const aud = 'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a'
  const exp = 1530735444
  const nbf = 1525465044
  const context = ['CustomContext1', 'CustomContext2']
  const type = ['CustomType1', 'CustomType2']
  const procHash = 'H398sjHdkldjUYn475n'
  const procUrl = 'https://www.empresa.com/alastria/businessprocess/4583'
  const verifiableCredential = ['eyJ0eXAi', 'eyJ0eXAi']

  it('should create a valid presentationRequest with required params', () => {
    const expectedPresentation = {
      header: {
        alg: 'ES256K',
        typ: 'JWT'
      },
      payload: {
        iss,
        aud,
        iat: Math.round(Date.now() / 1000),
        vp: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://alastria.github.io/identity/credentials/v1'
          ].concat(context),
          type: [
            'VerifiablePresentation',
            'AlastriaVerifiablePresentation'
          ].concat(type),
          procHash,
          procUrl,
          verifiableCredential
        }
      }
    }

    const presentation = tokensFactory.tokens.createPresentation(
      iss,
      aud,
      context,
      verifiableCredential,
      procUrl,
      procHash,
      type
    )

    expect(JSON.stringify(presentation)).equal(
      JSON.stringify(expectedPresentation)
    )
  })

  it('should create a valid presentationRequest with all params', () => {
    const expectedPresentation = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid,
        jwk
      },
      payload: {
        jti,
        iss,
        aud,
        iat: Math.round(Date.now() / 1000),
        exp,
        nbf,
        vp: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://alastria.github.io/identity/credentials/v1'
          ].concat(context),
          type: [
            'VerifiablePresentation',
            'AlastriaVerifiablePresentation'
          ].concat(type),
          procHash,
          procUrl,
          verifiableCredential
        }
      }
    }

    const presentation = tokensFactory.tokens.createPresentation(
      iss,
      aud,
      context,
      verifiableCredential,
      procUrl,
      procHash,
      type,
      kid,
      jwk,
      exp,
      nbf,
      jti
    )

    expect(JSON.stringify(presentation)).equal(
      JSON.stringify(expectedPresentation)
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
        iss,
        gwu,
        cbu,
        iat: Math.round(Date.now() / 1000),
        ani,
        exp
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
        iss,
        gwu,
        cbu,
        iat: Math.round(Date.now() / 1000),
        ani,
        nbf,
        exp,
        jti
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

  describe('validate createCredential', function () {
    const kid =
      'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a#keys-1'
    const iss = 'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a'
    const credentialSubject = { levelOfAssurance: 1 }
    const exp = 1000
    const nbf = 1000
    const jti = 'http://example.edu/credentials/3732'
    const jwk = '0xlkdjeo2n2__23oisd'
    const sub = 'did:ala:quor:redT:00f471c75c14c9ee9b16e4d64f8acb47a7bf2c4a'

    it('should create a valid credential with required params', () => {
      const expectedCredencial = {
        header: {
          typ: 'JWT',
          alg: 'ES256K'
        },
        payload: {
          iss,
          iat: Math.round(Date.now() / 1000),
          vc: {
            '@context': [
              'https://www.w3.org/2018/credentials/v1',
              'https://alastria.github.io/identity/credentials/v1'
            ],
            type: ['VerifiableCredential', 'AlastriaVerifiableCredential'],
            credentialSubject: {
              levelOfAssurance: 1
            }
          }
        }
      }

      const credential = tokensFactory.tokens.createCredential(
        iss,
        [],
        credentialSubject
      )

      expect(JSON.stringify(credential)).equal(
        JSON.stringify(expectedCredencial)
      )
    })

    it('should create a valid credential with all params', () => {
      const expectedCredencial = {
        header: {
          typ: 'JWT',
          alg: 'ES256K',
          kid,
          jwk
        },
        payload: {
          jti,
          iss,
          sub,
          iat: Math.round(Date.now() / 1000),
          exp,
          nbf,
          vc: {
            '@context': [
              'https://www.w3.org/2018/credentials/v1',
              'https://alastria.github.io/identity/credentials/v1',
              'https://example.org/example'
            ],
            type: [
              'VerifiableCredential',
              'AlastriaVerifiableCredential',
              'Test'
            ],
            credentialSubject: {
              levelOfAssurance: 1
            }
          }
        }
      }

      const credential = tokensFactory.tokens.createCredential(
        iss,
        ['https://example.org/example'],
        credentialSubject,
        kid,
        sub,
        exp,
        nbf,
        jti,
        jwk,
        ['Test']
      )

      expect(JSON.stringify(credential)).equal(
        JSON.stringify(expectedCredencial)
      )
    })

    it('should create a valid credential when context and type are nulls or not present', () => {
      const expectedCredencial = {
        header: {
          typ: 'JWT',
          alg: 'ES256K',
          kid,
          jwk
        },
        payload: {
          jti,
          iss,
          sub,
          iat: Math.round(Date.now() / 1000),
          exp,
          nbf,
          vc: {
            '@context': [
              'https://www.w3.org/2018/credentials/v1',
              'https://alastria.github.io/identity/credentials/v1'
            ],
            type: ['VerifiableCredential', 'AlastriaVerifiableCredential'],
            credentialSubject: {
              levelOfAssurance: 1
            }
          }
        }
      }

      const credential = tokensFactory.tokens.createCredential(
        iss,
        null,
        credentialSubject,
        kid,
        sub,
        exp,
        nbf,
        jti,
        jwk
      )

      expect(JSON.stringify(credential)).equal(
        JSON.stringify(expectedCredencial)
      )
    })
  })
})

describe('validate createAIC', function () {
  const kid = 'kiss'
  const context = ['https://w3id.org/did/v1', 'JWT']
  const type = ['type1', 'type2']
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
        '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(
          context
        ),
        type: ['AlastriaIdentityCreation'].concat(type),
        createAlastriaTX: createAlastriaTX,
        alastriaToken: alastriaToken,
        publicKey: publicKey,
        jti: jti,
        iat: iat,
        exp: exp,
        nbf: nbf
      }
    }

    const aic = tokensFactory.tokens.createAIC(
      context,
      type,
      createAlastriaTX,
      alastriaToken,
      publicKey,
      kid,
      jwk,
      jti,
      iat,
      exp,
      nbf
    )

    expect(JSON.stringify(aic)).equal(JSON.stringify(expectedAIC))
  })

  it('should return a valid AlastriaIdentityCreation with only the mandatory fields', function () {
    const expectedAIC = {
      header: {
        alg: 'ES256K',
        typ: 'JWT'
      },
      payload: {
        '@context': ['https://alastria.github.io/identity/artifacts/v1'].concat(
          context
        ),
        type: ['AlastriaIdentityCreation'].concat(type),
        createAlastriaTX: createAlastriaTX,
        alastriaToken: alastriaToken,
        publicKey: publicKey
      }
    }

    const aic = tokensFactory.tokens.createAIC(
      context,
      type,
      createAlastriaTX,
      alastriaToken,
      publicKey
    )

    expect(JSON.stringify(aic)).equal(JSON.stringify(expectedAIC))
  })
})
