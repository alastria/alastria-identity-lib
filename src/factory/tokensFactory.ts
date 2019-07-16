/**
*   This file contains function which are used by Service Providers, Issuers
*   and Subjects which do not interact with the blockchain. Just make eassier
*   using JWT (sign, verify and deconde) and access tokens
*/
const _: any = require('jsontokens');

export const tokensFactory = {
  presentation: {
    'signJWT': signJWT,
    'verifyJWT': verifyJWT,
    'decodeJWT': decodeJWT,
    'createAlastriaSession': createAlastriaSession,
    'createAlastriaToken' : createAlastriaToken,
    'createCredential' : createCredential,
    'createPresentation' : createPresentation,
    'createPresentationRequest' : createPresentationRequest
  }
}

export function signJWT(jwt, rawPrivateKey) {
  var jsonObject = new _.TokenSigner('ES256K', rawPrivateKey).sign(jwt);
  return jsonObject;
}

export function verifyJWT(jwt, rawPublicKey) {
  var jsonObject = new _.TokenVerifier('ES256K', rawPublicKey).verify(jwt);
  return jsonObject;
}

export function decodeJWT(jwt, rawPublicKey) {
  var tokenData = _.decodeToken(jwt);
  return tokenData;
}

export function createAlastriaSession(address) {

}

export function createAlastriaToken(address){

}

export function createCredential(object){

}

export function createPresentation(object){

}

export function createPresentationRequest(object){

}
