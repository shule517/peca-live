export type ThreadInterface = {
  no: number
  title: string
  comments_size: string
}

class Thread {
  constructor(public json: ThreadInterface) {}

  get no() {
    return this.json.no
  }

  get title() {
    return this.json.title
  }

  get commentsSize() {
    return this.json.comments_size
  }
}

export default Thread
