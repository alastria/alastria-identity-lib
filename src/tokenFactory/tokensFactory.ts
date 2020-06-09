import { isContext } from "vm";

// import { default as _ } from 'jsontokens'
const _: any = require('jsontokens');
export const tokensFactory = {
  tokens: {
    'decodeJWT': decodeJWT,
    'signJWT': signJWT,
    'verifyJWT': verifyJWT,
    'createAlastriaSession': createAlastriaSession,
    'createAlastriaToken': createAlastriaToken,
    'createCredential': createCredential,
    'createPresentation': createPresentation,
    'createPresentationRequest': createPresentationRequest,
    'PSMHash': PSMHash,
    'createAIC': createAIC,
    'createDID': createDID
  }
}

function createDID(network, proxyAddress, networkID) {
  // network -> "quor" / "fabr"
  // networkID -> redT,...
  return "did:ala:" + network + ":" + networkID + ":" + proxyAddress;
}

// Used by Service Provider or Subject Wallet
export function decodeJWT(jwt) {
  var tokenData = null
  if(jwt){
    tokenData = _.decodeToken(jwt)
  }
  return tokenData
}

function signJWT(jwt, rawPrivateKey) {
  if (jwt.header && jwt.payload){
  	return new _.TokenSigner('ES256K', rawPrivateKey).sign(jwt.payload, false, jwt.header);
  }
  else {
        return new _.TokenSigner('ES256K', rawPrivateKey).sign(jwt);
  }
}

function verifyJWT(jwt, rawPublicKey) {
  return new _.TokenVerifier('ES256K', rawPublicKey).verify(jwt);
}

/** Creates an Alastria Session
 * @param context
 * @param iss DID representing the AlastriaID of the entity that issued the Alastria Session
 * @param pku Users public key
 * @param data Verified Alastria Token
 * @param exp expiration time
 * @param nbf not before
 * @param jti Unique token identifier
 */
function createAlastriaSession(context, iss, pku, data, exp?: number, nbf?: number, jti?: string) {
  const jwt = {
    "@context": context,
    "iss": iss,
    "pku": pku,
    "iat": Math.round(Date.now()/1000),
    "exp": exp,
    "nbf": nbf,
    "data": data,
    "jti": jti
  }
  return jwt
}

/** Creates the AlastriaToken
 * @param iss DID representing the AlastriaID of the entity that issued the Alastria Token
 * @param gwu Provider gateway url
 * @param cbu Callbacku url from the user
 * @param ani Alastria Network ID
 * @param exp expiration time
 * @param nbf not before
 * @param jti Unique token identifier
 */
function createAlastriaToken(iss, gwu, cbu, ani, exp, nbf?: number, jti?: string) {
  const jwt = {
    "iss": iss,
    "gwu": gwu,
    "cbu": cbu,
    "iat": Math.round(Date.now()/1000),
    "ani": ani,
    "nbf": nbf,
    "exp": exp,
    "jti": jti
  }
  return jwt
}

/** Creates an unsigned credential
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param iss DID representing the AlastriaID of the entity that issued the credential
 * @param sub DID representing the AlastriaID of the subject to which the credential refers to
 * @param context
 * @param credentialSubject JSON array of credentials
 * @param exp expiration time on or after which the JWT (credential) MUST NOT be accepted for processing
 * @param nbf identifies the time before which the JWT (credential) MUST NOT be accepted for processing
 * @param jti This is the identification of this specific credential (it is NOT the identifier of the holder or of any other actor)
 */
