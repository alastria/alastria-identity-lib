import { Json } from "jsontokens";

export interface PublicKeyStatus {
  exists: boolean
  status: number
  startDate: number
  endDate: number
}

export interface JwtToken {
  header: Json
  payload: Json
}
