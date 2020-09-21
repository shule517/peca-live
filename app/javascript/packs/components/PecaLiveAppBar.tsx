import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import SettingDialog from './SettingDialog'
import Button from '@material-ui/core/Button'
import LoginDialog from './LoginDialog'
import { useSelectorUser } from '../modules/userModule'
import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import { isMobile, isIOS } from 'react-device-detect'

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}))

type Props = {
  onAppButtonClick: () => void
}

const PecaLiveAppBar = (props: Props) => {
  const { onAppButtonClick } = props
  const classes = useStyles({})
  const [settingDialogOpen, setSettingDialogOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const currentUser = useSelectorUser()

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

        {!isIOS && (
          // iOSはWebPushが対応していないため、通知ボタンを表示しない
          <IconButton
            onClick={() => {
              if (currentUser.isLogin) {
                // WebPush通知の設定をする
                window.location.href = 'https://peca-live.netlify.app/'
              } else {
                // ログインしていない場合は、ログインを促す
                setLoginDialogOpen(true)
              }
            }}
          >
            <NotificationsActiveIcon />
          </IconButton>
        )}

        <IconButton onClick={() => setSettingDialogOpen(true)}>
          <SettingsIcon />
        </IconButton>

        {!isMobile &&
          (currentUser.isLogin ? (
            <IconButton onClick={() => setLoginDialogOpen(true)}>
              <Avatar src={currentUser.photoURL} className={classes.avatar} />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setLoginDialogOpen(true)}
            >
              ログイン
            </Button>
          ))}

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

export default PecaLiveAppBar
