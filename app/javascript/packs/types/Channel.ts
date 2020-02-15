export type ChannelInterface = {
  name: string // A.ch
  channelId: string // 0C1A6C6959CEB2A8BF9598BC9185FF32
  tracker: string // 14.13.42.64:5184
  contactUrl: string // http://jbbs.shitaraba.net/bbs/read.cgi/game/52685/1567349533/
  genre: string // PS4
  description: string // モンスターハンターワールド：アイスボーン MHWIB - &lt;Open&gt;
  listeners: number // -1
  relays: number // -1
  bitrate: number // 1500
  contentType: string // FLV
  album: string
  comment: string
  creator: string
  trackTitle: string
  trackUrl: string
  uptime: number
  yellowPage: string
}

class Channel {
  constructor(public json: ChannelInterface) {}

  get name() {
    return this.json.name
  }

  get streamId() {
    return this.json.channelId
  }

  get tip() {
    return this.json.tracker
  }

  get contactUrl() {
    return this.json.contactUrl
  }

  get genre() {
    return this.json.genre
  }

  get details(): string {
    return this.json.description
  }

  get listenerCount() {
    return this.json.listeners
  }

  get relayCount() {
    return this.json.relays
  }

  get bitrate() {
    return this.json.bitrate
  }

  get type() {
    return this.json.contentType
  }

  get album() {
    return this.json.album
  }

  get comment() {
    return this.json.comment
  }

  get creator() {
    return this.json.creator
  }

  get trackTitle() {
    return this.json.trackTitle
  }

  get trackUrl() {
    return this.json.trackUrl
  }

  get uptime() {
    return this.json.uptime
  }

  get yellowPage() {
    return this.json.yellowPage
  }

  static nullObject(name) {
    return new Channel({
      yellowPage: '',
      name: name,
      channelId: '',
      tracker: '',
      contactUrl: '',
      genre: '',
      description: '',
      comment: '',
      bitrate: 0,
      contentType: '',
      trackTitle: '',
      album: '',
      creator: '',
      trackUrl: '',
      listeners: -1,
      relays: -1,
      uptime: 0
    })
  }

  get startingTime() {
    const minutes = this.uptime / 60
    if (minutes > 60) {
      const hours = minutes / 60

      if (hours < 24) {
        return `${Math.round(hours)}時間前`
      } else {
        const days = hours / 24
        return `${Math.round(days)}日前`
      }
    } else {
      return `${minutes}分前`
    }
  }

  get isFlv() {
    return this.type === 'FLV'
  }

  get isWmv() {
    return this.type === 'WMV'
  }

  get compact_genre() {
    return this.genre.replace(/game[　 ]*/gi, '') // ジャンルの「game」には情報量がないので省略。
  }

  get compact_details() {
    return this.compact_genre + this.details_label
  }

  get details_label() {
    const label = this.details
      .replace(' - <Open>', '')
      .replace('<Open>', '')
      .replace(' - <Free>', '')
      .replace('<Free>', '')
      .replace(' - <2M Over>', '')
      .replace('<2M Over>', '')
      .replace(' - <Over>', '')
      .replace('<Over>', '')

    if (this.comment.length) {
      return `${label} ${this.comment}`
    } else {
      return label
    }
  }

  get explanation() {
    const details = this.unescapeHTML(this.details_label) || ''

    let text = ''
    if (this.genre.length) {
      text = this.genre

      if (text.length && details.length) {
        text += ' - '
      }
    }

    if (details.length) {
      text += details
    }
    return text
  }

  unescapeHTML(html: string) {
    return html
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
  }
}

export default Channel
