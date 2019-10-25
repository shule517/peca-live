import React, { useEffect } from 'react';
import flvjs from 'flv.js'
// import videojs from 'video.js'
import Channel from '../types/Channel';

type Props = {
  channel: Channel,
  isHls: boolean,
}

const Video = (props: Props) => {
  const {
    channel,
    isHls,
  } = props;

  const videoElementId = `videoElement-${channel.streamId}`;
  let flvPlayer: any = null;
  let hiddenPlayer = true;

  const streamUrl = `http://150.95.177.111:7144/pls/${channel.streamId}.m3u8?tip=${channel.tip}&fmt=m3u8`;
  const isHlsPlay = isHls && channel.streamId.length;

  useEffect(() => {
    // TODO HLS再生
    if (isHlsPlay) {
      // var player = videojs(videoElementId);
      return;
    }

    if (isHls) {
      return;
    }

    // TODO FLV再生
    let videoElement:any = document.getElementById(videoElementId);
    videoElement.hidden = false;

    if (channel.streamId.length > 0) {
      const url = `http://150.95.177.111:7144/stream/${channel.streamId}.flv?tip=${channel.tip}`;
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
  });

  return (
    <div>
      {isHls ? null : <video id={videoElementId} controls width="100%"></video> }
      {isHlsPlay ? <video src={streamUrl} width={1280} height={720} controls /> : null}
    </div>
  );
};

export default Video;
