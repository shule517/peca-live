class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :ensure_domain

  def ensure_domain
    unless request.url == to_valid_url
      redirect_to to_valid_url
    end
  end

  def to_valid_url
    request.url
      .gsub('https://', 'http://')                  # httpsからのアクセスをhtttpへredirect（PeerCastとHTTP通信ができないため）
      .gsub('peca-live.herokuapp.com', 'peca.live') # herokuapp.comからアクセスされたら、peca.liveへredirect
      .gsub('www.peca.live', 'peca.live')           # www.peca.liveからアクセスされたら、peca.liveへredirect
  end
end
