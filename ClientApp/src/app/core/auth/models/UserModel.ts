import {AuthModel} from './AuthModel'

export interface UserModel {
  id: number
  firstname: string
  lastname: string
  username: string
  password: string | undefined
  email: string
  auth?: AuthModel
}

  