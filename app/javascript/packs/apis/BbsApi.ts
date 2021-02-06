import { CommentInterface } from '../types/Comment'
import { ThreadInterface } from '../types/Thread'

class BbsApi {
  constructor(public url: string) {}

  // コメントを取得
  async fetchComments() {
    const response = await fetch(`/api/v1/bbs/comments?url=${this.url}`, {
      credentials: 'same-origin',
    })
    const json = await response.json()
    return json['comments'] as Array<CommentInterface>
  }

  // スレッド一覧を取得
  async fetchThreads() {
    const responseThreads = await fetch(`/api/v1/bbs/threads?url=${this.url}`, {
      credentials: 'same-origin',
    })
    return (await responseThreads.json()) as Array<ThreadInterface>
  }

  // 掲示板情報を取得
  async fetchBbs() {
    const responseBbs = await fetch(`/api/v1/bbs?url=${this.url}`, {
      credentials: 'same-origin',
    })
    return await responseBbs.json()
  }
}

export default BbsApi
