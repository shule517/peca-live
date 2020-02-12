import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    flexGrow: 1,
  },
}));

type Props = {
  onAppButtonClick: () => void;
}

const PecaLiveAppBar = (props: Props) => {
  const { onAppButtonClick } = props;
  const classes = useStyles({});

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onAppButtonClick}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Link to='/' className={classes.logo}>
          <Logo src='/images/pecalive.png' />
        </Link>

        <IconButton
          // aria-haspopup="true"
          // onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
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
