import React, { useEffect, useState } from 'react'
import FlvJs from 'flv.js'
import videojs from 'video.js'
import Channel from '../types/Channel'
import styled from 'styled-components'
import { useSelectorPeerCast } from '../modules/peercastModule'

type Props = {
  channel: Channel
  isHls: boolean
  local: boolean
}

const Video = (props: Props) => {
  const { channel, isHls, local } = props

  const peercast = useSelectorPeerCast()
  const [player, setPlayer] = useState<FlvJs.Player>(null)
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string>(null)
  const [movieWidth, setMovieWidth] = useState<number>(1280)
  const [movieHeight, setMovieHeight] = useState<number>(720)

  const videoElementId = `videoElement-${channel.streamId}`
  const peercastTip = peercast.tip
  const isHlsPlay = isHls && channel.streamId.length

  useEffect(() => {
    if (channel.streamId.length <= 0) {
      return
    }

    // TODO HLS再生
    if (isHlsPlay) {
      // console.log('hls play:' + streamUrl);
      // var player = videojs(videoElementId);
      return
    }

    if (isHls) {
      return
    }

    // TODO FLV再生
    const videoElement: HTMLMediaElement = document.getElementById(
      videoElementId
    ) as HTMLMediaElement
    videoElement.hidden = !channel.isFlv

    const url = `http://${peercastTip}/stream/${channel.streamId}.flv?tip=${channel.tip}`

    if (!player || currentStreamUrl !== url) {
      if (player) {
        player.pause()
        player.unload()
        player.detachMediaElement()
        player.destroy()
      }

      const flvPlayer = FlvJs.createPlayer({
        type: 'flv',
        isLive: true,
        url: url
      })
      flvPlayer.on('media_info', arg => {
        setMovieWidth(flvPlayer.mediaInfo.width)
        setMovieHeight(flvPlayer.mediaInfo.height)
      })

      flvPlayer.attachMediaElement(videoElement)
      flvPlayer.load()
      flvPlayer.play()
      setPlayer(flvPlayer)
      setCurrentStreamUrl(url)
    }
  })

  const width =
    window.parent.screen.width < 800 ? window.parent.screen.width : 800
  const aspectRate = movieHeight / movieWidth
  const height = width * aspectRate

  return (
    <div>
      {isHls ? null : (
        <VideoStyle
          id={videoElementId}
          controls
          style={{ width: width, height: height }}
        />
      )}
      {/*{*/}
      {/*  isHlsPlay ? (*/}
      {/*    <video id={videoElementId} width={1280} height={720} className="video-js vjs-default-skin" controls >*/}
      {/*      <source src={streamUrl} type="application/x-mpegURL" />*/}
      {/*    </video>*/}
      {/*  ) : null*/}
      {/*}*/}
    </div>
  )
}

const VideoStyle = styled.video`
  background-color: #333333;
  max-width: 800px;
`

export default Video
