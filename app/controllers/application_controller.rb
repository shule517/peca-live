class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :ensure_domain

  def ensure_domain
    url = request.url.gsub('https://', 'http://').gsub('peca-live.herokuapp.com', 'peca.live')
    unless request.url == url
      # httpsからのアクセスをhtttpへredirect（PeerCastとHTTP通信ができないため）
      # herokuapp.comからアクセスされたら、peca.liveへredirect
      redirect_to url, status: :moved_permanently # 永続的なリダイレクト
    end
  end
end
