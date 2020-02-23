import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SettingDialog from './SettingDialog'
import Button from '@material-ui/core/Button'
import LoginDialog from './LoginDialog'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  logo: {
    flexGrow: 1
  }
}))

type Props = {
  onAppButtonClick: () => void
}

const PecaLiveAppBar = (props: Props) => {
  const { onAppButtonClick } = props
  const classes = useStyles({})
  const [settingDialogOpen, setSettingDialogOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

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

        <Link to="/" className={classes.logo}>
          <Logo src="/images/pecalive.png" />
        </Link>

        <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
          Login
        </Button>
        <IconButton onClick={() => setSettingDialogOpen(true)}>
          <AccountCircle />
        </IconButton>

        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
        />
        <SettingDialog
          open={settingDialogOpen}
          onClose={() => setSettingDialogOpen(false)}
        />
      </Toolbar>
    </AppBar>
  )
}

const Logo = styled.img`
  height: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
`

const StyledAvator = styled(Avatar)`
  border: solid 1px rgba(0, 0, 0, 0.04);
  width: 32px;
  height: 32px;
`

export default PecaLiveAppBar
