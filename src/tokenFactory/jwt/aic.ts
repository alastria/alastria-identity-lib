import { AIC, CreateAICFn } from '../../../typings/tokens/jwt'

// Create a JSON with the three params
/**
 * @param context {string[]} - additional urls to "https://alastria.github.io/identity/artifacts/v1"
 * @param type {string[]} - additional types to "AlastriaIdentityCreation"
 * @param createAlastriaTX {string} -
 * @param alastriaToken {string} - Verified Alastria Token
 * @param publicKey {string} - Public key
 * @param kid? {string} - indicates which key was used to secure (digitally sign) the JWT
 * @param jwk? {string} - Public key
 * @param jti? {string} - unique aic identifier
 * @param iat? {number} - Issued at
 * @param exp? {number} - expiration time
 * @param nbf? {number} - not before
 *
 * @return AIC
 */
export const createAIC: CreateAICFn = function (
  context: string[],
  type: string[],
  createAlastriaTX: string,
  alastriaToken: string,
  publicKey: string,
  kid?: string,
  jwk?: string,
  jti?: string,
  iat?: number,
  exp?: number,
  nbf?: number
): AIC {
  const requiredContext: string[] = [
    'https://alastria.github.io/identity/artifacts/v1'
  ]
  const requiredTypes: string[] = ['AlastriaIdentityCreation']

  const jwt: AIC = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      kid,
      jwk
    },
    payload: {
      '@context': requiredContext.concat(context),
      type: requiredTypes.concat(type),
      createAlastriaTX,
      alastriaToken,
      publicKey,
      jti: jti,
      iat: iat,
      exp: exp,
      nbf: nbf
    }
  }
  return jwt
}
