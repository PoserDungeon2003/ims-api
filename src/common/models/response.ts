import {model, property} from '@loopback/repository'

export type BaseReponse = {
  message?: string
  object?: any
  success: number
}

@model({})
export class LoginRS {
  @property(String)
  token?: string

  @property(String)
  refreshToken?: string

  @property(String)
  id: string

  @property(String)
  name: string

  @property(String)
  email: string

  @property(String)
  image?: string

  @property.array(String)
  roles?: string[]
}
