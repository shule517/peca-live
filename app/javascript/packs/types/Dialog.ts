export type DialogInterface = {
  currentAboutPage: number
}

class Dialog {
  static CurrentAboutVersion = '3' // 「ぺからいぶ！とは」のバージョン。変更すると初回だけダイアログを表示する

  constructor(public json: DialogInterface) {}

  get currentAboutPage() {
    return this.json.currentAboutPage
  }
}

export default Dialog