export function createCredential(kid, iss, sub, context, credentialSubject, exp?: number, nbf?: number, jti?: String) {
     const jwt = {
    "header": {
      "typ": "JWT",
      "alg": "ES256K",
      "kid": kid
    },
    "payload": {
      "jti": jti,
      "iss": iss,
      "sub": sub,
      "iat": Math.round(Date.now()/1000),
      "exp": exp,
      "nbf": nbf,
      "vc":{
    	"@context": context,
        "type": ["VerifiableCredential", "AlastriaExampleCredential"],
        "credentialSubject":credentialSubject
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
 * @param exp identifies the expiration time on or after which the JWT (presentation) MUST NOT be accepted for processing
 * @param nbf identifies the time before which the JWT (presentation) MUST NOT be accepted for processing
 * @param jti This is the identification of this specific presentation instance (it is NOT the identifier of the holder or of any other actor)
 */
function createPresentation(kid, iss, aud, context, verifiableCredential, procUrl, procHash, exp?: number, nbf?: number, jti?: String) {
  const jwt = {
    "header": {
        "alg": "ES256K",
        "typ": "JWT",
        "kid": kid
    },
    "payload": {
        "jti": jti,
        "iss": iss,
        "aud": aud,
        "iat": Math.round(Date.now()/1000),
        "exp": exp,
        "nbf": nbf,
        "vp": {
          "@context": context,
          "type": ["VerifiablePresentation"],
          "procUrl": procUrl,
          "procHash": procHash,
          "verifiableCredential": verifiableCredential
        }
    }
  }
  return jwt
}

/** Creates a presentation request
 * @param kid  DID reference of the public key as it appears in the DID Document associated to the Alastria.ID of the entity sending the Presentation Request (normally the service provider)
 * @param iss DID representing the Alastria.ID of the entity that sent the Presentation Request
 * @param context
 * @param procUrl The URL of an external document describing the intended purpose of the data that the service provider is receiving
 * @param procHash The hash of an external document describing the intended purpose of the data that the service provider is requesting
 * @param data It is the structure (JSON Array) that contains the actual Presentation Request data items
 * @param exp identifies the expiration time on or after which the JWT (Presentation Request) MUST NOT be accepted for processing
 * @param nbf identifies the time before which the JWT (presentation) MUST NOT be accepted for processing
 * @param jti This is the identification of this specific Presentation Request (it is NOT the identifier of the holder or of any other actor)
 * @param cbu Callbacku url from the user
 */
function createPresentationRequest(kid, iss, context, procUrl, procHash, data, cbu, exp?: number, nbf?: number, jti?: String) {
  const jwt = {
    "header": {
        "alg": "ES256K",
        "typ": "JWT",
        "kid": kid
    },
    "payload": {
        "jti": jti,
        "iss": iss,
        "iat": Math.round(Date.now()/1000),
        "exp": exp,
        "nbf": nbf,
	"cbu": cbu,
        "pr": {
          "@context": context,
          "type": ["VerifiablePresentationRequest"],
          "procUrl": procUrl,
      	  "procHash": procHash,
          "data": data
        }
      }
    }
  return jwt
}

function PSMHash(web3, jwt, did){
	const json = jwt.concat(did);
	return web3.utils.sha3(json); // Same as -> web3.utils.keccak256(json)
}
/**
  * Create a JSON with the three params
  * @param kid indicates which key was used to secure (digitally sign) the JWT
  * @param jwk
  * @param context
  * @param type
  * @param createAlastriaTX
  * @param alastriaToken
  * @param publicKey
  * @param jti unique aic identifier
  * @param iat
  * @param exp expiration time
  * @param nbf not before
  * 
  */
function createAIC(kid, jwk, context: Array<string>, type: Array<string>, createAlastriaTX, alastriaToken, publicKey, jti?: string, iat?: number, exp?: number, nbf?: number){

  const jwt = {
    "header": {
      "alg": "ES256K",
      "typ": "JWT",
      "kid": kid,
      "jwk": jwk
    },
    "payload": {
      "@context": ["https://alastria.github.io/identity/artifacts/v1"].concat(context),
      "type": ["AlastriaIdentityCreation"].concat(type),
      "createAlastriaTX":createAlastriaTX,
      "alastriaToken":alastriaToken,
      "publicKey":publicKey,
      "jti": jti,
      "iat": iat,
      "exp": exp,
      "nbf": nbf
    }
  }
  return jwt
}
