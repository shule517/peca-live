class Bbs
  attr_reader :url

  SHITARABA_URL_REGEX = %r{\Ahttps?://jbbs\.shitaraba\.net/bbs/read\.cgi/([a-z]+)/(\d+)/(\d+)}
  LIVEDOOR_URL_REGEX = %r{\Ahttps?://jbbs\.livedoor\.jp/bbs/read\.cgi/([a-z]+)/(\d+)/(\d+)}
  JPNKN_URL_REGEX = %r{\Ahttps?://bbs\.jpnkn\.com/test/read\.cgi/([a-zA-Z0-9]+)/(\d+)}
  JPNKN_BORAD_URL_REGEX = %r{\Ahttps?://bbs\.jpnkn\.com/([a-zA-Z0-9]+)}

  def initialize(url)
    @url = url
  end

  def fetch_comments
    if shitaraba?
      fetch_shitaraba_comments
    elsif jpnkn?
      fetch_jpnkn_comments
    else
      []
    end
  end

  def fetch_board
    client = HTTPClient.new
    res = client.get(board_url)
    html = NKF.nkf("-e",res.body)
    doc = Nokogiri::HTML.parse(html)

    top_image_url = doc.css('div > img').first.attributes["src"].value
    { top_image_url: top_image_url, title: doc.title }
  end

  private

  def parse_web_code(text)
    text.gsub('&amp;', '&').gsub('&lt;', '<').gsub('&gt;', '>')
  end

  def fetch_shitaraba_comments
    client = HTTPClient.new
    res = client.get(dat_url)
    dat = parse_web_code(res.body)
    dat.each_line.map do |line|
      elements = line.split('<>')
      { no: elements[0].to_i, name: elements[1], mail: elements[2], writed_at: elements[3], body: elements[4].gsub('<br>', "\n") }
    end
  end

  def fetch_jpnkn_comments
    client = HTTPClient.new
    res = client.get(dat_url)
    dat = parse_web_code(res.body)
    dat.each_line.map.with_index(1) do |line, index|
      elements = line.split('<>')
      { no: index, name: elements[0], mail: elements[1], writed_at: elements[2], body: elements[3].gsub('<br>', "\n") }
    end
  end

  def shitaraba?
    SHITARABA_URL_REGEX.match?(url) || LIVEDOOR_URL_REGEX.match?(url)
  end

  def jpnkn?
    JPNKN_URL_REGEX.match?(url)
  end

  def threads_url
    "#{board_url}subject.txt" if board_url.present?
  end

  def dat_url
    matches = SHITARABA_URL_REGEX.match(url)
    if matches.present?
      return "http://jbbs.shitaraba.net/bbs/rawmode.cgi/#{matches[1]}/#{matches[2]}/#{matches[3]}/"
    end

    matches = LIVEDOOR_URL_REGEX.match(url)
    if matches.present?
      return "http://jbbs.shitaraba.net/bbs/rawmode.cgi/#{matches[1]}/#{matches[2]}/#{matches[3]}/"
    end

    matches = JPNKN_URL_REGEX.match(url)
    if matches.present?
      return "https://bbs.jpnkn.com/#{matches[1]}/dat/#{matches[2]}.dat"
    end
  end

  def board_url
    matches = SHITARABA_URL_REGEX.match(url)
    if matches.present?
      return "https://jbbs.shitaraba.net/#{matches[1]}/#{matches[2]}/"
    end

    matches = LIVEDOOR_URL_REGEX.match(url)
    if matches.present?
      return "https://jbbs.shitaraba.net/#{matches[1]}/#{matches[2]}/"
    end

    matches = JPNKN_URL_REGEX.match(url)
    if matches.present?
      return "http://bbs.jpnkn.com/#{matches[1]}/"
    end

    matches = JPNKN_BORAD_URL_REGEX.match(url)
    if matches.present?
      return "http://bbs.jpnkn.com/#{matches[1]}/"
    end
  end
end
