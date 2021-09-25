import axios from 'axios'
import { UserModel } from "../../auth/models/UserModel"

let API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_SEARCH_USER = `${API_URL}/user/search`
export const GET_USER = `${API_URL}/user`
export const UPDATE_USER = `${API_URL}/user`
export const DELETE_USER = `${API_URL}/user`
export const ADD_USER = `${API_URL}/user/add`

export async function search(term: string) {
    if (term == null) {
        term = "";
    }
    return await axios.get(`${GET_SEARCH_USER}?term=${term}`)
}
export async function get(id: string) {
    return await axios.get(`${GET_USER}/${id}`)
}
export async function update(model: UserModel) {
    return await axios.put(`${UPDATE_USER}/${model.id}`, model)
}
export async function deletefunc(id: number) {
    return await axios.delete(`${DELETE_USER}/${id}`)
}
export async function add(model: UserModel) {
    return await axios.post(`${ADD_USER}`, model)
}