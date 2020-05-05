export type FavoriteInterface = {
  id: number // 1
  channel_name: string // しっかりシュールｃｈ"
}

class Favorite {
  constructor(public json: FavoriteInterface) {}

  get id() {
    return this.json.id
  }

  get channelName() {
    return this.json.channel_name
  }
}

export default Favorite
