class NotificationPush
  AUTH_KEY = 'AAAAsPFBcrY:APA91bGKNFqaPRhwd8BroEdWIbeAXMfnu6Aibicl3CUmBKDM29SmCKeIrq_f3Y3RpUUWJEbsWUzvcbwJOij9E_BGBMFEj0dcsoG3ews_dCcRoFikoDg2OJQTk3xuIA2hJoWIWjp6SExC'

  def notify(title:, body: nil, url: nil, send_to:, icon: 'pecalive.png', badge: 'favicon.png')
    data = {
        data: {
            title: title,
            body: body,
            icon: icon,
            badge: badge,
            url: url,
        },
        to: send_to,
    }
    `curl -X POST -H "Authorization: key=#{AUTH_KEY}" -H "Content-Type: application/json" -d '#{data.to_json}' "https://fcm.googleapis.com/fcm/send"`
  end

  def notify_broadcasting(channel)
    channel_name = channel['name']

    # お気に入り登録してるユーザーにPush通知する
    send_tos = Favorite.where(channel_name: channel_name).flat_map { |favorite| favorite.user.devices.pluck(:token) }

    link_url = "http://peca.live/channels/#{channel['channelId']}"
    channel_detail = channel['genre']
    description = channel['description'].gsub(' - <Open>', '').gsub('<Open>', '').gsub(' - <Free>', '').gsub('<Free>', '').gsub(' - <2M Over>', '').gsub('<2M Over>', '').gsub(' - <Over>', '').gsub('<Over>', '')
    channel_detail += ' - ' if channel_detail.present? && description.present?
    channel_detail += description

    send_tos.each do |send_to|
      NotificationPush.new.notify(title: "#{channel_name} の 配信がはじまった！", body: channel_detail, url: link_url, send_to: send_to)
    end
  end
end
