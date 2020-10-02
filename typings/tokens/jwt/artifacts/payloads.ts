export interface AICPayload {
  exp?: number
  nbf?: number
  jti?: string
  iat?: number
  context: string[]
  type: string[]
  createAlastriaTX: string
  alastriaToken: string
  publicKey: string
}

export interface AlastriaSessionPayload {
  exp?: number
  nbf?: number
  jti?: string
  iat?: number
  iss: string
  context: string[]
  type: string[]
  alastriaToken: string
}

export interface AlastriaTokenPayload {
  exp: number
  nbf?: number
  jti?: string
  iat?: number
  iss: string
  gwu: string
  cbu: string
  ani: string
}

export interface CredentialPayload {
  exp: number
  nbf?: number
  jti?: string
  iat?: number
  iss: string
  sub: string
  vc: {
    context: string[]
    type: string[]
    credentialSubject: {
      levelOfAssurance: number
      [propName: string]: any // Any other property
    }
  }
}

interface PresentationBase {
  context: string[]
  type: string[]
  procHash: string
  procUrl: string
}

interface PresentationPayloadVP extends PresentationBase {
  verifiableCredential: string[]
}

export interface PresentationPayload {
  exp: number
  nbf?: number
  jti?: string
  iat?: number
  iss: string
  aud: string
  vp: PresentationPayloadVP
}

interface PresentationRequestPayloadPR extends PresentationBase {
  data: {
    context: string[]
    levelOfAssurance: number
    required: boolean
    // eslint-disable-next-line camelcase
    field_name: string // This should be camelCase format like any other param in the JWT
  }[]
}

export interface PresentationRequestPayload {
  exp: number
  nbf?: number
  jti?: string
  iat?: number
  iss: string
  cbu: string
  pr: PresentationRequestPayloadPR
}

/*
 _._     _,-'""`-._         -----------
(,-.`._,'(       |\`-/|     |  MIAU!  |
    `-.-' \ )-`( , o o)   < -----------
          `-    \`_`"'- 
*/
