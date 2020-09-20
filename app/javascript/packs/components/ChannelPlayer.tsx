import React, { useState } from 'react'
import styled from 'styled-components'
import Channel from '../types/Channel'
import { Helmet } from 'react-helmet'
import Video from './Video'
import { useHistory } from 'react-router-dom'
import { useSelectorChannels } from '../modules/channelsModule'
import { useSelectorPeerCast } from '../modules/peercastModule'
import { useDispatch } from 'react-redux'
import { useSelectorUser } from '../modules/userModule'
import LoginDialog from './LoginDialog'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { isMobile } from 'react-device-detect'

type Props = {
  streamId: string
  isHls: boolean
  local: boolean
}

const ChannelPlayer = (props: Props) => {
  const { streamId, isHls, local } = props

  const channels = useSelectorChannels()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const channel =
    channels.find((channel) => channel.streamId === streamId) ||
    Channel.nullObject(
      channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...'
    )
  const index = channels.findIndex((item) => item === channel)
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

  // const comments = [
  //   ['995:', '1レベルマスタースキルになってない？'],
  //   ['996:', '投げられない相手には相変わらずドスコイなの？'],
  //   ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
  //   ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
  //   ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
  //   ['1000:', '回復しながらコスト回復できる子か'],
  //   ['995:', '1レベルマスタースキルになってない？'],
  //   ['996:', '投げられない相手には相変わらずドスコイなの？'],
  //   ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
  //   ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
  //   ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
  //   ['1000:', '回復しながらコスト回復できる子か'],
  //   ['995:', '1レベルマスタースキルになってない？'],
  //   ['996:', '投げられない相手には相変わらずドスコイなの？'],
  //   ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
  //   ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
  //   ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
  //   ['1000:', '回復しながらコスト回復できる子か'],
  //   ['995:', '1レベルマスタースキルになってない？'],
  //   ['996:', '投げられない相手には相変わらずドスコイなの？'],
  //   ['997:', 'はっ　気を失ってた アベマのコメント欄に”おおおおおおおおおおおおおおおおおおおお”って連打してた でも普段からぎゃあああああああああああああああって連打してるから　実質変わんないよ！ コーヒー飲みます'],
  //   ['998:', 'チン入者だあああああああああああ 白夜どこいったの'],
  //   ['999:', '人気投票のメアリちゃんデータ1，2コス限や 最近風水からロードに変えたから何とか使いたい'],
  //   ['1000:', '回復しながらコスト回復できる子か'],
  // ]

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
            credentials: 'same-origin',
          })
          location.reload()
        }}
      />

      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />

      <ChannelDetail
        style={{
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
          padding: '15px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <Avatar
            alt={channel.name}
            src={channel.ypIconUrl}
            style={{
              width: isMobile ? '50px' : '80px',
              height: isMobile ? '50px' : '80px',
              margin: '0px 15px 0px 0px',
              border: 'solid 1px rgba(0, 0, 0, 0.1)',
            }}
          />

          <div style={{ margin: '0' }}>
            <div style={{ display: 'flex' }}>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="h3"
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
                {channel.streamId &&
                  `${channel.listenerCount}人が視聴中 - ${channel.startingTime}から`}
              </Typography>
            </div>

            <Typography
              gutterBottom
              variant="subtitle1"
              component="h3"
              style={{ marginBottom: '0x' }}
            >
              {channel.explanation}
            </Typography>
          </div>
        </div>
      </ChannelDetail>

      <div style={{ margin: '15px' }}>
        <a href={channel.contactUrl}>
          <span style={{ wordBreak: 'break-all' }}>{channel.contactUrl}</span>
        </a>
      </div>
      <div style={{ margin: '15px' }}>
        {channel.isWmv && '※WMV配信のためVLCで再生してください。'}
      </div>

      {/*<Comment>*/}
      {/*  {comments.map( (comment) => {*/}
      {/*    return (<div style={{ display: 'flex', margin: '10px 10px' }}>*/}
      {/*      <div style={{ marginRight: '10px', width: '36px', color: 'rgb(0, 128, 0)' }}>{comment[0]}</div>*/}
      {/*      <div style={{  }}>{comment[1]}</div>*/}
      {/*    </div>)*/}
      {/*  })}*/}
      {/*</Comment>*/}
    </>
  )
}

const Comment = styled.div`
  background: white;
  padding: 5px 0px;
  overflow: auto;
  height: 150px;
`

const ChannelDetail = styled.div`
  background: white;
`

export default ChannelPlayer
