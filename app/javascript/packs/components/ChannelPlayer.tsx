import React, { useEffect } from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel';
import { Helmet } from 'react-helmet';
import Video from './Video'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  streamId: String,
  channels: Channel[],
  isHls: boolean,
  local: boolean,
}

const ChannelPlayer = (props: Props) => {
  const {
    streamId,
    channels,
    isHls,
    local,
  } = props;

  console.log('isHls: ' + isHls);

  const channel: any = channels.find((channel) => channel.streamId === streamId) || {
    name: channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...',
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
  const next_channel_url = nextChannel ? `/channels/${nextChannel.streamId}` : null;

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

  const history = useHistory();

  const peercastTip = 'shule.peca.live:8144'; // 自宅のぴあきゃす
  const isFlv = channel.type === 'FLV';
  const vlcUrl = `rtmp://${peercastTip}/stream/${channel.streamId}.flv?tip=${channel.tip}`;

  return (
    <ChannelItemStyle>
      <Helmet title={`${channel.name} - ぺからいぶ！`} />

      {
        nextChannel &&
        <Button variant="outlined" size="small" color="primary" onClick={() => {history.push(next_channel_url)}} style={{marginRight: '5px'}}>
          次の配信へ
        </Button>
      }

      {
        isFlv &&
        <Button variant="outlined" size="small" color="primary">
          <a href={vlcUrl}>
            VLCで再生
          </a>
        </Button>
      }

      <div>
        <Video channel={channel} isHls={isHls} local={local} />
      </div>
      <ChannelDetail>
        <Title>
          {channelDetail(channel)}
        </Title>
        <ListenerStyle>
          <Tooltip title="リスナー数" aria-label="listener">
            <span>
              <FontAwesomeIcon icon="headphones" />
              <ListenerCountStyle title="リスナー数">
                {channel.listenerCount}
              </ListenerCountStyle>
            </span>
          </Tooltip>
        </ListenerStyle>
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
  float: left;
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

const ListenerStyle = styled.div`
  display: block;
  text-align: right;
`;

const ListenerCountStyle = styled.span`
  margin-left: 4px;
`;

export default ChannelPlayer;
