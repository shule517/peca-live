class Bbs
  attr_reader :url

  SHITARABA_URLREX = %r{\Ahttp://jbbs.shitaraba.net/bbs/read.cgi/([a-z]+)/(\d+)/(\d+)/\z}

  def initialize(url)
    @url = url
  end

  def fetch_comments
    dat = <<~TEXT
      名無し＠BBSさん<>sage<>2020/02/24(月) 20:55:18<>したらば繋がらないのでこっちにきた！ ぺからいぶ！を作る！<>しっかりシュールｃｈ - 避難所
      名無し＠BBSさん<>sage<>2020/02/24(月) 21:03:41<>てすと<>
      名無し＠BBSさん<><>2020/02/24(月) 21:31:27<>あー<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:08:37<>イケメンシュールくん<br> ｷﾃﾀ━━━━(ﾟ∀ﾟ)━━━━!!<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:10:48<>超高速納期対応配信<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:15:42<>急げｗｗｗ<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:20:44<>　 ∧∧　糞実装上等ｗ<br> 　(д´*)<br> 　(⊃⌒*⌒⊂)<br> 　 /_ノωヽ_)<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:21:56<>うっかりシュールにならないでね<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:26:04<>後５分よ<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:29:26<>納期までまだ１秒余裕があるわ<>
      名無し＠BBSさん<>sage<>2020/02/24(月) 22:31:29<>ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!<>
    TEXT

    dat.each_line.map.with_index(1) do |line, index|
      elements = line.split('<>')
      { no: index, name: elements[0], mail: elements[1], writed_at: elements[2], body: elements[3] }
    end
  end

  def shitaraba?
    SHITARABA_URLREX.match?(url)
  end

  private

  def dat_url
    matches = SHITARABA_URLREX.match(url)
    if matches.present?
      dat_url = url.gsub('read.cgi', 'rawmode.cgi')
      "#{dat_url}l10"
    end
  end

  def jpnkn?
    false
  end
end
