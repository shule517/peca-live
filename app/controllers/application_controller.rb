class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :ensure_domain

  def ensure_domain
    url = request.url.gsub('https://', 'http://').gsub('peca-live.herokuapp.com', 'peca.live').gsub('www.peca.live', 'peca.live')
    unless request.url == url
      # httpsからのアクセスをhtttpへredirect（PeerCastとHTTP通信ができないため）
      # herokuapp.comからアクセスされたら、peca.liveへredirect
      # www.peca.liveからアクセスされたら、peca.liveへredirect
      redirect_to url
    end
  end
end
