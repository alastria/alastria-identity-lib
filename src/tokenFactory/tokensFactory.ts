import { createAlastriaSession } from './jwt/alastriaSession'
import { createAlastriaToken } from './jwt/alastriaToken'
import { createCredential } from './jwt/credential'
import { createPresentation } from './jwt/presentation'
import { createPresentationRequest } from './jwt/presentationRequest'
import { createAIC } from './jwt/aic'

export const tokensFactory = {
  tokens: {
    decodeJWT,
    signJWT,
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
    PSMHash,
    /** @deprecated Import it now as follows: ~/src/tokenFactory/jwt */
    createAIC,
    createDID
  }
}
