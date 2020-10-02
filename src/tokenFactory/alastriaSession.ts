import * as JWT from '../../typings/tokens/jwt'

export const createAlastriaSession: JWT.createAlastriaSessionFn = function (
  context,
  iss,
  kid,
  type,
  alastriaToken,
  exp,
  pku,
  nbf,
  jti
) {
  const requiredContext: string[] = [
    'https://alastria.github.io/identity/artifacts/v1'
  ]
  const requiredTypes: string[] = ['AlastriaSession']

  const jwt: JWT.AlastriaSession = {
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
