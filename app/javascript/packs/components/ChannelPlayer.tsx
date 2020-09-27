import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Channel from '../types/Channel'
import { CommentInterface } from '../types/Comment'
import Video from './Video'
import { useHistory } from 'react-router-dom'
import { useSelectorChannels } from '../modules/channelsModule'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import CircularProgress from '@material-ui/core/CircularProgress'

type Props = {
  streamId: string
  isHls: boolean
  local: boolean
}

const ChannelPlayer = (props: Props) => {
  const { streamId, isHls, local } = props

  const channels = useSelectorChannels()
  const [channel, setChannel] = useState(
    Channel.nullObject(
      channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...'
    )
  )
  const [nextChannelUrl, setNextChannelUrl] = useState(null)
  const [prevChannelUrl, setPrevChannelUrl] = useState(null)
  const [comments, setComments] = useState(null)
  const [timerId, setTimerId] = useState(null)
  const [topImageUrl, setTopImageUrl] = useState(null)
  const commentId = `comment-${channel.streamId}`
  const history = useHistory()

  useEffect(() => {
    // チャンネル一覧から画面遷移した時に、スクロール位置をリセットする
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const foundChannel = channels.find(
      (channel) => channel.streamId === streamId
    )
    const fetchChannel =
      foundChannel ||
      Channel.nullObject(
        channels.length > 0
          ? '配信は終了しました。'
          : 'チャンネル情報を取得中...'
      )

    if (channel.name !== fetchChannel.name) {
      // 配信を切り替えた
      const index = channels.findIndex((item) => item === fetchChannel)
      const nextChannel = channels[(index + 1) % channels.length]
      const nextChannelUrl = nextChannel
        ? `/channels/${nextChannel.streamId}`
        : null
      const prevChannel =
        channels[(index - 1 + channels.length) % channels.length]
      const prevChannelUrl = prevChannel
        ? `/channels/${prevChannel.streamId}`
        : null

      setChannel(fetchChannel)
      setNextChannelUrl(nextChannelUrl)
      setPrevChannelUrl(prevChannelUrl)
      setComments(found_channel ? null : []) // コメント表示を初期化
      setTopImageUrl(null) // TOP画像を初期化

      if (fetchChannel.contactUrl) {
        const fetchComments = async () => {
          const response = await fetch(
            `/api/v1/bbs/comments?url=${fetch_channel.contactUrl}`,
            { credentials: 'same-origin' }
          )
          const fetch_comments = (await response.json()) as Array<
            CommentInterface
          >
          setComments(fetchComments.reverse())

          const response_bbs = await fetch(
            `/api/v1/bbs?url=${fetch_channel.contactUrl}`,
            { credentials: 'same-origin' }
          )
          const bbs = await responseBbs.json()
          setTopImageUrl(bbs.top_image_url)
        }
        // 初回のコメント情報を取得
        fetchComments()

        // 前回のタイマーを止める
        if (timerId) {
          clearInterval(timerId)
        }

        // 10秒に1回コメントを再取得
        const id = setInterval(() => fetchComments(), 10000)
        setTimerId(id)
      } else {
        // コンタクトURLが設定されてない
        setComments([])
        setThreads([])
        setTopImageUrl(null)
      }

      // 配信を切り替えた時に、コメントのスクロール位置を上に戻す
      const element = document.getElementById(commentId)
      if (element) {
        element.scrollTo(0, 0)
      }
    } else if (!channel.equal(fetchChannel)) {
      // 変更があればchannelを更新
      setChannel(fetchChannel)
    }
  }, [channels])

  return (
    <div>
      <Helmet
        title={`${channels.length > 0 ? `${channel.name} - ` : ''}ぺからいぶ！`}
      />
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
              {channel.streamId && channel.listenerCount > 0 && `${channel.listenerCount}人が視聴中 - `}
              {channel.streamId && `${channel.startingTime}から`}
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

      <Comment id={commentId}>
        {!comments && (
          <div style={{ margin: '15px', color: 'rgba(0, 0, 0, 0.5)' }}>
            <CircularProgress size={30} style={{ color: 'lightgray' }} />
          </div>
        )}
        {comments && comments.length == 0 && (
          <div style={{ margin: '10px', color: 'rgba(0, 0, 0, 0.5)' }}>
            対応していないURLです
          </div>
        )}
        {comments &&
          comments.map((comment) => {
            return (
              <div
                key={`${channel.streamId}-comments-${comment['no']}`}
                style={{ display: 'flex', margin: '10px 15px' }}
              >
                <div
                  style={{
                    width: '50px',
                    color: 'rgb(0, 128, 0)',
                  }}
                >
                  {comment['no']}
                </div>
                <div style={{ width: '100%', wordBreak: 'break-all' }}>
                  {comment['body'].split('\n').map((line, index) => {
                    return (
                      <div
                        key={`${channel.streamId}-comments-${comment['no']}-${index}`}
                      >
                        {line}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
      </Comment>

      <div style={{ padding: '10px', background: 'white' }}>
        <a href={channel.contactUrl}>
          <span style={{ wordBreak: 'break-all' }}>{channel.contactUrl}</span>
        </a>
      </div>

      {topImageUrl && <img src={topImageUrl} style={{ maxWidth: '800px', width: '100%' }} />}

      {channel.isWmv && (
        <div style={{ padding: '10px', background: 'white' }}>
          ※WMV配信のためVLCで再生してください。
        </div>
      )}
    </div>
  )
}

const ChannelDetail = styled.div`
  background: white;
  padding: 15px;
  display: flex;
  align-items: center;
  overflow: auto;
  white-space: nowrap;
  margin-top: -5px;
`

const Comment = styled.div`
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 5px 0px;
  overflow: auto;
  height: 200px;
`

export default ChannelPlayer
