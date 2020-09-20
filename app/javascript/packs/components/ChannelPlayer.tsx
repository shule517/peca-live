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
import Avatar from '@material-ui/core/Avatar'
import { isMobile } from 'react-device-detect'

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

  const comments = [
    ['995:', '1レベルマスタースキルになってない？'],
    ['996:', '投げられない相手には相変わらずドスコイなの？'],
    ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
    ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
    ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
    ['1000:', '回復しながらコスト回復できる子か'],
    ['995:', '1レベルマスタースキルになってない？'],
    ['996:', '投げられない相手には相変わらずドスコイなの？'],
    ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
    ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
    ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
    ['1000:', '回復しながらコスト回復できる子か'],
    ['995:', '1レベルマスタースキルになってない？'],
    ['996:', '投げられない相手には相変わらずドスコイなの？'],
    ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
    ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
    ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
    ['1000:', '回復しながらコスト回復できる子か'],
    ['995:', '1レベルマスタースキルになってない？'],
    ['996:', '投げられない相手には相変わらずドスコイなの？'],
    ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
    ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
    ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
    ['1000:', '回復しながらコスト回復できる子か'],
  ]

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
          {/*{prevChannelUrl && (*/}
          {/*  <IconButton*/}
          {/*    title="前の配信へ"*/}
          {/*    onClick={() => {*/}
          {/*      history.push(prevChannelUrl)*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <ArrowBackIcon style={{ height: '18px', margin: '2px' }} />*/}
          {/*  </IconButton>*/}
          {/*)}*/}

          {/*{nextChannelUrl && (*/}
          {/*  <IconButton*/}
          {/*    title="次の配信へ"*/}
          {/*    onClick={() => {*/}
          {/*      history.push(nextChannelUrl)*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <ArrowForwardIcon style={{ height: '18px', margin: '2px' }} />*/}
          {/*  </IconButton>*/}
          {/*)}*/}

          {/*<Tooltip*/}
          {/*  title={*/}
          {/*    channel.isFavorited ? 'お気に入りの解除' : 'お気に入りに登録'*/}
          {/*  }*/}
          {/*  arrow*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    variant="outlined"*/}
          {/*    size="small"*/}
          {/*    color="primary"*/}
          {/*    style={{ marginRight: '5px' }}*/}
          {/*    onClick={() => {*/}
          {/*      const favoriteChannel = async () => {*/}
          {/*        const token = document.getElementsByName('csrf-token')[0][*/}
          {/*          'content'*/}
          {/*        ]*/}
          {/*        const headers = {*/}
          {/*          'Content-Type': 'application/x-www-form-urlencoded',*/}
          {/*          'X-CSRF-TOKEN': token*/}
          {/*        }*/}
          {/*        const body = `channel_name=${channel.name}`*/}

          {/*        await fetch('/api/v1/favorites', {*/}
          {/*          credentials: 'same-origin',*/}
          {/*          method: channel.isFavorited ? 'DELETE' : 'POST',*/}
          {/*          headers: headers,*/}
          {/*          body*/}
          {/*        })*/}

          {/*        await updateChannels(dispatch) // 画面に反映*/}
          {/*        // TODO: setFavoriteChannel(channels, channel.name, false, dispatch)*/}
          {/*      }*/}
          {/*      if (currentUser.isLogin) {*/}
          {/*        favoriteChannel()*/}
          {/*      } else {*/}
          {/*        // ログインしていない場合は、ログインを促す*/}
          {/*        setLoginDialogOpen(true)*/}
          {/*      }*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {channel.isFavorited ? (*/}
          {/*      <FavoriteIcon style={{ height: '18px', margin: '2px' }} />*/}
          {/*    ) : (*/}
          {/*      <FavoriteBorderIcon style={{ height: '18px', margin: '2px' }} />*/}
          {/*    )}*/}
          {/*  </Button>*/}
          {/*</Tooltip>*/}

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
      </ChannelItemStyle>

      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />

      <ChannelDetail style={{ borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)', padding: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'auto', whiteSpace: 'nowrap' }} >
          <Avatar
            alt={channel.name}
            src={channel.ypIconUrl}
            style={{
              width: isMobile ? '50px' : '80px',
              height: isMobile ? '50px' : '80px',
              margin: '0px 15px 0px 0px',
              border: 'solid 1px rgba(0, 0, 0, 0.1)'
            }}
          />

          <div style={{ margin: '0' }}>
            {/*<Typography gutterBottom variant="h5" component="h3" style={{ marginBottom: '3px' }}>*/}
            {/*  {channel.name}*/}
            {/*</Typography>*/}

            {/*<Typography*/}
            {/*  variant="body2"*/}
            {/*  color="textSecondary"*/}
            {/*  component="p"*/}
            {/*  style={{ overflow: 'scroll' }}*/}
            {/*>*/}
            {/*  {channel.explanation}*/}
            {/*</Typography>*/}
            <div style={{ display: 'flex' }}>
              <Typography
                gutterBottom variant="subtitle2" component="h3"
                // variant="body2"
                // color="textSecondary"
                // component="p"
                style={{ marginRight: '15px' }}
              >
                {channel.name}
              </Typography>

              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                style={{ marginTop: '2px' }}
              >
                {channel.streamId && `${channel.listenerCount}人が視聴中・${channel.startingTime}から`}
              </Typography>
            </div>

            <Typography
              gutterBottom variant="subtitle1" component="h3"
              style={{ marginBottom: '0x' }}
            >
              {channel.explanation}
            </Typography>
          </div>
        </div>


        {/*<ListenerStyle>*/}
        {/*  <Tooltip title="リスナー数" aria-label="listener">*/}
        {/*    <>*/}
        {/*      <HeadsetIcon style={{ height: '14px' }} />*/}
        {/*      <ListenerCountStyle title="リスナー数">*/}
        {/*        {channel.listenerCount}*/}
        {/*      </ListenerCountStyle>*/}
        {/*    </>*/}
        {/*  </Tooltip>*/}
        {/*</ListenerStyle>*/}

        {/*<ListenerStyle>*/}
        {/*  <Tooltip title="配信時間" aria-label="listener">*/}
        {/*    <>*/}
        {/*      <AccessTimeIcon style={{ height: '14px' }} />*/}
        {/*      <ListenerCountStyle title="配信時間">*/}
        {/*        {channel.startingTime}*/}
        {/*      </ListenerCountStyle>*/}
        {/*    </>*/}
        {/*  </Tooltip>*/}
        {/*</ListenerStyle>*/}
      </ChannelDetail>

      {/*<div style={{ borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)', padding: '10px 15px' }}>*/}
      {/*  <Typography*/}
      {/*    gutterBottom variant="body1" component="h3"*/}
      {/*    style={{ marginBottom: '0x' }}*/}
      {/*  >*/}
      {/*    {channel.explanation}*/}
      {/*  </Typography>*/}
      {/*  /!*<Typography*!/*/}
      {/*  /!*  variant="body2"*!/*/}
      {/*  /!*  color="textSecondary"*!/*/}
      {/*  /!*  component="p"*!/*/}
      {/*  /!*  style={{ overflow: 'scroll' }}*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  {`${channel.listenerCount}人が視聴中・${channel.startingTime}から`}*!/*/}
      {/*  /!*</Typography>*!/*/}
      {/*</div>*/}

      {/*<div style={{ marginTop: '10px' }}>*/}
      {/*  <a href={channel.contactUrl}>*/}
      {/*    <span style={{ wordBreak: 'break-all' }}>{channel.contactUrl}</span>*/}
      {/*  </a>*/}
      {/*</div>*/}

      <Comment>
        {comments.map( (comment) => {
          return (<div style={{ display: 'flex', margin: '10px 10px' }}>
            <div style={{ marginRight: '10px', width: '36px', color: 'rgb(0, 128, 0)' }}>{comment[0]}</div>
            <div style={{  }}>{comment[1]}</div>
          </div>)
        })}
      </Comment>
      {channel.isWmv && '※WMV配信のためVLCで再生してください。'}
    </>
  )
}

const Comment = styled.div`
  background: white;
  padding: 5px 0px;
  overflow: auto;
  height: 150px;
`

const ButtonPanelStyle = styled.div`
  // padding-bottom: 2px;
`

const ChannelDetail = styled.div`
  background: white;
  // margin: 0px 5px 5px 5px;
`

const ChannelItemStyle = styled.div`
  // padding: 3px 10px;
`

const ListenerStyle = styled.div`
  margin: 5px;
`

const ListenerCountStyle = styled.span`
  margin-left: 4px;
`

export default ChannelPlayer
