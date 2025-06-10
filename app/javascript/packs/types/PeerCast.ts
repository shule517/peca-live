export type PeerCastInterface = {
  host: string
  portNo: number
}

class PeerCast {
  static defaultHost = '150.9.157.144' // shule.peca.live
  static defaultPortNo = 8144

  constructor(public json: PeerCastInterface) {}

  get host() {
    return this.json.host
  }

  get portNo() {
    return this.json.portNo
  }

  get tip() {
    return `${this.host}:${this.portNo}`
  }
}

export default PeerCast
