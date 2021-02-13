require 'nkf'

class Bbs
  attr_reader :url

  SHITARABA_URL_REGEX = %r{\Ahttps?://jbbs\.shitaraba\.net/bbs/read\.cgi/([a-z]+)/(\d+)/(\d+)}
  LIVEDOOR_URL_REGEX = %r{\Ahttps?://jbbs\.livedoor\.jp/bbs/read\.cgi/([a-z]+)/(\d+)/(\d+)}
  SHITARABA_BOARD_URL_REGEX = %r{\Ahttps?://jbbs\.shitaraba\.net/([a-z]+)/(\d+)}
  LIVEDOOR_BOARD_URL_REGEX = %r{\Ahttps?://jbbs\.livedoor\.jp/([a-z]+)/(\d+)}

  JPNKN_URL_REGEX = %r{\Ahttps?://bbs\.jpnkn\.com/test/read\.cgi/([a-zA-Z0-9]+)/(\d+)}
  JPNKN_BORAD_URL_REGEX = %r{\Ahttps?://bbs\.jpnkn\.com/([a-zA-Z0-9]+)}

  def initialize(url)
    @url = url
  end

  def fetch_threads
    return [] if threads_url.blank?

    if shitaraba?
      fetch_shitaraba_threads
    elsif jpnkn?
      fetch_jpnkn_threads
    else
      []
    end
  end

  def fetch_comments
    non_support_response = { thread_title: nil, comments: [], comment_count: 0 }
    return non_support_response if dat_url.blank?

    if shitaraba?
      fetch_shitaraba_comments
    elsif jpnkn?
      fetch_jpnkn_comments
    else
      non_support_response
    end
  end

  def fetch_board
    return { top_image_url: nil, title: nil } if board_url.blank?

    html = fetch(board_url, '-e')
    doc = Nokogiri::HTML.parse(html)

    img = doc.css('div > img').first
    top_image_url = img.attributes["src"].value if img.present?
    { top_image_url: top_image_url, title: doc.title }
  end

  private

  def fetch_shitaraba_comments
    dat = fetch(dat_url, '-w')
    return [] if dat.include?('指定されたページまたはファイルは存在しません') # アーカイブされていてdatが見れない

    thread_title = nil
    comments = dat.each_line.map.with_index do |line, index|
      elements = line.split('<>').map { |element| parse_web_code(element)}
      thread_title = elements[5] if index == 0
      { no: elements[0].to_i, name: elements[1], mail: elements[2], writed_at: elements[3], body: elements[4].gsub('<br>', "\n") }
    end

    { thread_title: thread_title, comments: comments.reverse.first(30), comment_count: comments.last[:no] }
  end

  def fetch_jpnkn_comments
    dat = fetch(dat_url, '-w')
    return { thread_title: nil, comments: [], comment_count: 0 } if dat.blank?

    thread_title = nil
    comments = dat.each_line.map.with_index(1) do |line, index|
      elements = line.chop.split('<>').map { |element| parse_web_code(element)}
      thread_title = elements[4] if index == 1
      { no: index, name: elements[0], mail: elements[1], writed_at: elements[2], body: elements[3]&.gsub('<br>', "\n") }
    end

    { thread_title: thread_title, comments: comments.reverse.first(30), comment_count: comments.last[:no] }
  end

  def fetch_shitaraba_threads
    subject = fetch(threads_url, '-w')
    threads = subject.each_line.map do |line|
      elements = line.split(',').map { |element| parse_web_code(element)}

      # スレッド番号の取得
      no_matches = /\A(.*)\.cgi\z/.match(elements[0])
      no = no_matches[1] if no_matches.present?

      # タイトル＋レス数の取得
      matches = /\A(.*)\(([0-9]+)\)\n\z/.match(elements[1])
      if matches.present?
        title = matches[1]
        comments_size = matches[2]&.to_i
      end

      { no: no, url: thread_url(no), title: title, comments_size: comments_size }
    end

    threads.first(threads.size - 1) # 最終行の情報は最新スレ。重複した情報なので外す。
  end

  def fetch_jpnkn_threads
    # 1600986660.dat<>title&lt;&gt;dayo(9999) (1) (1)
    subject = fetch(threads_url, '-w')
    subject.each_line.map do |line|
      elements = line.split('<>').map { |element| parse_web_code(element)}

      # スレッド番号の取得
      no_matches = /\A(.*)\.dat\z/.match(elements[0])
      no = no_matches[1] if no_matches.present?

      # タイトル＋レス数の取得
      matches = /\A(.*) \(([0-9]+)\)\n\z/.match(elements[1])
      if matches.present?
        title = matches[1]
        comments_size = matches[2]&.to_i
      end

      { no: no, url: thread_url(no), title: title, comments_size: comments_size }
    end
  end

  def shitaraba?
    [SHITARABA_URL_REGEX, LIVEDOOR_URL_REGEX, SHITARABA_BOARD_URL_REGEX, LIVEDOOR_BOARD_URL_REGEX].any? { |regex| regex.match?(url) }
  end

  def jpnkn?
    [JPNKN_URL_REGEX, JPNKN_BORAD_URL_REGEX].any? { |regex| regex.match?(url) }
  end

  def dat_url
    # したらば
    matches = extract_shitaraba_url
    if matches.present? && matches.size == 4
      return "https://jbbs.shitaraba.net/bbs/rawmode.cgi/#{matches[1]}/#{matches[2]}/#{matches[3]}/"
    end

    # jpnkn
    matches = extract_jpnkn_url
    if matches.present? && matches.size == 3
      return "https://bbs.jpnkn.com/#{matches[1]}/dat/#{matches[2]}.dat"
    end
  end

  def thread_url(thread_no)
    # したらば
    matches = extract_shitaraba_url
    if matches.present?
      return "https://jbbs.shitaraba.net/bbs/read.cgi/#{matches[1]}/#{matches[2]}/#{thread_no}/"
    end

    # jpnkn
    matches = extract_jpnkn_url
    if matches.present?
      return "https://bbs.jpnkn.com/test/read.cgi/#{matches[1]}/#{thread_no}/"
    end
  end

  def threads_url
    "#{board_url}subject.txt" if board_url.present?
  end

  def extract_shitaraba_url
    # したらば
    regexs = [SHITARABA_URL_REGEX, LIVEDOOR_URL_REGEX, SHITARABA_BOARD_URL_REGEX, LIVEDOOR_BOARD_URL_REGEX]
    regexs.each do |regex|
      matches = regex.match(url)
      return matches if matches.present?
    end
    nil
  end

  def extract_jpnkn_url
    # JPNKN
    regexs = [JPNKN_URL_REGEX, JPNKN_BORAD_URL_REGEX]
    regexs.each do |regex|
      matches = regex.match(url)
      return matches if matches.present?
    end
    nil
  end

  def board_url
    # したらば
    matches = extract_shitaraba_url
    if matches.present?
      return "https://jbbs.shitaraba.net/#{matches[1]}/#{matches[2]}/"
    end

    # JPNKN
    matches = extract_jpnkn_url
    if matches.present?
      return "http://bbs.jpnkn.com/#{matches[1]}/"
    end
  end

  def parse_web_code(text)
    result = text.gsub('&amp;', '&')
        .gsub('&lt;', '<')
        .gsub('&gt;', '>')
        .gsub('&quot;', '"')
        .gsub('&#39;', '\'')
        .gsub('&nbsp;', ' ')

    # &#65374; → 〜 に変換
    result.scan(/&#([0-9]+);/).flatten.each do |char_code|
      result.gsub!("&##{char_code};", char_code.to_i.chr)
    rescue Encoding::CompatibilityError
      # 対応できないエンコードのエラーは無視する
    end
    result
  end

  def fetch(url, charset_nkf_option)
    # '-e' -> EUC-JP
    # '-w' -> UTF-8
    client = HTTPClient.new
    body = client.get(url).body
    NKF.nkf(charset_nkf_option, body)
  end
end
