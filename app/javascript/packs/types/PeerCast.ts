export type PeerCastInterface = {
  host: string
  portNo: number
}

class PeerCast {
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
