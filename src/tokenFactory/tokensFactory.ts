import { decodeToken, TokenSigner, TokenVerifier } from 'jsontokens'
import { SignedToken } from 'jsontokens/lib/signer'
import { JwtToken } from '../interfaces'
import { AddressUtils } from '../utils/AddressUtils'

export const tokensFactory = {
  tokens: {
    decodeJWT: decodeJWT,
    signJWT: signJWT,
    verifyJWT: verifyJWT,
    createAlastriaSession: createAlastriaSession,
    createAlastriaToken: createAlastriaToken,
    createCredential: createCredential,
    createPresentation: createPresentation,
    createPresentationRequest: createPresentationRequest,
    PSMHash: PSMHash,
    createAIC: createAIC,
    createDID: createDID
  }
}

function createDID(network: string, proxyAddress: string, networkID: string) {
  // network -> "quor" / "fabr"
  // networkID -> redT,...
  const proxyAddressParsed = AddressUtils.getAddressWithoutHexPrefix(proxyAddress)
  return `did:ala:${network}:${networkID}:${proxyAddressParsed}`
}

// Used by Service Provider or Subject Wallet
export function decodeJWT(jwt: string) {
  let tokenData = null
  if (jwt) {
    tokenData = decodeToken(jwt)
  }
  return tokenData
}

function signJWT(jwt: JwtToken, rawPrivateKey: string) {
  if (jwt.header && jwt.payload) {
    return new TokenSigner('ES256K', rawPrivateKey).sign(
      jwt.payload,
      false,
      jwt.header
    )
  } else {
    return new TokenSigner('ES256K', rawPrivateKey).sign(JSON.stringify(jwt))
  }
}

function verifyJWT(jwt: string | SignedToken, rawPublicKey: string) {
  return new TokenVerifier('ES256K', rawPublicKey).verify(jwt)
}

/** Creates an Alastria Session
 * @param context aditional urls to "https://alastria.github.io/identity/artifacts/v1"
 * @param iss DID representing the AlastriaID of the entity that issued the Alastria Session
 * @param pku Users public key
 * @param alastriaToken Verified Alastria Token
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param type aditional types to "AlastriaSession"
 * @param exp expiration time
 * @param nbf not before
 * @param jti Unique token identifier
 */
function createAlastriaSession(
  context: string[],
  iss: string,
  kid: string,
  type: string[],
  alastriaToken: string,
  exp: number,
  pku?: string,
  nbf?: number,
  jti?: string
) {
  const requiredContext: string[] = [
    'https://alastria.github.io/identity/artifacts/v1'
  ]
  const requiredTypes: string[] = ['AlastriaSession']

  const jwt = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      jwk: pku,
      kid: kid
    },
    payload: {
      '@context': requiredContext.concat(context),
      type: requiredTypes.concat(type),
      iss: iss,
      iat: Math.round(Date.now() / 1000),
      exp: exp,
      nbf: nbf,
      alastriaToken: alastriaToken,
      jti: jti
    }
  }
  return jwt
}

/** Creates the AlastriaToken
 * @param iss DID representing the AlastriaID of the entity that issued the Alastria Token
 * @param gwu Provider gateway url
 * @param cbu Callbacku url from the user
 * @param ani Alastria Network ID
 * @param exp expiration time
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param jwk Users public key
 * @param nbf not before
 * @param jti Unique token identifier
 */
function createAlastriaToken(
  iss: string,
  gwu: string,
  cbu: string,
  ani: string,
  exp: number,
  kid: string,
  jwk?: string,
  nbf?: number,
  jti?: string
) {
  const jwt = {
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
  return jwt
}

/** Creates an unsigned credential
 * @param iss DID representing the AlastriaID of the entity that issued the credential
 * @param context aditional urls to "https://www.w3.org/2018/credentials/v1" and "https://alastria.github.io/identity/credentials/v1"
 * @param credentialSubject JSON array of credentials
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param sub DID representing the AlastriaID of the subject to which the credential refers to
 * @param exp expiration time on or after which the JWT (credential) MUST NOT be accepted for processing
 * @param nbf identifies the time before which the JWT (credential) MUST NOT be accepted for processing
 * @param jti This is the identification of this specific credential (it is NOT the identifier of the holder or of any other actor)
 * @param jwk optional field with the public key used to sign the JWT Header
 */
export function createCredential(
  iss: string,
  context: string[],
  credentialSubject: object,
  kid?: string,
  sub?: string,
  exp?: number,
  nbf?: number,
  jti?: string,
  jwk?: string,
  type?: string[]
) {
  const requiredContext: string[] = [
    'https://www.w3.org/2018/credentials/v1',
    'https://alastria.github.io/identity/credentials/v1'
  ]
  const requiredTypes: string[] = [
    'VerifiableCredential',
    'AlastriaVerifiableCredential'
  ]

  context = context ? requiredContext.concat(context) : requiredContext
  type = type ? requiredTypes.concat(type) : requiredTypes

  const jwt = {
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
        '@context': context,
        type,
        credentialSubject
      }
    }
  }
  return jwt
}

