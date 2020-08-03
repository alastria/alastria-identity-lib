export interface PublicKeyStatus {
  exists: boolean
  status: number
  startDate: number
  endDate: number
}

export interface JwtToken {
  header: object
  payload: object
}
