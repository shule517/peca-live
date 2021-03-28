namespace :peercast_station do
  desc "実行処理の説明"
  task get_channels: :environment do
    peca_tip = 'http://183.77.53.238:8144'
    api = JsonRpc.new("#{peca_tip}/api/1", ENV['PEERCAST_BASIC_TOKEN'])

    channels = api.update_yp_channels

    channels = channels.select { |channel| channel['channelId'] != '00000000000000000000000000000000' && channel['contentType'] == 'FLV' }

    channels.each do |channel|
      channel_id = channel['channelId']
      tip = channel['tracker']
      name = channel['name']
      flv_file_name = "channels/#{name}.flv"
      mp4_file_name = "channels/#{name}.mp4"
      dump_command = "rtmpdump -r \"#{peca_tip}/pls/#{channel_id}?tip=#{tip}\" -o \"#{flv_file_name}\""
      puts dump_command

      pp channel
      # dump開始！！
      pid = spawn(dump_command, :pgroup => true)  # :pgroup => trueを追加
      sleep(10)
      Process.kill(:TERM, -pid)        # -pidに変更
      # TODO: 0バイトファイルの場合は消す？

      a = `ffmpeg -i "#{flv_file_name}" "#{mp4_file_name}"`
      puts a

      Cloudinary::Uploader.upload(mp4_file_name, :public_id => channel_id, :overwrite => true, :notification_url => "https://mysite.example.com/notify_endpoint", :resource_type => "video")
      # Cloudinary::Uploader.upload(file_name, :public_id => channel_id, :overwrite => true, :notification_url => "https://mysite.example.com/notify_endpoint", :resource_type => "video")
    rescue => e
      puts "error!!!!!!!!!!!!!!!"
      pp error: e
    end
    # rtmpdump -r "http://localhost:7144/pls/B9EFEA63DC4B2C38ED83BEB3F60BAFE7?tip=219.117.192.180:7144" -o B9EFEA63DC4B2C38ED83BEB3F60BAFE7.flv

    pp channnels: channels.map { |channel| channel['name'] }.join('、')
    pp channnel_size: channels.size
  end
end
