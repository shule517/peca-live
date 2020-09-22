class Bbs
  attr_reader :url

  SHITARABA_URLREX = %r{\A(https?://jbbs.shitaraba.net/bbs/read.cgi/[a-z]+/\d+/\d+)}

  def initialize(url)
    @url = url
  end

  def fetch_comments
    client = HTTPClient.new
    res = client.get(dat_url)
    dat = res.body
    dat.each_line.map.with_index(1) do |line, index|
      elements = line.split('<>')
      { no: elements[0], name: elements[1], mail: elements[2], writed_at: elements[3], body: elements[4] }
    end
  end

  def shitaraba?
    SHITARABA_URLREX.match?(url)
  end

  private

  def dat_url
    matches = SHITARABA_URLREX.match(url)
    if matches.present?
      dat_url = matches[1].gsub('read.cgi', 'rawmode.cgi')
      "#{dat_url}/l10"
    end
  end

  def jpnkn?
    false
  end
end
