namespace :peercast_station do
  desc "実行処理の説明"
  task get_channels: :environment do
    peca_tip = 'http://150.95.177.111:7144'
    api = JsonRpc.new("#{peca_tip}/api/1")

    channels = api.update_yp_channels

    channels = channels.select { |channel| channel['channelId'] != '00000000000000000000000000000000' && channel['contentType'] == 'FLV' }

    channels.each do |channel|
      channel_id = channel['channelId']
      tip = channel['tracker']
      name = channel['name']
      dump_command = "rtmpdump -r \"#{peca_tip}/pls/#{channel_id}?tip=#{tip}\" -o \"channels/#{name}.flv\""
      puts dump_command

      pp channel
      # dump開始！！
      pid = spawn(dump_command, :pgroup => true)  # :pgroup => trueを追加
      sleep(10)
      Process.kill(:TERM, -pid)        # -pidに変更
      # TODO: 0バイトファイルの場合は消す？
    rescue => e
      puts "error!!!!!!!!!!!!!!!"
      pp error: e
    end
    # rtmpdump -r "http://localhost:7144/pls/B9EFEA63DC4B2C38ED83BEB3F60BAFE7?tip=219.117.192.180:7144" -o B9EFEA63DC4B2C38ED83BEB3F60BAFE7.flv

    pp channnels: channels.map { |channel| channel['name'] }.join('、')
    pp channnel_size: channels.size
  end
end
