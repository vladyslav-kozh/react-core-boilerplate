import MockAdapter from 'axios-mock-adapter'
import { UserModel } from '../../../app/core/auth/models/UserModel'
import {
  LOGIN_URL,
  GET_USER_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_URL,
} from '../../../app/core/auth/redux/AuthAPI'

import {
  GET_SEARCH_USER,
  GET_USER,
  ADD_USER
} from '../../../app/core/users/redux/UserAPI'
import { UsersMock, generateUserId } from './UsersMock'
import {parseQueryString} from '../../../app/Helpers'

export function mockAuth(mock: MockAdapter) {
  mock.onPost(LOGIN_URL).reply(({ data }) => {
    const { email, password } = JSON.parse(data)

    if (email && password) {
      const user = UsersMock.table.find(
        (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password
      )

      if (user) {
        const auth = user.auth
        return [200, { ...auth, password: undefined }]
      }
    }

    return [400]
  })

  mock.onPost(REGISTER_URL).reply(({ data }) => {
    const { email, firstname, lastname, password } = JSON.parse(data)

    if (email && firstname && lastname && password) {
      const user: UserModel = {
        id: generateUserId(),
        email,
        firstname,
        lastname,
        username: `${firstname}-${lastname}`,
        password,
        auth: {
          accessToken: 'token-' + Math.random(),
          refreshToken: 'token-' + Math.random(),
        },
      }

      UsersMock.table.push(user)
      const auth = user.auth

      return [200, { ...auth, password: undefined }]
    }

    return [400]
  })

  mock.onPost(REQUEST_PASSWORD_URL).reply(({ data }) => {
    const { email } = JSON.parse(data)

    if (email) {
      const user = UsersMock.table.find((x) => x.email.toLowerCase() === email.toLowerCase())
      let result = false
      if (user) {
        user.password = undefined
        result = true
        return [200, { result, password: undefined }]
      }
    }

    return [400]
  })

  mock.onGet(GET_USER).reply(({ headers: { Authorization } }) => {
    const accessToken =
      Authorization && Authorization.startsWith('Bearer ') && Authorization.slice('Bearer '.length)

    if (accessToken) {
      const grid = UsersMock.table.find((x) => x.email === "admin@admin.com")
      if (grid) {
        return [200, { ...grid, password: undefined }]
      }
    }
    return [401]
  })


  mock.onGet(GET_USER_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
      Authorization && Authorization.startsWith('Bearer ') && Authorization.slice('Bearer '.length)

    if (accessToken) {
      const user = UsersMock.table.find((x) => x.auth?.accessToken === accessToken)
      if (user) {
        return [200, { ...user, password: undefined }]
      }
    }
    return [401]
  })

  mock.onGet(/user\/search\/?.*/).reply((data) => {
    let term = parseQueryString(data.url, "term")
    const items = UsersMock.table.filter((x) => (x.firstname.includes(term) || x.lastname.includes(term)))
    return [200., items]
  })

  mock.onPost(ADD_USER).reply(({ data }) => {
    const { firstname, lastname } = JSON.parse(data)

    const user: UserModel = {
      id: generateUserId(),
      email: "email@email.com",
      firstname: firstname,
      lastname: lastname,
      username: `${firstname}-${lastname}`,
      password: Math.random().toString(),
      auth: {
        accessToken: 'token-' + Math.random(),
        refreshToken: 'token-' + Math.random(),
      },
    }
    return [200., user]
  })


  mock.onPut(/\/user\/\d+/).reply(({ data }) => {
    const { id, firstname, lastname } = JSON.parse(data)
    const item = UsersMock.table.find(x => x.id === parseInt(id))

    if (item) {
      item.firstname = firstname
      item.lastname = lastname
    }
    return [200, item];
  });

  const DeleteRegex = new RegExp(/user\/?.*/);
  mock.onDelete(DeleteRegex).reply((config) => {
    return [200, []];
  });

  const pathRegex = new RegExp(`${GET_SEARCH_USER}?term=?.*`)

  mock.onGet(pathRegex).reply(({ headers: { Authorization } }) => {
    return [200., UsersMock.table]
  })

}
