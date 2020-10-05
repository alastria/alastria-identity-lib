import { Presentation, CreatePresentationFn } from '../../../typings/tokens/jwt'

// Creates an unsigned presentation
/**
 * @param iss {string} - DID representing the Alastria.ID of the entity that issued the presentation (normally the citizen)
 * @param aud {string} - identifies the recipient that the JWT is intended for
 * @param context {string[]} - additional urls to "https://www.w3.org/2018/credentials/v1" and "https://alastria.github.io/identity/credentials/v1"
 * @param verifiableCredential {string[]} - An array of verifiable credentials in JWT format, that is, signed JWTs where each verifiable credential is base64url encoded
 * @param procUrl {string} - The URL of an external document describing the intended purpose of the data that the service provider is receiving
 * @param procHash {string} - The hash of an external document describing the intended purpose of the data that the service provider is receiving
 * @param type {string[]} - additional types to "VerifiablePresentation" and "AlastriaVerifiablePresentation"
 * @param kid? {string} - indicates which key was used to secure (digitally sign) the JWT
 * @param jwk? {string} - Public key
 * @param exp? {number} - identifies the expiration time on or after which the JWT (presentation) MUST NOT be accepted for processing
 * @param nbf? {number} - identifies the time before which the JWT (presentation) MUST NOT be accepted for processing
 * @param jti? {string} - This is the identification of this specific presentation instance (it is NOT the identifier of the holder or of any other actor)
 *
 * @return Presentation
 */
export const createPresentation: CreatePresentationFn = function (
  iss: string,
  aud: string,
  context: string[],
  verifiableCredential: string[],
  procUrl: string,
  procHash: string,
  type: string[],
  kid?: string,
  jwk?: string,
  exp?: number,
  nbf?: number,
  jti?: string
) {
  const requiredContext: string[] = [
    'https://www.w3.org/2018/credentials/v1',
    'https://alastria.github.io/identity/credentials/v1'
  ]
  const requiredTypes: string[] = [
    'VerifiablePresentation',
    'AlastriaVerifiablePresentation'
  ]

  const jwt: Presentation = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      kid,
      jwk
    },
    payload: {
      jti,
      iss,
      aud,
      iat: Math.round(Date.now() / 1000),
      exp,
      nbf,
      vp: {
        '@context': requiredContext.concat(context),
        type: requiredTypes.concat(type),
        procHash,
        procUrl,
        verifiableCredential
      }
    }
  }
  return jwt
}
