import {UserModel} from '../../../app/core/auth/models/UserModel'


export const generateUserId = (): number => {
  const ids = UsersMock.table.map((el) => el.id)
  const maxId = Math.max(...ids)
  return maxId + 1
}

export class UsersMock {

  public static newUser = (firstname:string = "", lastname:string = ""): UserModel =>
  {
    const user: UserModel = {
      id: generateUserId(),
      email: "email@email.com",
      firstname: firstname,
      lastname: lastname,
      username: `${firstname}-${lastname}`,
      password:  Math.random().toString(),
      auth: {
        accessToken: 'token-' + Math.random(),
        refreshToken: 'token-' + Math.random(),
      },
    }
    return user
  }
  public static table: Array<UserModel> = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      email: 'admin@admin.com',
      auth: {
        accessToken: 'token-983455f1-c519-457a-8ed3-979bb0292b0c',
        refreshToken: 'token-d3472c7c-b415-4a04-bdb9-c4b31d8f64a9',
      },
      firstname: 'Amanda',
      lastname: 'Glenn'
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      email: 'user@user.com',
      auth: {
        accessToken: 'token-407575a2-5934-4470-a570-c029ca5a38ad',
        refreshToken: 'token-5f31b591-e150-4c7c-8cfa-1a09a6ef9a82',
      },
      firstname: 'Pamela',
      lastname: 'Chambers',
    },
    {
      id: 3,
      username: 'sarah',
      password: 'sarah',
      email: 'sarah@user.com',
      auth: {
        accessToken: 'token-0e1059ab-f6ee-43f2-b780-a6a9b83d74b9',
        refreshToken: 'token-fcad5157-0dc4-4f61-b82c-48ec881da7cf',
      },
      firstname: 'Sarah',
      lastname: 'Lindsay',
    },
  ]
}
