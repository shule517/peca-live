import React from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel'
import ChannelItem from './ChannelItem'
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 1),
      backgroundColor: '#F5F5F5'
    },
    card: {
      maxWidth: 550,
      margin: `${theme.spacing(1)}px auto`,
    },
    media: {
      height: 140,
    },
  }),
);

type Props = {
  channels: Channel[],
}

const ChannelList = (props: Props) => {
  const {
    channels,
  } = props;

  const classes = useStyles({});

  // const asuka_channel: any = channels.find((channel) => channel.name.match(/駅伝/)) || {
  //   name: channels.length > 0 ? '配信は終了しました。' : 'チャンネル情報を取得中...',
  //   streamId: '',
  //   tip: '',
  //   contactUrl: '',
  //   genre: '',
  //   details: '',
  //   listenerCount: 0,
  //   relayCount: 0,
  //   bitrate: 0,
  //   type: 'FLV',
  // };
  const unescapeHTML = (html: string) => {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  };

  const channelDetail = (channel: Channel) => {
    let text = '';
    const details = unescapeHTML(channel.details.replace(/ - .*/, '')) || '';

    if (channel.genre.length) {
      text = channel.genre

      if (details.length) {
        text += ' - '
      }
    }
    if (details.length) {
      text += details
    }
    return text;
  };

  const history = useHistory();

  return (
    <div className={classes.root}>
      <Helmet title='ぺからいぶ！' />
      {
        channels.map((channel, index) => {
          return (
            <Fade key={channel.streamId} in={true}>
              <Card className={classes.card} onClick={() => {history.push(`/channels/${channel.streamId}`)}}>
                <CardActionArea>
                  <CardContent>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <StyledAvator alt={channel.name} src="/images/mouneyou.png" />
                        <div style={{textAlign: 'center', marginTop: '2px'}}>
                          <FontAwesomeIcon icon="headphones" style={{marginRight: '5px'}}/>
                          {channel.listenerCount}
                        </div>
                      </Grid>
                      <Grid item xs>
                        <Typography gutterBottom variant="h5" component="h2">
                          {channel.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {channelDetail(channel)}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {/*{false ? <FavoriteIcon /> : <FavoriteBorder style={{position: 'absolute', right: '16px', top: '10px'}} />}*/}
                        <Typography variant="body2" color="textSecondary" component="p" style={{position: 'absolute', right: '16px', bottom: '16px'}}>
                          {channel.startingTime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Fade>
          );
        })
      }
    </div>
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

const StyledAvator = styled(Avatar)`
  border: solid 1px rgba(0, 0, 0, 0.04);
`;

export default ChannelList;
