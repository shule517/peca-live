import React from 'react';
import Channel from '../types/Channel'

import PecaLiveAppBar from './PecaLiveAppBar'
type Props = {
  channels: Channel[],
}

const SideBar = (props: Props) => {
  return (
    <PecaLiveAppBar />
  );
};

export default SideBar;
