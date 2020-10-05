import { AlastriaToken } from '../../../typings/tokens/jwt'

// Creates the AlastriaToken
/**
 * @param iss DID representing the AlastriaID of the entity that issued the Alastria Token
 * @param gwu Provider gateway url
 * @param cbu Callback url from the user
 * @param ani Alastria Network ID
 * @param exp expiration time
 * @param kid indicates which key was used to secure (digitally sign) the JWT
 * @param jwk Users public key
 * @param nbf not before
 * @param jti Unique token identifier
 * // TODO returns and types
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
