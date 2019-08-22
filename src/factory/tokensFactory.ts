//import { default as _ } from 'jsontokens'
const _: any = require('jsontokens');
export const tokensFactory = {
  presentation: {
    'decodeJWT': decodeJWT,
    'signJWT': signJWT,
    'verifyJWT': verifyJWT,
    'createAlastriaSession': createAlastriaSession,
    'createAlastriaToken': createAlastriaToken,
    'createCredential': createCredential,
    'createPresentation': createPresentation,
    //'createPresentationRequest': createPresentationRequest
  }
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
  return new _.TokenSigner('ES256K', rawPrivateKey).sign(jwt);
}

function verifyJWT(jwt, rawPublicKey) {
  return new _.TokenVerifier('ES256K', rawPublicKey).verify(jwt);
}

function createAlastriaSession(context, iss, pku, verifiedAT, iat, exp?: string, nbf?: string, jti?: string) {
  const jwt = {
    "@context": context,
    "iss": iss,
    "pku": pku,
    "iat": iat,
    "exp": exp,
    "nbf": nbf,
    "data": verifiedAT,
    "jti": jti
  }
  return jwt
}

function createAlastriaToken(issuerDID, gwu, cbu, iat, exp, ani, nbf?: string, jti?: string) {
  const jwt = {
    "iss": issuerDID,
    "gwu": gwu,
    "cbu": cbu,
    "iat": iat,
    "ani": ani,
    "nbf": nbf,
    "exp": exp,
    "jti": jti
  }
  return jwt
}


// It builds a JWT with credential info
export function createCredential(context, levelOfAssurance, credentialKey, credentialValue) {
  const jwt = {
    "@context": context,
    "levelOfAssurance": levelOfAssurance,
    credentialKey: credentialValue //TODO que ponga el contenido del parametro
  }
  return jwt;
}

/**
* Crea una presena
* @param didIssuer asdfasdf
* @param sdafsdf optional
*/
function createPresentation(didIssuer, didSubject, credentials, timeExp?: number, timeNbf?: number, jti?: number) {
  const jwt = {
    "header": {
      "typ": "JWT",
      "alg": "ES256K"
    },
    "Payload": {
      "@context": "https://w3id.org/credentials/v1",
      "jti": jti,
      "iss": didIssuer,
      "sub": didSubject,
      "iat": timeNbf, // ?? Como se calcula
      "exp": timeExp,
      "nbf": timeNbf,
      "credentials": [credentials] // TODO que ponga el contenido de cada credencial
    }
  }
  return jwt
}

/*function createPresentationRequest(issuerDID, subjectDID, objects, tokenValidTime, setUpTokenTime, tokenId) {
  return jsonObject
}*/
