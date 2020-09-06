import React, { useEffect, useState } from 'react'
import videojs from 'video.js'
import Channel from '../types/Channel'
import styled from 'styled-components'
import { useSelectorPeerCast } from '../modules/peercastModule'
import 'videojs-flvjs-es6'

type Props = {
  channel: Channel
  isHls: boolean
  local: boolean
}

const Video = (props: Props) => {
  const { channel, isHls, local } = props

  const peercast = useSelectorPeerCast()
  const [player, setPlayer] = useState<videojs.Player>(null)
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string>(null)
  const [movieWidth, setMovieWidth] = useState<number>(1280)
  const [movieHeight, setMovieHeight] = useState<number>(720)

  const videoElementId = `videoElement-flvjs`
  const isHlsPlay = isHls && channel.streamId.length
  const videoElement: HTMLMediaElement = document.getElementById(
    videoElementId
  ) as HTMLMediaElement

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
    // videoElement.hidden = !channel.isFlv

    const flvStreamUrl = channel.flvStreamUrl(peercast.tip)

    // 初回再生 or 配信を切り替えた場合
    if (!player || currentStreamUrl !== flvStreamUrl) {
      if (!videoElement) {
        return
      }

      if (!player) {
        console.log('初回 再生! flvStreamUrl: ' + flvStreamUrl)
        const videojsPlayer = videojs(
          videoElementId,
          {
            autoplay: true,
            controlBar: {
              volumePanel: { inline: false }
            }
          },
          // 再生準備完了
          () => {
            videojsPlayer.play().then(() => {
              setMovieWidth(videojsPlayer.videoWidth())
              setMovieHeight(videojsPlayer.videoHeight())
            })
          }
        )

        setPlayer(videojsPlayer)
        setCurrentStreamUrl(flvStreamUrl)

        videojsPlayer.src({ type: 'video/x-flv', src: flvStreamUrl })
      } else {
        player.reset()

        player.src({ type: 'video/x-flv', src: flvStreamUrl })
        player.load()
        player.play().then(() => {
          setMovieWidth(player.videoWidth())
          setMovieHeight(player.videoHeight())
        })
        setCurrentStreamUrl(flvStreamUrl)
      }
    }
  })

  const width =
    window.parent.screen.width < 800 ? window.parent.screen.width : 800
  const aspectRate = movieHeight / movieWidth
  const height = width * aspectRate

  return (
    <VideoStyle
      id={videoElementId}
      className="video-js vjs-default-skin vjs-big-play-centered"
      controls
      style={{ width: width, height: height }}
    />
  )
}

const VideoStyle = styled.video`
  background-color: #333333;
  max-width: 800px;
`

export default Video
