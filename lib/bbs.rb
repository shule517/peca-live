class Bbs
  attr_reader :url

  SHITARABA_URL_REGEX = %r{\A(https?://jbbs.shitaraba.net/bbs/read.cgi/[a-z]+/\d+/\d+)}
  LIVEDOOR_URL_REGEX = %r{\A(https?://jbbs.livedoor.jp/bbs/read.cgi/[a-z]+/\d+/\d+)}
  JPNKN_URL_REGEX = %r{\Ahttps?://bbs.jpnkn.com/test/read.cgi/([a-zA-Z0-9]+)/(\d+)}

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

  private

  def fetch_shitaraba_comments
    client = HTTPClient.new
    res = client.get(dat_url)
    dat = res.body
    dat.each_line.map do |line|
      elements = line.split('<>')
      { no: elements[0].to_i, name: elements[1], mail: elements[2], writed_at: elements[3], body: elements[4].gsub('<br>', "\n") }
    end
  end

  def fetch_jpnkn_comments
    client = HTTPClient.new
    res = client.get(dat_url)
    dat = res.body
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

  def dat_url
    matches = SHITARABA_URL_REGEX.match(url)
    if matches.present?
      return matches[1].gsub('read.cgi', 'rawmode.cgi')
    end

    matches = LIVEDOOR_URL_REGEX.match(url)
    if matches.present?
      return matches[1].gsub('read.cgi', 'rawmode.cgi').gsub('jbbs.livedoor.jp', 'jbbs.shitaraba.net')
    end

    matches = JPNKN_URL_REGEX.match(url)
    if matches.present?
      return "https://bbs.jpnkn.com/#{matches[1]}/dat/#{matches[2]}.dat"
    end
  end
end
