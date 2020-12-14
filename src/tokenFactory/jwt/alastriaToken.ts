import { AlastriaToken } from '../../../typings/tokens/jwt'

// Creates the AlastriaToken
/**
 * @param iss {string} - DID representing the AlastriaID of the entity that issued the Alastria Token
 * @param gwu {string} - Provider gateway url
 * @param cbu {string} - Callback url from the user
 * @param ani {string} - Alastria Network ID
 * @param exp {number} - expiration time
 * @param kid {string} - indicates which key was used to secure (digitally sign) the JWT
 * @param jwk? {string} - Users public key
 * @param nbf? {number} - not before
 * @param jti? {string} - Unique token identifier
 *
 * @return AlastriaSession
 */
export function createAlastriaToken(
  iss: string,
  gwu: string,
  cbu: string,
  ani: string,
  exp: number,
  kid: string,
  jwk?: string,
  nbf?: number,
  jti?: string
): AlastriaToken {
  const jwt: AlastriaToken = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      kid,
      jwk
    },
    payload: {
      iss,
      gwu,
      cbu,
      iat: Math.round(Date.now() / 1000),
      ani,
      nbf,
      exp,
      jti
    }
  }
  return jwt
}
