import * as JWT from './'

/** Creates an Alastria Session
 * @param string[] context additional urls to "https://alastria.github.io/identity/artifacts/v1"
 * @param string iss DID representing the AlastriaID of the entity that issued the Alastria Session
 * @param string pku Users public key
 * @param string alastriaToken Verified Alastria Token
 * @param string kid indicates which key was used to secure (digitally sign) the JWT
 * @param string[] type additional types to "AlastriaSession"
 * @param number exp expiration time
 * @param number nbf not before
 * @param string jti Unique token identifier
 */
export type createAlastriaSessionFn = (
  context: string[],
  iss: string,
  kid: string,
  type: string[],
  alastriaToken: string,
  exp: number,
  pku?: string,
  nbf?: number,
  jti?: string
) => JWT.AlastriaSession
