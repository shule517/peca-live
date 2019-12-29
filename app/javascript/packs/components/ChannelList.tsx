import React from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel'
import ChannelItem from './ChannelItem'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

type Props = {
  channels: Channel[],
}

const ChannelList = (props: Props) => {
  const {
    channels,
  } = props;

  return (
    <ChannelStyle>
      <Helmet title='ぺからいぶ！' />
      <Link to={`/asuka`}>
        <ChannelItemStyle>
          <div>
            <Thumbnail src="/images/2019asukaekiden.jpg" />
          </div>
        </ChannelItemStyle>
      </Link>
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

const Thumbnail = styled.img`
  width: 347.5px;
  height: 195.47px;
`;

const ChannelItemStyle = styled.div`
  float: left;
  padding: 10px;
`;

export default ChannelList;
