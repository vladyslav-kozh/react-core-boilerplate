import axios from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_URL = `${API_URL}/auth/user`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`

export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {email, password})
}

export function register(email: string, firstname: string, lastname: string, password: string) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  })
}

export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}

export function getUser() {
  return axios.get<UserModel>(GET_USER_URL)
}
