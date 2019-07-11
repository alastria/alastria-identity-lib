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
  // TODO recibimos un array de strings con las credenciales y lo transformamos a presentationRequest
  console.log('hi signPresentationRequest')
  var jsonObject = new _.TokenSigner('ES256K', rawPrivateKey).sign(presentationRequest);
  console.log('The token is: ' + jsonObject)
  return jsonObject
};

// Used by Subject Wallet
export function verifyPresentationRequest(presentationRequestJWT, rawPublicKey) {
  console.log('hi verifyPresentationRequest')
  var jsonObject = new _.TokenVerifier('ES256K', rawPublicKey).verify(presentationRequestJWT);
  var tokenData = null
  if(jsonObject){
    tokenData = _.decodeToken(presentationRequestJWT)
  }
  return tokenData
}

// Used by Subject Wallet
export function signPresentation(presentation, rawPrivateKey) {
  //return presentationJWT;
  console.log('hi signPresentation')
  var jsonObject = new _.TokenSigner('ES256K', rawPrivateKey).sign(presentation);
  console.log('The token is: ' + jsonObject)
  return jsonObject
}

// Used by Service Provider
export function verifyPresentation(presentationJWT, rawPublicKey) {
  console.log('hi verifyPresentation')
  var jsonObject = new _.TokenVerifier('ES256K', rawPublicKey).verify(presentationJWT);
  console.log(jsonObject)
  return jsonObject
}
