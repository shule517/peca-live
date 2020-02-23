import React, { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { library } from '@fortawesome/fontawesome-svg-core' //fontawesomeのコアファイル
import { fab } from '@fortawesome/free-brands-svg-icons' //fontawesomeのbrandアイコンのインポート
import { fas } from '@fortawesome/free-solid-svg-icons' //fontawesomeのsolidアイコンのインポート
import { far } from '@fortawesome/free-regular-svg-icons' //fontawesomeのregularアイコンのインポート
import { isIOS, isMobile } from 'react-device-detect'
import ChannelList from './components/ChannelList'
import ChannelPlayer from './components/ChannelPlayer'
import PageViewTracker from './components/PageViewTracker'
import SideBar from './components/SideBar'
import PecaLiveAppBar from './components/PecaLiveAppBar'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
const drawerWidth = 240
import { useDispatch } from 'react-redux'
import { updateChannels } from './modules/channelsModule'
import { updatePeerCast } from './modules/peercastModule'
import { useCookies } from 'react-cookie'
import PeerCast from './types/PeerCast'
import firebase from 'firebase'
import { updateUser } from './modules/userModule'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: isMobile ? window.parent.screen.width * 0.8 : drawerWidth,
        flexShrink: 0
      }
    },
    drawerPaper: {
      width: isMobile ? window.parent.screen.width * 0.8 : drawerWidth
    },
    toolbar: theme.mixins.toolbar
  })
)

const App = () => {
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['pecaHost', 'pecaPortNo'])

  useEffect(() => {
    // 初期値はクッキーから復帰
    updatePeerCast(
      dispatch,
      cookies.pecaHost || PeerCast.defaultHost,
      cookies.pecaPortNo || PeerCast.defaultPortNo
    )

    // 初回のチャンネル情報を取得
    updateChannels(dispatch)

    // 1分間に1回チャンネル情報を再取得
    setInterval(() => updateChannels(dispatch), 10000)

    // ログイン情報
    firebase.auth().onAuthStateChanged(user => {
      updateUser(dispatch, user.uid, user.displayName, user.photoURL)
    })

    //fontawesomeを読み込み
    library.add(fab, fas, far)
  }, [])

  const classes = useStyles({})
  const [isSidebarOpen, setIsSiderbarOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setIsSiderbarOpen(!isSidebarOpen)
  }

  return (
    <BrowserRouter>
      <PageViewTracker>
        <div className={classes.root}>
          <CssBaseline />
          <PecaLiveAppBar onAppButtonClick={handleDrawerToggle} />

          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={isSidebarOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true /* スマホの性能改善 */ }}
            >
              <SideBar onChannelClick={() => setIsSiderbarOpen(false)} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              anchor="left"
              open={true}
              onClose={handleDrawerToggle}
              className={classes.drawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <SideBar onChannelClick={() => setIsSiderbarOpen(false)} />
            </Drawer>
          )}

          <div>
            <div className={classes.toolbar} />
            <main>
              <Switch>
                <Route exact path="/" render={props => <ChannelList />} />
                <Route
                  path="/channels/:streamId"
                  render={props => {
                    return (
                      <ChannelPlayer
                        streamId={props.match.params.streamId}
                        isHls={isIOS}
                        local={false}
                      />
                    )
                  }}
                />
                <Route
                  path="/hls/:streamId"
                  render={props => {
                    return (
                      <ChannelPlayer
                        streamId={props.match.params.streamId}
                        isHls={true}
                        local={false}
                      />
                    )
                  }}
                />
                <Route
                  path="/local/:streamId"
                  render={props => {
                    return (
                      <ChannelPlayer
                        streamId={props.match.params.streamId}
                        isHls={true}
                        local={true}
                      />
                    )
                  }}
                />
              </Switch>
            </main>
          </div>
        </div>
      </PageViewTracker>
    </BrowserRouter>
  )
}

export default App
