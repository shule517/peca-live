import React from "react";
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { library } from '@fortawesome/fontawesome-svg-core'; //fontawesomeのコアファイル
import { fab } from '@fortawesome/free-brands-svg-icons';    //fontawesomeのbrandアイコンのインポート
import { fas } from '@fortawesome/free-solid-svg-icons';     //fontawesomeのsolidアイコンのインポート
import { far } from '@fortawesome/free-regular-svg-icons';   //fontawesomeのregularアイコンのインポート
import { isIOS, isMobile } from 'react-device-detect'
import Channel from './types/Channel'
import ChannelList from './components/ChannelList';
import ChannelPlayer from './components/ChannelPlayer';
import PageViewTracker from './components/PageViewTracker'
import SideBar from './components/SideBar'
import PecaLiveAppBar from "./components/PecaLiveAppBar";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: isMobile ? window.parent.screen.width * 0.8 : drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: isMobile ? window.parent.screen.width * 0.8 : drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

const App = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    // チャンネル一覧を取得
    const fetchData = async () => {
      const res = await fetch('/api/v1/channels', {credentials: 'same-origin'});
      const response = await res.json() as Array<any>;

      const channels = response.map(channel => {
        if (channel.contentType === null) { return null; }
        return new Channel(
          channel.name,         // A.ch
          channel.channelId,    // 0C1A6C6959CEB2A8BF9598BC9185FF32
          channel.tracker,      // 14.13.42.64:5184
          channel.contactUrl,   // http://jbbs.shitaraba.net/bbs/read.cgi/game/52685/1567349533/
          channel.genre,        // PS4
          channel.description,  // モンスターハンターワールド：アイスボーン MHWIB - &lt;Open&gt;
          channel.listeners,    // -1
          channel.relays,       // -1
          channel.bitrate,      // 1500
          channel.contentType,  // FLV
          channel.album,
          channel.comment,
          channel.creator,
          channel.trackTitle,
          channel.trackUrl,
          channel.uptime,
          channel.yellowPage
        );
      });

      channels.sort((a, b) => { return a.uptime - b.uptime });
      setChannels(channels);
    };

    // 初回のチャンネル情報を取得
    fetchData();

    // 1分間に1回チャンネル情報を再取得
    setInterval(()=>{
      fetchData();
    }, 10000);

    //fontawesomeを読み込み
    library.add(fab, fas, far);
  }, []);

  const classes = useStyles({});
  const [isSidebarOpen, setIsSiderbarOpen] = React.useState(false);
  const handleDrawerToggle = () => { setIsSiderbarOpen(!isSidebarOpen) };

  return (
    <BrowserRouter>
      <PageViewTracker>
        <div className={classes.root}>
          <CssBaseline />
          <PecaLiveAppBar onAppButtonClick={handleDrawerToggle}/>

          {
            isMobile ?
              <Drawer variant='temporary' anchor='left' open={ isSidebarOpen } onClose={handleDrawerToggle} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true, /* スマホの性能改善 */}}>
                <SideBar channels={channels} onChannelClick={() => setIsSiderbarOpen(false)} />
              </Drawer>
              :
              <Drawer variant="permanent" anchor='left' open={ true } onClose={handleDrawerToggle} className={classes.drawer} classes={{paper: classes.drawerPaper}}>
                <SideBar channels={channels} onChannelClick={() => setIsSiderbarOpen(false)} />
              </Drawer>
          }

          <div>
            <div className={classes.toolbar} />
            <main>
              <Switch>
                <Route exact path='/' render={(props) => <ChannelList channels={channels} />} />
                <Route path='/channels/:streamId' render={(props) => { return <ChannelPlayer streamId={props.match.params.streamId} channels={channels} isHls={isIOS} local={false} />}} />
                <Route path='/hls/:streamId' render={(props) => { return <ChannelPlayer streamId={props.match.params.streamId} channels={channels} isHls={true} local={false} />}} />
                <Route path='/local/:streamId' render={(props) => { return <ChannelPlayer streamId={props.match.params.streamId} channels={channels} isHls={true} local={true} />}} />
              </Switch>
            </main>
          </div>
        </div>
      </PageViewTracker>
    </BrowserRouter>
  )
};

export default App;
