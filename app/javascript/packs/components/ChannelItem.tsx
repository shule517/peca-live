import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Channel from '../types/Channel'

type Props = {
  channel: Channel
}

const ChannelItem = (props: Props) => {
  const { channel } = props

  const thumnbailElementId = `thumnbailElement-${channel.streamId}`

  return (
    <Link to={`/channels/${channel.streamId}`}>
      <ChannelItemStyle>
        <div>
          <Thumbnail id={thumnbailElementId} src="/images/live-chuu.png" />
        </div>
        <ChannelDetail>
          <Details>{channel.name}</Details>
        </ChannelDetail>
        aaaaaaaaaa
      </ChannelItemStyle>
    </Link>
  )
}

const Thumbnail = styled.img`
  width: 347.5px;
  height: 195.47px;
`

const ChannelDetail = styled.div`
  padding: 0px 5px;
`

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 347px;

  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  color: rgb(25, 23, 28);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-top: 5px;
  margin-bottom: 2px;
`

const Details = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 347px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: rgb(50, 47, 55);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`

const ChannelItemStyle = styled.div`
  float: left;
  padding: 10px;
`

export default ChannelItem
