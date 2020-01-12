import React from 'react';
import styled from 'styled-components';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Channel from '../types/Channel'
import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import { isMobile } from 'react-device-detect'
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Grid from '@material-ui/core/Grid';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#FD196E',
      color: '#FD196E',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        // animation: '$ripple 1.2s infinite ease-in-out',
        // border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const useStyles = makeStyles((theme: Theme) => ({
  noMaxWidth: {
    maxWidth: 'none',
  },
  toolbar: theme.mixins.toolbar,
}));

type Props = {
  channels: Channel[],
  onChannelClick: () => void,
}

const SideBar = (props: Props) => {
  const { channels, onChannelClick } = props;
  const classes = useStyles({});
  const history = useHistory();

  const dup = channels.slice(0, channels.length);
  const hotChannels = dup
    .sort((a, b) => { return b.listenerCount - a.listenerCount })
    .slice(0, 4);
  const newChannels = dup
    .sort((a, b) => { return a.uptime - b.uptime })
    .slice(0, 4);

  const test = (channel, primary, icon, secondary) => {
    return (
      <ChannelDetailTooltip key={channel.streamId} title={<div><div>{channel.explanation}</div><div>{`${channel.listenerCount === -1 ? '' : `${channel.listenerCount}人が視聴中 - `}${channel.startingTime}`}</div></div>} aria-label="listener" classes={{ tooltip: classes.noMaxWidth }}>
        <ListItem button key={channel.streamId} onClick={() => {onChannelClick(); history.push(`/channels/${channel.streamId}`)}}>
          <ListItemIcon>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot">
              <StyledAvator src={"/images/mouneyou.png"} />
            </StyledBadge>
          </ListItemIcon>

          <ListItemText
            primary={
              <Grid container>
                <Grid item xs={8}>
                  {primary}
                </Grid>
                <Grid item xs={4} style={{textAlign: 'right'}}>
                  <Typography variant="caption">
                    <FontAwesomeIcon icon={icon} />
                    <ListenerCountStyle>
                      {secondary}
                    </ListenerCountStyle>
                  </Typography>
                </Grid>
              </Grid>
            }

            secondary={
              <ListenerCountStyle>
                {`${channel.compact_details}`}
              </ListenerCountStyle>}
            secondaryTypographyProps={{color: 'textSecondary', variant: 'subtitle2', style: {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}}/>

        </ListItem>
      </ChannelDetailTooltip>
    )
  };

  return (
    <div>
      {!isMobile && <div className={classes.toolbar} />}
      <List subheader={<ListSubheader component="div" id="nested-list-subheader">視聴者が多い</ListSubheader>}>
        {hotChannels.map((channel) => {return test(channel, channel.name, 'headphones', channel.listenerCount);})}
      </List>
      <List subheader={<ListSubheader component="div" id="nested-list-subheader">最近はじまった</ListSubheader>}>
        {newChannels.map((channel) => {return test(channel, channel.name, 'clock', channel.startingTime.replace('前', ''));})}
      </List>
    </div>
  );
};

const ListenerCountStyle = styled.span`
  margin-left: 4px;
  min-width: 22px;
`;

const ChannelDetailTooltip = styled(Tooltip)`
  max-width: none;
`;

const StyledAvator = styled(Avatar)`
  border: solid 1px rgba(0, 0, 0, 0.04);
`;

export default SideBar;
