// This files stays here only for legacy purposes
// Functions used in this file have been moved to ~/src/tokenFactory/jwt

import {
  PSMHash,
  createAIC,
  createAlastriaSession,
  createAlastriaToken,
  createCredential,
  createDID,
  createPresentation,
  createPresentationRequest,
  decodeJWT,
  signJWT,
  verifyJWT
} from './jwt'

export const tokensFactory = {
  tokens: {
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    decodeJWT,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    signJWT,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    verifyJWT,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createAlastriaSession,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createAlastriaToken,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createCredential,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createPresentation,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createPresentationRequest,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    PSMHash,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createAIC,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createDID
  }
}
