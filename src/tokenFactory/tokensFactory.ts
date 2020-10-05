import { decodeToken, TokenSigner, TokenVerifier } from 'jsontokens'
import { SignedToken } from 'jsontokens/lib/signer'
import { JwtToken } from '../interfaces'
// import * as JWT from '../../typings/tokens/jwt'

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

function createDID(network: string, proxyAddress: string, networkID: string) {
  // network -> "quor" / "fabr"
  // networkID -> redT,...
  return `did:ala:${network}:${networkID}:${proxyAddress}`
}

// Used by Service Provider or Subject Wallet
export function decodeJWT(jwt: string) {
  var tokenData = null
  if (jwt) {
    tokenData = decodeToken(jwt)
  }
  return tokenData
}

function signJWT(jwt: JwtToken, rawPrivateKey: string) {
  if (jwt.header && jwt.payload) {
    return new TokenSigner('ES256K', rawPrivateKey).sign(
      jwt.payload,
      false,
      jwt.header
    )
  } else {
    return new TokenSigner('ES256K', rawPrivateKey).sign(jwt)
  }
}

function verifyJWT(jwt: string | SignedToken, rawPublicKey: string) {
  return new TokenVerifier('ES256K', rawPublicKey).verify(jwt)
}

function PSMHash(web3, jwt, did) {
  const json = jwt.concat(did)
  return web3.utils.sha3(json) // Same as -> web3.utils.keccak256(json)
}
