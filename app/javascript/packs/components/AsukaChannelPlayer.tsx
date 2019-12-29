import React, { useEffect } from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel';
import { Helmet } from 'react-helmet';
import Video from './Video'
import { Link } from 'react-router-dom'

type Props = {
  channels: Channel[],
  isHls: boolean,
  local: boolean,
}

const AsukaChannelPlayer = (props: Props) => {
  const {
    channels,
    isHls,
    local,
  } = props;

  console.log('isHls: ' + isHls);

  // const asukaChannels: any = channels.filter((channel) => channel.name.match(/アスカ駅伝/));
  const channel: any = channels.find((channel) => channel.name.match(/駅伝/)) || {
    name: channels.length > 0 ? '' : 'チャンネル情報を取得中...',
    streamId: '',
    tip: '',
    contactUrl: '',
    genre: '',
    details: '',
    listenerCount: 0,
    relayCount: 0,
    bitrate: 0,
    type: 'FLV',
  };

  const index = channels.findIndex(item => item === channel);
  const nextChannel = channels[(index+1) % channels.length];

  const unescapeHTML = (html: string) => {
    let escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  };

  const channelDetail = (channel: Channel) => {
    let text = '';
    const details = unescapeHTML(channel.details.replace(/ - .*/, '')) || '';

    if (channel.genre.length) {
      text = channel.genre;

      if (details.length) {
        text += ' - '
      }
    }
    if (details.length) {
      text += details
    }
    return text;
  };

  window.scrollTo(0, 0);

  console.log('channel.streamId: ' + channel.streamId);
  console.log('channel.streamId.length: ' + channel.streamId.length);

  return (
    <ChannelItemStyle>
      <Helmet title={`${channel.name} - ぺからいぶ！`} />
      <Link onClick={() => location.reload()}>次の走者へ！ ばっふぁっふぁ！</Link>
      <div>
        <Video channel={channel} isHls={isHls} local={local} />
      </div>
      <ChannelDetail>
        <Title>
          {channelDetail(channel)}
        </Title>
        <Details>
          {channel.name}
          <div>
            <a href={channel.contactUrl}>{channel.contactUrl}</a>
          </div>
        </Details>
      </ChannelDetail>
    </ChannelItemStyle>
  );
};

const ChannelDetail = styled.div`
  padding: 0px 5px;
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;  width: 347px;

  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  color: rgb(25, 23, 28);
  font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-top: 5px;
  margin-bottom: 2px;
`;

const Details = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;  width: 347px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: rgb(50, 47, 55);
  font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const ChannelItemStyle = styled.div`
  float: left;
  padding: 10px;
`;

export default AsukaChannelPlayer;
