import React, { useState } from 'react'
import styled from 'styled-components'
import Channel from '../types/Channel'
import { Helmet } from 'react-helmet'
import Video from './Video'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import { updateChannels, useSelectorChannels } from '../modules/channelsModule'
import { useSelectorPeerCast } from '../modules/peercastModule'
import { useDispatch } from 'react-redux'
import { useSelectorUser } from '../modules/userModule'
import LoginDialog from './LoginDialog'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import RefreshIcon from '@material-ui/icons/Refresh'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import HeadsetIcon from '@material-ui/icons/Headset'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import Typography from '@material-ui/core/Typography'

type Props = {
  streamId: string
  isHls: boolean
  local: boolean
}

type IconButtonProps = {
  title: string
  onClick: () => void
  children: React.ReactNode
}

const IconButton = (props: IconButtonProps) => {
  const { title, onClick, children } = props

  return (
    <Tooltip title={title} arrow>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => onClick()}
        style={{ marginRight: '5px' }}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

const ChannelPlayer = (props: Props) => {
  const dispatch = useDispatch()
  const { streamId, isHls, local } = props

  const channels = useSelectorChannels()
  const peercast = useSelectorPeerCast()
  const currentUser = useSelectorUser()

  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const channel =
    channels.find(channel => channel.streamId === streamId) ||
    Channel.nullObject(
      channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...'
    )
  const index = channels.findIndex(item => item === channel)
  const nextChannel = channels[(index + 1) % channels.length]
  const nextChannelUrl = nextChannel
    ? `/channels/${nextChannel.streamId}`
    : null
  const prevChannel = channels[(index - 1 + channels.length) % channels.length]
  const prevChannelUrl = prevChannel
    ? `/channels/${prevChannel.streamId}`
    : null

  window.scrollTo(0, 0)

  const history = useHistory()

  return (
    <>
      <Helmet title={`${channel.name} - ぺからいぶ！`} />
      <Video
        channel={channel}
        isHls={isHls}
        local={local}
        onClickPreviousChannel={() => {
          prevChannelUrl && history.push(prevChannelUrl)
        }}
        onClickNextChannel={() => {
          nextChannelUrl && history.push(nextChannelUrl)
        }}
        onClickReload={() => {
          fetch(`/api/v1/channels/bump?streamId=${streamId}`, {
            credentials: 'same-origin'
          })
          location.reload()
        }}
      />
      <ChannelItemStyle>
        <ButtonPanelStyle>
          {prevChannelUrl && (
            <IconButton
              title="前の配信へ"
              onClick={() => {
                history.push(prevChannelUrl)
              }}
            >
              <ArrowBackIcon style={{ height: '18px', margin: '2px' }} />
            </IconButton>
          )}

          {nextChannelUrl && (
            <IconButton
              title="次の配信へ"
              onClick={() => {
                history.push(nextChannelUrl)
              }}
            >
              <ArrowForwardIcon style={{ height: '18px', margin: '2px' }} />
            </IconButton>
          )}

          <Tooltip
            title={
              channel.isFavorited ? 'お気に入りの解除' : 'お気に入りに登録'
            }
            arrow
          >
            <Button
              variant="outlined"
              size="small"
              color="primary"
              style={{ marginRight: '5px' }}
              onClick={() => {
                const favoriteChannel = async () => {
                  const token = document.getElementsByName('csrf-token')[0][
                    'content'
                  ]
                  const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-TOKEN': token
                  }
                  const body = `channel_name=${channel.name}`

                  await fetch('/api/v1/favorites', {
                    credentials: 'same-origin',
                    method: channel.isFavorited ? 'DELETE' : 'POST',
                    headers: headers,
                    body
                  })

                  await updateChannels(dispatch) // 画面に反映
                  // TODO: setFavoriteChannel(channels, channel.name, false, dispatch)
                }
                if (currentUser.isLogin) {
                  favoriteChannel()
                } else {
                  // ログインしていない場合は、ログインを促す
                  setLoginDialogOpen(true)
                }
              }}
            >
              {channel.isFavorited ? (
                <FavoriteIcon style={{ height: '18px', margin: '2px' }} />
              ) : (
                <FavoriteBorderIcon style={{ height: '18px', margin: '2px' }} />
              )}
            </Button>
          </Tooltip>

          {false && (
            <IconButton
              title="再接続(Bump)"
              onClick={() => {
                fetch(`/api/v1/channels/bump?streamId=${streamId}`, {
                  credentials: 'same-origin'
                })
                location.reload()
              }}
            >
              <RefreshIcon style={{ height: '18px', margin: '2px' }} />
            </IconButton>
          )}

          {false && channel.vlcStreamUrl(peercast.tip) && (
            <IconButton
              title="VLCで再生"
              onClick={() => {
                window.location.href = channel.vlcStreamUrl(peercast.tip)
              }}
            >
              <PlayArrowIcon style={{ height: '18px', margin: '2px' }} />
            </IconButton>
          )}
        </ButtonPanelStyle>

        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
        />

        <ChannelDetail>
          <Typography gutterBottom variant="h5" component="h2">
            {channel.name}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ marginBottom: '20px' }}
          >
            {channel.explanation}
          </Typography>

          <ListenerStyle>
            <Tooltip title="リスナー数" aria-label="listener">
              <>
                <HeadsetIcon style={{ height: '14px' }} />
                <ListenerCountStyle title="リスナー数">
                  {channel.listenerCount}
                </ListenerCountStyle>
              </>
            </Tooltip>
          </ListenerStyle>

          <ListenerStyle>
            <Tooltip title="配信時間" aria-label="listener">
              <>
                <AccessTimeIcon style={{ height: '14px' }} />
                <ListenerCountStyle title="配信時間">
                  {channel.startingTime}
                </ListenerCountStyle>
              </>
            </Tooltip>
          </ListenerStyle>

          <div style={{ marginTop: '10px' }}>
            <a href={channel.contactUrl}>
              <span style={{ wordBreak: 'break-all' }}>{channel.contactUrl}</span>
            </a>
          </div>

          {channel.isWmv && '※WMV配信のためVLCで再生してください。'}
        </ChannelDetail>
      </ChannelItemStyle>
    </>
  )
}

const ButtonPanelStyle = styled.div`
  padding-bottom: 2px;
`

const ChannelDetail = styled.div`
  margin: 10px 5px 5px 5px;
`

const ChannelItemStyle = styled.div`
  padding: 3px 10px;
`

const ListenerStyle = styled.div`
  margin: 5px;
`

const ListenerCountStyle = styled.span`
  margin-left: 4px;
`

export default ChannelPlayer
