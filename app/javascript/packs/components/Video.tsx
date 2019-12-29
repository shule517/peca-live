import React, { useEffect } from 'react';
import flvjs from 'flv.js'
import videojs from 'video.js'
import Channel from '../types/Channel';

type Props = {
  channel: Channel,
  isHls: boolean,
  local: boolean,
}

const Video = (props: Props) => {
  const {
    channel,
    isHls,
    local,
  } = props;

  const isFlv = channel.type === 'FLV';
  const videoElementId = `videoElement-${channel.streamId}`;
  let flvPlayer: any = null;
  let hiddenPlayer = true;

  // const peercastTip = '150.95.177.111:7144'; // VPSのぴあきゃす
  const peercastTip = 'shule.peca.live:8144'; // 自宅のぴあきゃす
  const streamUrl = `http://${peercastTip}/pls/${channel.streamId}.m3u8?tip=${channel.tip}&fmt=m3u8`;
  const isHlsPlay = isHls && channel.streamId.length;

  useEffect(() => {
    // TODO HLS再生
    if (isHlsPlay) {
      // console.log('hls play:' + streamUrl);
      // var player = videojs(videoElementId);
      return;
    }

    if (isHls) {
      return;
    }

    // TODO FLV再生
    let videoElement:any = document.getElementById(videoElementId);
    videoElement.hidden = !isFlv;

    if (channel.streamId.length > 0) {
      const url = `http://${peercastTip}/stream/${channel.streamId}.flv?tip=${channel.tip}`;
      console.log('flv play:' + url);
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: url
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
      hiddenPlayer = false;
    }

    return () => {
      // FLVプレイヤーの終了処理
      if (flvPlayer) {
        flvPlayer.pause();
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
        flvPlayer = null;
      }
    }
  });

  const vlcUrl = `rtmp://${local ? '192.168.11.9:8144' : peercastTip}/stream/${channel.streamId}.flv?tip=${channel.tip}`;

  return (
    <div>
      {isFlv ? <a href={vlcUrl}>VLCで再生！</a> : null }
      <video id={videoElementId} controls width="100%"></video>
      {/*{*/}
      {/*  isHlsPlay ? (*/}
      {/*    <video id={videoElementId} width={1280} height={720} className="video-js vjs-default-skin" controls >*/}
      {/*      <source src={streamUrl} type="application/x-mpegURL" />*/}
      {/*    </video>*/}
      {/*  ) : null*/}
      {/*}*/}
    </div>
  );
};

export default Video;
