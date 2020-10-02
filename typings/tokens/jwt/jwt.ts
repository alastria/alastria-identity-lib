import { Header } from './artifacts/header'
import {
  AICPayload,
  AlastriaSessionPayload,
  AlastriaTokenPayload,
  CredentialPayload,
  PresentationPayload,
  PresentationRequestPayload
} from './artifacts/payloads'

export interface AIC {
  header: Header
  payload: AICPayload
}

export interface AlastriaSession {
  header: Headers
  payload: AlastriaSessionPayload
}

export interface AlastriaToken {
  header: Headers
  payload: AlastriaTokenPayload
}

export interface Credential {
  header: Headers
  payload: CredentialPayload
}

export interface Presentation {
  header: Headers
  payload: PresentationPayload
}

export interface PresentationRequest {
  header: Headers
  payload: PresentationRequestPayload
}
