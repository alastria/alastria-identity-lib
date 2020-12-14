import * as JWT from './'
import {
  CredentialSubject,
  PresentationRequestData
} from './artifacts/payloads'

export type CreateAICFn = (
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
) => JWT.AIC

export type CreateAlastriaSessionFn = (
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

export type CreateAlastriaTokenFn = (
  iss: string,
  gwu: string,
  cbu: string,
  ani: string,
  exp: number,
  kid: string,
  jwk?: string,
  nbf?: number,
  jti?: string
) => JWT.AlastriaToken

export type CreateCredentialFn = (
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
) => JWT.Credential

export type CreatePresentationFn = (
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
) => JWT.Presentation

export type CreatePresentationRequestFn = (
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
) => JWT.PresentationRequest
