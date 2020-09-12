class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :ensure_domain

  def ensure_domain
    url = request.url
            .gsub('https://', 'http://')                  # httpsからのアクセスをhtttpへredirect（PeerCastとHTTP通信ができないため）
            .gsub('peca-live.herokuapp.com', 'peca.live') # herokuapp.comからアクセスされたら、peca.liveへredirect
            .gsub('www.peca.live', 'peca.live')           # www.peca.liveからアクセスされたら、peca.liveへredirect

    unless request.url == url
      redirect_to url
    end
  end
end
