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
}

// Used by Subject Wallet
export function verifyPresentationRequest(presentationRequestJWT) {

}

// Used by Subject Wallet
export function signPresentation(presentation) {
  //return presentationJWT;
}

// Used by Service Provider
export function verifyPresentation(presentationJWT) {

}
