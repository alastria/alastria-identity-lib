import {
  AlastriaSession,
  CreateAlastriaSessionFn
} from '../../../typings/tokens/jwt'

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
 * @return AlastriaToken
 */
export const createAlastriaSession: CreateAlastriaSessionFn = function (
  context: string[],
  iss: string,
  kid: string,
  type: string[],
  alastriaToken: string,
  exp: number,
  pku?: string,
  nbf?: number,
  jti?: string
): AlastriaSession {
  const requiredContext: string[] = [
    'https://alastria.github.io/identity/artifacts/v1'
  ]
  const requiredTypes: string[] = ['AlastriaSession']

  const jwt: AlastriaSession = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      jwk: pku,
      kid
    },
    payload: {
      '@context': requiredContext.concat(context),
      type: requiredTypes.concat(type),
      iss,
      iat: Math.round(Date.now() / 1000),
      exp,
      nbf,
      alastriaToken,
      jti
    }
  }
  return jwt
}
