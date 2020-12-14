import { Credential, CredentialSubject } from '../../../typings/tokens/jwt'

// Creates an unsigned credential
/**
 * @param iss {string} - DID representing the AlastriaID of the entity that issued the credential
 * @param context {string[]} - additional urls to "https://www.w3.org/2018/credentials/v1" and "https://alastria.github.io/identity/credentials/v1"
 * @param credentialSubject {CredentialSubject[]} - JSON array of credentials
 * @param kid? {string} - indicates which key was used to secure (digitally sign) the JWT
 * @param sub? {string} - DID representing the AlastriaID of the subject to which the credential refers to
 * @param exp? {string} - expiration time on or after which the JWT (credential) MUST NOT be accepted for processing
 * @param nbf? {string} - identifies the time before which the JWT (credential) MUST NOT be accepted for processing
 * @param jti? {string} - This is the identification of this specific credential (it is NOT the identifier of the holder or of any other actor)
 * @param jwk? {string} - optional field with the public key used to sign the JWT Header
 * @param type? {string[]} - additional types to "VerifiableCredential" and "AlastriaVerifiableCredential"
 *
 * @return Credential
 */
export function createCredential(
  iss: string,
  context: string[],
  credentialSubject: CredentialSubject,
  kid?: string,
  sub?: string,
  exp?: number,
  nbf?: number,
  jti?: string,
  jwk?: string,
  type?: string[]
): Credential {
  const requiredContext: string[] = [
    'https://www.w3.org/2018/credentials/v1',
    'https://alastria.github.io/identity/credentials/v1'
  ]
  const requiredTypes: string[] = [
    'VerifiableCredential',
    'AlastriaVerifiableCredential'
  ]

  context = context ? requiredContext.concat(context) : requiredContext
  type = type ? requiredTypes.concat(type) : requiredTypes

  const jwt: Credential = {
    header: {
      typ: 'JWT',
      alg: 'ES256K',
      kid,
      jwk
    },
    payload: {
      jti,
      iss,
      sub,
      iat: Math.round(Date.now() / 1000),
      exp,
      nbf,
      vc: {
        '@context': context,
        type,
        credentialSubject
      }
    }
  }
  return jwt
}
