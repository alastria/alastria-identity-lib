export interface Header {
  readonly alg: 'ES256K' // Add more if needed as follows "ES256K" | "HMAC256" | "otherALG"
  readonly typ: 'JWT'
  readonly jwk?: string
  readonly kid?: string
}
