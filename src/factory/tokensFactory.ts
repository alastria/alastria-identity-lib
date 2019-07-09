import {TokenVerifier} from 'jsontokens'
export const tokensFactory = {
  presentation: {
    'signPresentationRequest': signPresentationRequest,
    'verifyPresentationRequest': verifyPresentationRequest,
    'signPresentation': signPresentation,
    'verifyPresentation': verifyPresentation
  }
}

// Used by Service Provider
export function signPresentationRequest(presentationRequest) {
  //return presentationRequestJWT;
  console.log('hi signPresentationRequest')
}

// Used by Subject Wallet
export function verifyPresentationRequest(presentationRequestJWT, rawPublicKey) {
  console.log('hi verifyPresentationRequest')
  console.log('hi')
  const jsonObject = new TokenVerifier('ES256K', rawPublicKey).verify(presentationRequestJWT)
  return jsonObject
}

// Used by Subject Wallet
export function signPresentation(presentation) {
  //return presentationJWT;
  console.log('hi signPresentation')
}

// Used by Service Provider
export function verifyPresentation(presentationJWT) {
  console.log('hi verifyPresentation')
}
