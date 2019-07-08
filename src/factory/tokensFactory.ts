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
export function verifyPresentationRequest(presentationRequestJWT) {
  console.log('hi verifyPresentationRequest')
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