/** Creates an unsigned presentation
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param iss DID representing the Alastria.ID of the entity that issued the presentation (normally the citizen)
 * @param aud identifies the recipient that the JWT is intended for
 * @param context
 * @param verifiableCredential An array of verifiable credentials in JWT format, that is, signed JWTs where each verifiable credential is base64url encoded
 * @param procUrl The URL of an external document describing the intended purpose of the data that the service provider is receiving
 * @param procHash The hash of an external document describing the intended purpose of the data that the service provider is receiving
 * @param type aditional types to "VerifiablePresentation" and "AlastriaVerifiablePresentation"
 * @param jwk Public key
 * @param exp identifies the expiration time on or after which the JWT (presentation) MUST NOT be accepted for processing
 * @param nbf identifies the time before which the JWT (presentation) MUST NOT be accepted for processing
 * @param jti This is the identification of this specific presentation instance (it is NOT the identifier of the holder or of any other actor)
 */
function createPresentation(
  iss: string,
  aud: string,
  context: string[],
  verifiableCredential: string[],
  procUrl: string,
  procHash: string,
  type: string[],
  kid?: string,
  jwk?: string,
  exp?: number,
  nbf?: number,
  jti?: string
) {
  const requiredContext: string[] = [
    'https://www.w3.org/2018/credentials/v1',
    'https://alastria.github.io/identity/credentials/v1'
  ]
  const requiredTypes: string[] = [
    'VerifiablePresentation',
    'AlastriaVerifiablePresentation'
  ]

  const jwt = {
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
        '@context': requiredContext.concat(context),
        type: requiredTypes.concat(type),
        procHash,
        procUrl,
        verifiableCredential
      }
    }
  }
  return jwt
}

/** Creates a presentation request
 * @param iss DID representing the Alastria.ID of the entity that sent the Presentation Request
 * @param context additional urls to "https://www.w3.org/2018/credentials/v1" and "https://alastria.github.io/identity/credentials/v1"
 * @param procUrl The URL of an external document describing the intended purpose of the data that the service provider is receiving
 * @param procHash The hash of an external document describing the intended purpose of the data that the service provider is requesting
 * @param data It is the structure (JSON Array) that contains the actual Presentation Request data items
 * @param cbu Callbacku url from the user
 * @param type aditional types to "VerifiablePresentationRequest" and "AlastriaVerifiablePresentationRequest"
 * @param kid  DID reference of the public key as it appears in the DID Document associated to the Alastria.ID of the entity sending the Presentation Request (normally the service provider)
 * @param jwk Public key
 * @param exp identifies the expiration time on or after which the JWT (Presentation Request) MUST NOT be accepted for processing
 * @param nbf identifies the time before which the JWT (presentation) MUST NOT be accepted for processing
 * @param jti This is the identification of this specific Presentation Request (it is NOT the identifier of the holder or of any other actor)
 */
function createPresentationRequest(
  iss: string,
  context: string[],
  procUrl: string,
  procHash: string,
  data: object[],
  cbu: string,
  type: string[],
  kid?: string,
  jwk?: string,
  exp?: number,
  nbf?: number,
  jti?: string
) {
  const requiredContext: string[] = [
    'https://www.w3.org/2018/credentials/v1',
    'https://alastria.github.io/identity/credentials/v1'
  ]
  const requiredTypes: string[] = [
    'VerifiablePresentationRequest',
    'AlastriaVerifiablePresentationRequest'
  ]

  const jwt = {
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
        '@context': requiredContext.concat(context),
        type: requiredTypes.concat(type),
        procHash,
        procUrl,
        data
      }
    }
  }
  return jwt
}

function PSMHash(web3, jwt, did) {
  const json = jwt.concat(did)
  return web3.utils.sha3(json) // Same as -> web3.utils.keccak256(json)
}
/**
 * Create a JSON with the three params
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param context additional urls to "https://alastria.github.io/identity/artifacts/v1"
 * @param type aditional types to "AlastriaIdentityCreation"
 * @param createAlastriaTX
 * @param alastriaToken Verified Alastria Token
 * @param publicKey Public key
 * @param jwk Public key
 * @param jti unique aic identifier
 * @param iat
 * @param exp expiration time
 * @param nbf not before
 */
function createAIC(
  context: string[],
  type: string[],
  createAlastriaTX: string,
  alastriaToken: string,
  publicKey: string,
  kid?: string,
  jwk?: string,
  jti?: string,
  iat?: number,
  exp?: number,
  nbf?: number
) {
  const requiredContext: string[] = [
    'https://alastria.github.io/identity/artifacts/v1'
  ]
  const requiredTypes: string[] = ['AlastriaIdentityCreation']

  const jwt = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      kid,
      jwk
    },
    payload: {
      '@context': requiredContext.concat(context),
      type: requiredTypes.concat(type),
      createAlastriaTX,
      alastriaToken,
      publicKey,
      jti: jti,
      iat: iat,
      exp: exp,
      nbf: nbf
    }
  }
  return jwt
}
