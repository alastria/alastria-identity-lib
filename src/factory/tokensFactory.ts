import {TokenVerifier, TokenSigner} from 'jsontokens'

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
  //return presentationRequestJWT;
  console.log('hi signPresentationRequest')
  jsonObject = new TokenSigner('ES256K', rawPrivateKey).sign(presentationRequest)
  return jsonObject
}

// Used by Subject Wallet
export function verifyPresentationRequest(presentationRequestJWT, rawPublicKey) {
  console.log('hi verifyPresentationRequest')
  console.log('hi')
  jsonObject = new TokenVerifier('ES256K', rawPublicKey).verify(presentationRequestJWT)
  return jsonObject
}

// Used by Subject Wallet
export function signPresentation(tokenPresentation, rawPrivateKey) {
  //return presentationJWT;
  console.log('hi signPresentation')
  jsonObject = new TokenSigner('ES256K', rawPrivateKey).sign(tokenPresentation)
  return jsonObject
}

// Used by Service Provider
export function verifyPresentation(presentationJWT, rawPublicKey) {
  console.log('hi verifyPresentation')
  jsonObject = new TokenVerifier('ES256K', rawPublicKey).verify(presentationJWT)
  return jsonObject
}
