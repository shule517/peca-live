import React, {useEffect, useState} from 'react';
import flvjs from 'flv.js'
import videojs from 'video.js'
import Channel from '../types/Channel';
import styled from "styled-components";

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

  const [player, setPlayer] = useState<any>(null);
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string>(null);

  const videoElementId = `videoElement-${channel.streamId}`;
  let flvPlayer: any = null;
  let hiddenPlayer = true;

  // const peercastTip = '150.95.177.111:7144'; // VPSのぴあきゃす
  // const peercastTip = 'localhost:7144'; // 自宅のぴあきゃす
  const peercastTip = 'shule.peca.live:8144'; // 自宅のぴあきゃす
  const streamUrl = `http://${peercastTip}/hls/${channel.streamId}`;
  const isHlsPlay = isHls && channel.streamId.length;

  useEffect(() => {
    if (channel.streamId.length <= 0) { return; }

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
    videoElement.hidden = !channel.isFlv;

    const url = `http://${peercastTip}/stream/${channel.streamId}.flv?tip=${channel.tip}`;

    if (!player || currentStreamUrl !== url) {

      if (player) {
        player.pause();
        player.unload();
        player.detachMediaElement();
        player.destroy();
      }

      console.log('flv play:' + url);
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: url
      });

      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
      hiddenPlayer = false;
      setPlayer(flvPlayer);
      setCurrentStreamUrl(url);
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
      {isHls ? null : <VideoStyle id={videoElementId} controls width="100%"></VideoStyle>}
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

const VideoStyle = styled.video`
  background-color: #333333;
  margin-top: 10px;
  max-width: 800px;
`;

export default Video;
