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

  const videoElementId = `videoElement-${channel.streamId}`
  let flvPlayer: any = null

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

    // // TODO FLV再生
    // let videoElement: any = document.getElementById(videoElementId)
    // videoElement.hidden = !channel.isFlv
    //
    // const url = `/channels/${channel.name}.flv`
    // const url = `http://${peercastTip}/stream/${channel.streamId}.flv?tip=${channel.tip}`

    // if (!player || currentStreamUrl !== url) {
    //   if (player) {
    //     player.pause()
    //     player.unload()
    //     player.detachMediaElement()
    //     player.destroy()
    //   }
    //
    //   const flvPlayer = FlvJs.createPlayer({
    //     type: 'flv',
    //     // isLive: true,
    //     url: url
    //   })
    //
    //   flvPlayer.attachMediaElement(videoElement)
    //   flvPlayer.load()
    //   // flvPlayer.play()
    //   setPlayer(flvPlayer)
    //   setCurrentStreamUrl(url)
    // }

    return () => {
      // FLVプレイヤーの終了処理
      if (flvPlayer) {
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
      }
    }
  })

  return (
    <div
      onMouseOver={() => {
        // TODO FLV再生
        const videoElement: any = document.getElementById(videoElementId)
        videoElement.hidden = !channel.isFlv

        const url = `/channels/${channel.name}.flv`
        if (!player || currentStreamUrl !== url) {
          if (player) {
            player.pause()
            player.unload()
            player.detachMediaElement()
            player.destroy()
          }

          const flvPlayer = FlvJs.createPlayer({
            type: 'flv',
            // isLive: true,
            url: url
          })

          flvPlayer.attachMediaElement(videoElement)
          flvPlayer.load()
          flvPlayer.play()
          setPlayer(flvPlayer)
          setCurrentStreamUrl(url)
        }
      }}
    >
      {isHls ? null : <VideoStyle id={videoElementId} controls></VideoStyle>}
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
  margin-top: 10px;
  max-width: 800px;
  width: 500px;
`

export default Video
