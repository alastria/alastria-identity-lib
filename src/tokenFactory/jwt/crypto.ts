import { decodeToken, TokenSigner, TokenVerifier } from 'jsontokens'
import { AlastriaJWT } from '../../../typings/tokens/jwt'
import { SignedToken } from 'jsontokens/lib/signer'

// Used by Service Provider or Subject Wallet
export function decodeJWT(jwt: string) {
  var tokenData = null
  if (jwt) {
    tokenData = decodeToken(jwt)
  }
  return tokenData
}

export function signJWT(jwt: AlastriaJWT, rawPrivateKey: string) {
  if (jwt.header && jwt.payload) {
    // This will be always true in TS
    return new TokenSigner(jwt.header.alg, rawPrivateKey).sign(
      jwt.payload,
      false,
      jwt.header
    )
  } else {
    return new TokenSigner(jwt.header.alg, rawPrivateKey).sign(jwt)
  }
}

export function verifyJWT(jwt: string | SignedToken, rawPublicKey: string) {
  return new TokenVerifier('ES256K', rawPublicKey).verify(jwt)
}
