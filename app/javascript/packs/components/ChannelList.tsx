import React from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel'
import ChannelItem from './ChannelItem'

type Props = {
  channels: Channel[],
}

const ChannelList = (props: Props) => {
  const {
    channels,
  } = props;

  return (
    <ChannelStyle>
      {
        channels.filter(channel => channel.type === 'FLV').map((item, index) => {
          return <ChannelItem key={index} channel={item}/>
        })
      }
    </ChannelStyle>
  );
};

const ChannelStyle = styled.div`
  /* padding: 50px; */
`;

export default ChannelList;
