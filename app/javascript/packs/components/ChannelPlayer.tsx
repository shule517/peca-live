import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Channel, { ChannelInterface } from '../types/Channel'
import { CommentInterface } from '../types/Comment'
import { Helmet } from 'react-helmet'
import Video from './Video'
import { useHistory } from 'react-router-dom'
import { useSelectorChannels } from '../modules/channelsModule'
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
  const [channel, setChannel] = useState(Channel.nullObject(channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...'))
  const [nextChannelUrl, setNextChannelUrl] = useState(null)
  const [prevChannelUrl, setPrevChannelUrl] = useState(null)
  const [comments, setComments] = useState([])

  window.scrollTo(0, 0)

  const history = useHistory()

  useEffect(() => {
    const fetch_channel =
      channels.find((channel) => channel.streamId === streamId) ||
      Channel.nullObject(
        channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...'
      )

    if (channel.streamId !== fetch_channel.streamId) {
      const index = channels.findIndex((item) => item === fetch_channel)
      const nextChannel = channels[(index + 1) % channels.length]
      const nextChannelUrl = nextChannel
        ? `/channels/${nextChannel.streamId}`
        : null
      const prevChannel = channels[(index - 1 + channels.length) % channels.length]
      const prevChannelUrl = prevChannel
        ? `/channels/${prevChannel.streamId}`
        : null

      setChannel(fetch_channel)
      setNextChannelUrl(nextChannelUrl)
      setPrevChannelUrl(prevChannelUrl)
    }
  }, [channels])

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

      <ChannelDetail>
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

        <div style={{ paddingRight: '15px' }}>
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
      </ChannelDetail>

      <Comment>
        {comments.length == 0 ? '未対応な掲示板です' : null}
        {comments.map((comment) => {
          return (
            <div
              key={`${channel.streamId}-comments-${comment['no']}`}
              style={{ display: 'flex', margin: '10px 10px' }}
            >
              <div
                style={{
                  marginRight: '10px',
                  width: '36px',
                  color: 'rgb(0, 128, 0)',
                }}
              >
                {comment['no']}
              </div>
              <div style={{}}>{comment['body']}</div>
            </div>
          )
        })}
      </Comment>

      <div style={{ margin: '15px' }}>
        <a href={channel.contactUrl}>
          <span style={{ wordBreak: 'break-all' }}>{channel.contactUrl}</span>
        </a>
      </div>

      <div style={{ margin: '15px' }}>
        {channel.isWmv && '※WMV配信のためVLCで再生してください。'}
      </div>
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
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  align-items: center;
  overflow: auto;
  white-space: nowrap;
`

export default ChannelPlayer
