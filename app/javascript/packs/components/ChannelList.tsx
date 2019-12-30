import React from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel'
import ChannelItem from './ChannelItem'
import AsukaChannelItem from './AsukaChannelItem'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

type Props = {
  channels: Channel[],
}

const ChannelList = (props: Props) => {
  const {
    channels,
  } = props;

  // const asuka_channel: any = channels.find((channel) => channel.name.match(/駅伝/)) || {
  //   name: channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...',
  //   streamId: '',
  //   tip: '',
  //   contactUrl: '',
  //   genre: '',
  //   details: '',
  //   listenerCount: 0,
  //   relayCount: 0,
  //   bitrate: 0,
  //   type: 'FLV',
  // };

  return (
    <ChannelStyle>
      <Helmet title='ぺからいぶ！' />
      {/*<AsukaChannelItem channel={asuka_channel}/>*/}
      {
        channels/*.filter(channel => channel.type === 'FLV')*/.map((item, index) => {
          return <ChannelItem key={index} channel={item}/>
        })
      }
    </ChannelStyle>
  );
};

const ChannelStyle = styled.div`
  /* padding: 50px; */
`;

const Thumbnail = styled.img`
  width: 347.5px;
  height: 195.47px;
`;

const ChannelItemStyle = styled.div`
  float: left;
  padding: 10px;
`;

export default ChannelList;
