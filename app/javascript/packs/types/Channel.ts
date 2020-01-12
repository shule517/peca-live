class Channel {
  constructor(
    public name: string,           // A.ch
    public streamId: string,       // 0C1A6C6959CEB2A8BF9598BC9185FF32
    public tip: string,            // 14.13.42.64:5184
    public contactUrl: string,     // http://jbbs.shitaraba.net/bbs/read.cgi/game/52685/1567349533/
    public genre: string,          // PS4
    public details: string,        // モンスターハンターワールド：アイスボーン MHWIB - &lt;Open&gt;
    public listenerCount: number,  // -1
    public relayCount: number,     // -1
    public bitrate: number,        // 1500
    public type: string,           // FLV
    public album: string,
    public comment: string,
    public creator: string,
    public trackTitle: string,
    public trackUrl: string,
    public uptime: number,
    public yellowPage: string){}

  static nullObject(name) {
    return new Channel(name, "", "", "", "", "", -1, -1, -1, "", "", "", "", "", "", -1, "")
  }

  get startingTime() {
    const minutes = this.uptime / 60;
    if (minutes > 60) {
      const hours = minutes / 60;

      if (hours < 24) {
        return `${Math.round(hours)}時間前`;
      } else {
        const days = hours / 24;
        return `${Math.round(days)}日前`;
      }
    } else {
      return `${minutes}分前`;
    }
  }

  get isFlv() {
    return this.type === 'FLV';
  }

  get isWmv() {
    return this.type === 'WMV';
  }

  get compact_genre() {
    return this.genre.replace(/game/gi, ''); // ジャンルの「game」には情報量がないので省略。
  }

  get compact_details() {
    return this.compact_genre + this.details_label;
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
      .replace('<Over>', '');

    if (this.comment.length) {
      return `${label} ${this.comment}`;
    } else {
      return label;
    }
  }

  get explanation() {
    const details = this.unescapeHTML(this.details_label) || '';

    let text = '';
    if (this.genre.length) {
      text = this.genre.replace(/[　 ]+/, '');

      if (text.length && details.length) {
        text += ' - ';
      }
    }

    if (details.length) {
      text += details;
    }
    return text;
  }

  unescapeHTML(html: string) {
    return html.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, '\'');
  }
}

export default Channel;
