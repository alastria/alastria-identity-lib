import {
  PresentationRequest,
  PresentationRequestData
} from '../../../typings/tokens/jwt'

// Creates a presentation request
/**
 * @param iss {string} - DID representing the Alastria.ID of the entity that sent the Presentation Request
 * @param context {string[]} - additional urls to "https://www.w3.org/2018/credentials/v1" and "https://alastria.github.io/identity/credentials/v1"
 * @param procUrl {string} - The URL of an external document describing the intended purpose of the data that the service provider is receiving
 * @param procHash {string} - The hash of an external document describing the intended purpose of the data that the service provider is requesting
 * @param data {PresentationRequestData[]} - It is the structure (JSON Array) that contains the actual Presentation Request data items
 * @param cbu {string} - Callback url from the user
 * @param type {string[]} - additional types to "VerifiablePresentationRequest" and "AlastriaVerifiablePresentationRequest"
 * @param kid? {string} - DID reference of the public key as it appears in the DID Document associated to the Alastria.ID of the entity sending the Presentation Request (normally the service provider)
 * @param jwk? {string} - Public key
 * @param exp? {number} - identifies the expiration time on or after which the JWT (Presentation Request) MUST NOT be accepted for processing
 * @param nbf? {number} - identifies the time before which the JWT (presentation) MUST NOT be accepted for processing
 * @param jti? {string} - This is the identification of this specific Presentation Request (it is NOT the identifier of the holder or of any other actor)
 *
 * @return PresentationRequest
 */
export function createPresentationRequest(
  iss: string,
  context: string[],
  procUrl: string,
  procHash: string,
  data: PresentationRequestData[],
  cbu: string,
  type: string[],
  kid?: string,
  jwk?: string,
  exp?: number,
  nbf?: number,
  jti?: string
): PresentationRequest {
  const requiredContext: string[] = [
    'https://www.w3.org/2018/credentials/v1',
    'https://alastria.github.io/identity/credentials/v1'
  ]
  const requiredTypes: string[] = [
    'VerifiablePresentationRequest',
    'AlastriaVerifiablePresentationRequest'
  ]

  const jwt: PresentationRequest = {
    header: {
      alg: 'ES256K',
      typ: 'JWT',
      kid,
      jwk
    },
    payload: {
      jti,
      iss,
      iat: Math.round(Date.now() / 1000),
      exp,
      nbf,
      cbu,
      pr: {
        '@context': requiredContext.concat(context),
        type: requiredTypes.concat(type),
        procHash,
        procUrl,
        data
      }
    }
  }
  return jwt
}
