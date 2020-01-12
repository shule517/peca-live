import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

type Props = {
}

const PecaLiveAppBar = (props: Props) => {
  const classes = useStyles({});

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
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

export default PecaLiveAppBar;
