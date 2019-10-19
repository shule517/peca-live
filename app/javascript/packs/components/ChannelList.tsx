import * as React from 'react';
import ChannelItem from './ChannelItem'
import Channel from '../types/Channel'
import styled from 'styled-components';

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
