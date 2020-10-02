export interface AICPayload {
  readonly exp?: number
  readonly nbf?: number
  readonly jti?: string
  readonly iat?: number
  readonly '@context': string[]
  readonly type: string[]
  readonly createAlastriaTX: string
  readonly alastriaToken: string
  readonly publicKey: string
}

export interface AlastriaSessionPayload {
  readonly exp?: number
  readonly nbf?: number
  readonly jti?: string
  readonly iat?: number
  readonly iss: string
  readonly '@context': string[]
  readonly type: string[]
  readonly alastriaToken: string
}

export interface AlastriaTokenPayload {
  readonly exp: number
  readonly nbf?: number
  readonly jti?: string
  readonly iat?: number
  readonly iss: string
  readonly gwu: string
  readonly cbu: string
  readonly ani: string
}

export interface CredentialPayload {
  readonly exp: number
  readonly nbf?: number
  readonly jti?: string
  readonly iat?: number
  readonly iss: string
  readonly sub: string
  readonly vc: {
    readonly '@context': string[]
    readonly type: string[]
    readonly credentialSubject: {
      readonly levelOfAssurance: number
      readonly [propName: string]: any // Any other property
    }
  }
}

interface PresentationBase {
  readonly '@context': string[]
  readonly type: string[]
  readonly procHash: string
  readonly procUrl: string
}

interface PresentationPayloadVP extends PresentationBase {
  readonly verifiableCredential: string[]
}

export interface PresentationPayload {
  readonly exp: number
  readonly nbf?: number
  readonly jti?: string
  readonly iat?: number
  readonly iss: string
  readonly aud: string
  readonly vp: PresentationPayloadVP
}

interface PresentationRequestPayloadPR extends PresentationBase {
  readonly data: {
    readonly '@context': string[]
    readonly levelOfAssurance: number
    readonly required: boolean
    // eslint-disable-next-line camelcase
    readonly field_name: string // This should be camelCase format like any other param in the JWT
  }[]
}

export interface PresentationRequestPayload {
  readonly exp: number
  readonly nbf?: number
  readonly jti?: string
  readonly iat?: number
  readonly iss: string
  readonly cbu: string
  readonly pr: PresentationRequestPayloadPR
}
