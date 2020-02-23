export type UserInterface = {
  uid: string
  displayName: string
  photoURL: string
}

class User {
  constructor(public json: UserInterface) {}

  get uid() {
    return this.json.uid
  }

  get displayName() {
    return this.json.displayName
  }

  get photoURL() {
    return this.json.photoURL
  }

  get isLogin() {
    return !!this.json.uid
  }
}

export default User
