import React, { useEffect, useState } from 'react'
import FlvJs from 'flv.js'
import videojs from 'video.js'
import Channel from '../types/Channel'
import styled from 'styled-components'
import { useSelectorPeerCast } from '../modules/peercastModule'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PictureInPictureAltIcon from '@material-ui/icons/PictureInPictureAlt'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Toolbar from '@material-ui/core/Toolbar'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Tooltip } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { VolumeDown, VolumeUp } from '@material-ui/icons'
import Slider from '@material-ui/core/Slider'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'

type Props = {
  channel: Channel
  isHls: boolean
  local: boolean
  onClickPreviousChannel: () => void
  onClickNextChannel: () => void
  onClickReload: () => void
}

const Video = (props: Props) => {
  const {
    channel,
    isHls,
    local,
    onClickPreviousChannel,
    onClickNextChannel,
    onClickReload
  } = props

  const peercast = useSelectorPeerCast()
  const [player, setPlayer] = useState<FlvJs.Player>(null)
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string>(null)
  const [movieWidth, setMovieWidth] = useState<number>(1280)
  const [movieHeight, setMovieHeight] = useState<number>(720)
  const [muted, setMuted] = useState<boolean>(false)
  const [video, setVideo] = useState<HTMLMediaElement>(null)

  const videoElementId = `videoElement-${channel.streamId}`
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
    setVideo(videoElement)
    videoElement.hidden = !channel.isFlv

    const flvStreamUrl = channel.flvStreamUrl(peercast.tip)

    // 初回再生 or 配信を切り替えた場合
    if (!player || currentStreamUrl !== flvStreamUrl) {
      if (player) {
        player.pause()
        player.unload()
        player.detachMediaElement()
        player.destroy()
      }

      const flvPlayer = FlvJs.createPlayer({
        type: 'flv',
        isLive: true,
        url: flvStreamUrl
      })
      flvPlayer.on('media_info', arg => {
        setMovieWidth(flvPlayer.mediaInfo.width)
        setMovieHeight(flvPlayer.mediaInfo.height)
      })

      flvPlayer.attachMediaElement(videoElement)
      flvPlayer.load()
      flvPlayer.play()
      setPlayer(flvPlayer)
      setCurrentStreamUrl(flvStreamUrl)
    }
  })

  const width =
    window.parent.screen.width < 800 ? window.parent.screen.width : 800
  const aspectRate = movieHeight / movieWidth
  const height = width * aspectRate

  return (
    <div style={{ position: 'relative' }}>
      {isHls ? null : (
        <VideoStyle
          id={videoElementId}
          controls
          style={{ width: width, height: height }}
        />
      )}

      <VideoControl style={{ width: width }}>
        {/*<PlayButtonControl style={{ width: width, height: height }}>*/}
        {/*  <ArrowBackIcon style={{ fontSize: 80 }} />*/}
        {/*  <PlayArrowIcon style={{ fontSize: 150, margin: '0 80px' }} />*/}
        {/*  <ArrowForwardIcon style={{ fontSize: 80 }} />*/}
        {/*</PlayButtonControl>*/}

        {/*<Typography id="continuous-slider" gutterBottom>*/}
        {/*  Volume*/}
        {/*</Typography>*/}
        {/*<Grid container spacing={2}>*/}
        {/*  <Grid item>*/}
        {/*    <VolumeDown />*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs>*/}
        {/*    <Slider*/}
        {/*      value={80}*/}
        {/*      onChange={(event, newValue) => {}}*/}
        {/*      aria-labelledby="continuous-slider"*/}
        {/*    />*/}
        {/*  </Grid>*/}
        {/*  <Grid item>*/}
        {/*    <VolumeUp />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}

        <FooterControl>
          {player ? (
            muted ? (
              <Tooltip title="ミュートを解除" placement="top" arrow>
                <IconButton
                  color="primary"
                  component="span"
                  onClick={() => {
                    player.muted = false
                    setMuted(player.muted)
                  }}
                >
                  <VolumeOffIcon style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="ミュート" placement="top" arrow>
                <IconButton
                  color="primary"
                  component="span"
                  onClick={() => {
                    player.muted = true
                    setMuted(player.muted)
                  }}
                >
                  <VolumeUpIcon style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            )
          ) : null}

          <Tooltip title="再生" placement="top" arrow>
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                player.play()
              }}
            >
              <PlayArrowIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="前の配信へ" placement="top" arrow>
            <IconButton
              color="primary"
              component="span"
              onClick={() => onClickPreviousChannel()}
              disabled={true}
            >
              <ArrowBackIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="次の配信へ" placement="top" arrow>
            <IconButton
              color="primary"
              component="span"
              onClick={() => onClickNextChannel()}
            >
              <ArrowForwardIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="再接続" placement="top" arrow>
            <IconButton
              color="primary"
              component="span"
              onClick={() => onClickReload()}
            >
              <RefreshIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="ミニプレイヤー" placement="top" arrow>
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                ;(video as any).requestPictureInPicture()
              }}
            >
              <PictureInPictureAltIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="フルスクリーン" placement="top" arrow>
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                video.requestFullscreen()
              }}
            >
              <FullscreenIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </FooterControl>
      </VideoControl>

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

const VideoControl = styled.div`
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.9)
  );
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.9)
  );
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.9)
  );
  position: absolute;
  right: 0;
  bottom: 0;
  height: 60px;
  color: white;
`

const PlayButtonControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FooterControl = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default Video
