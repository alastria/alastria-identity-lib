//import { default as _ } from 'jsontokens'
const _: any = require('jsontokens');
export const tokensFactory = {
  presentation: {
    'signPresentationRequest': signPresentationRequest,
    'verifyPresentationRequest': verifyPresentationRequest,
    'signPresentation': signPresentation,
    'verifyPresentation': verifyPresentation,
    'createCredential': createCredential,
    'decodeJWT': decodeJWT,
    'signJWT': signJWT,
    'verifyJWT': verifyJWT,
    'createAlastriaSession': createAlastriaSession,
    'createAlastriaToken': createAlastriaToken,
    'createPresentation': createPresentation,
    //'createPresentationRequest': createPresentationRequest
  }
}

// Used by Service Provider
export function signPresentationRequest(presentationRequest, rawPrivateKey) {
  // TODO recibimos un array de strings con las credentials y transformarlo a presentationRequest
  var jsonObject = new _.TokenSigner('ES256K', rawPrivateKey).sign(presentationRequest);
  return jsonObject

};

// Used by Subject Wallet
export function verifyPresentationRequest(presentationRequestJWT, rawPublicKey) {
  var jsonObject = new _.TokenVerifier('ES256K', rawPublicKey).verify(presentationRequestJWT);
  var tokenData = null
  if(jsonObject){
    tokenData = _.decodeToken(presentationRequestJWT)
  }
  return tokenData
}

// Used by Subject Wallet
export function signPresentation(presentation, rawPrivateKey) {
// TODO recibimos un array de strings con las credentials y transformarlo a presentation
  var jsonObject = new _.TokenSigner('ES256K', rawPrivateKey).sign(presentation);
  return jsonObject
}

// Used by Service Provider
export function verifyPresentation(presentationJWT, rawPublicKey) {
  var jsonObject = new _.TokenVerifier('ES256K', rawPublicKey).verify(presentationJWT);
  var tokenData = null
  if(jsonObject){
    tokenData = _.decodeToken(presentationJWT)
  }
  return tokenData
}

export function createCredential(credentialContext, levelAssurance, credentialFeatures) {
  const jwt = {
    "Context": credentialContext,
    "levelOfAssurance": levelAssurance,
    "features": {credentialFeatures}
  }
  return jwt;
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
    "Context": context,
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

function createPresentation(context, jti, iss, sub, credential, credential2, credential3) {
  const jwt = {
    "header": {
      "typ": "JWT",
      "alg": "ES256K"
    },
    "Payload": {
      "Context": context,
      "jti": jti,
      "iss": iss,
      "sub": sub
    },
    "Credentials": {
      "credential1": credential,
      "credential2": credential2,
      "credential3": credential3
    }
  }
  return jwt
}

/*function createPresentationRequest(issuerDID, subjectDID, objects, tokenValidTime, setUpTokenTime, tokenId) {
  return jsonObject
}*/
