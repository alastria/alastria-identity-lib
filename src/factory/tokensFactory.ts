//import { default as _ } from 'jsontokens'
const _: any = require('jsontokens');
export const tokensFactory = {
  presentation: {
    'signPresentationRequest': signPresentationRequest,
    'verifyPresentationRequest': verifyPresentationRequest,
    'signPresentation': signPresentation,
    'verifyPresentation': verifyPresentation
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
