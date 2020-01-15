import React from 'react';
import styled from 'styled-components';
import Channel from '../types/Channel'
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
import { useSelector } from "react-redux";
import { RootState } from "../modules/rootState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 1),
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
}

const ChannelList = (props: Props) => {
  const channels = useSelector((state: RootState) => state.channels).map((channel: any) => new Channel(channel));

  const classes = useStyles({});
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
                          {channel.explanation}
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
