import React from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

type Props = {
  channels: Channel[],
}

const SideBar = (props: Props) => {
  return (
    <AppBar position="fixed" color="inherit" >
      <Toolbar>
        <Link to='/'>
          <Logo src='/images/pecalive.png' />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const Logo = styled.img`
  height: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
`;

export default SideBar;
