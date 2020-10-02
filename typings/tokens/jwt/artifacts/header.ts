export interface Header {
  alg: 'ES256K' // Add more if needed as follows "ES256K" | "HMAC256" | "otherALG"
  typ: 'JWT'
  jwt?: string
  kid?: string
}
