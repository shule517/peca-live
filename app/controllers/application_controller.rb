class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :ensure_domain

  def ensure_domain
    if request.protocol == 'https://'
      # httpsからのアクセスをhtttpへredirect（PeerCastとHTTP通信ができないため）
      # herokuapp.comからアクセスされたら、peca.liveへredirect
      url = request.url.gsub('https://', 'http://').gsub('peca-live.herokuapp.com', 'peca.live')
      redirect_to url
    end
  end
end
