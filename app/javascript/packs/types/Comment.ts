export type CommentInterface = {
  no: number
  name: string
  mail: string
  writed_at: string
  body: string
}

class Comment {
  constructor(public json: CommentInterface) {}

  get no() {
    return this.json.no
  }

  get name() {
    return this.json.name
  }

  get mail() {
    return this.json.mail
  }

  get writed_at() {
    return this.json.writed_at
  }

  get body() {
    return this.json.body
  }
}

export default Comment
