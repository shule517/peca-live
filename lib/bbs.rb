class Bbs
  attr_reader :url

  SHITARABA_URLREX = %r{\Ahttp://jbbs.shitaraba.net/bbs/read.cgi/([a-z]+)/(\d+)/(\d+)/\z}

  def initialize(url)
    @url = url
  end

  def fetch_comments
    client = HTTPClient.new
    res = client.get(dat_url)
    dat = res.body
    result = dat.each_line.map.with_index(1) do |line, index|
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
