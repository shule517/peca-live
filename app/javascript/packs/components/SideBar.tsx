import React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  withStyles,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { isMobile } from 'react-device-detect'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import { useSelectorChannels } from '../modules/channelsModule'
import { Link } from 'react-router-dom'
import HeadsetIcon from '@material-ui/icons/Headset'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

const StyledBadge = withStyles((theme) =>
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
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  })
)(Badge)

const useStyles = makeStyles((theme) => ({
  noMaxWidth: {
    maxWidth: 'none'
  },
  toolbar: theme.mixins.toolbar
}))

type Props = {
  onChannelClick: () => void
}

const SideBar = (props: Props) => {
  const { onChannelClick } = props
  const classes = useStyles({})

  const channels = useSelectorChannels()
  const dup = channels.slice(0, channels.length)
  const hotChannels = dup
    .sort((a, b) => {
      return b.listenerCount - a.listenerCount
    })
    .slice(0, 4)
  const newChannels = dup
    .sort((a, b) => {
      return a.uptime - b.uptime
    })
    .slice(0, 4)

  const channelItem = (key, channel, primary, icon, secondary) => {
    return (
      <Link
        key={`Link-${key}-${channel.streamId}`}
        to={`/channels/${channel.streamId}`}
        onClick={() => {
          onChannelClick() // SP版の時にサイドバーから動画を開いたらサイドバーを閉じる
        }}
        style={{ textDecoration: 'none', color: 'initial' }}
      >
        <ChannelDetailTooltip
          title={
            <div>
              <div>{channel.explanation}</div>
              <div>{`${
                channel.listenerCount === -1
                  ? ''
                  : `${channel.listenerCount}人が視聴中 - `
              }${channel.startingTime}`}</div>
            </div>
          }
          aria-label="listener"
          classes={{ tooltip: classes.noMaxWidth }}
        >
          <ListItem button>
            <ListItemIcon>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                variant="dot"
              >
                <StyledAvator src={channel.ypIconUrl} />
              </StyledBadge>
            </ListItemIcon>

            <ListItemText
              primary={
                <Grid container>
                  <Grid item xs={8}>
                    {primary}
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography variant="caption">
                      {icon}
                      <ListenerCountStyle>{secondary}</ListenerCountStyle>
                    </Typography>
                  </Grid>
                </Grid>
              }
              secondary={
                <ListenerCountStyle>
                  {`${channel.compactDetails}`}
                </ListenerCountStyle>
              }
              secondaryTypographyProps={{
                color: 'textSecondary',
                variant: 'subtitle2',
                style: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }
              }}
            />
          </ListItem>
        </ChannelDetailTooltip>
      </Link>
    )
  }

  return (
    <div>
      {isMobile ? (
        <>
          <List>
            <ListItem button key={'pecalive'} onClick={() => onChannelClick()}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <Logo src="/images/pecalive.png" />
            </ListItem>
          </List>
          <Divider />
        </>
      ) : (
        <>
          <div className={classes.toolbar} />
        </>
      )}
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            リスナーが多い
          </ListSubheader>
        }
      >
        {hotChannels.map(channel => {
          return channelItem(
            'listener-order',
            channel,
            channel.name,
            <HeadsetIcon style={{ marginBottom: '-3px', fontSize: 14 }} />,
            channel.listenerCount
          )
        })}
      </List>
      {isMobile && <Divider />}
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            最近はじまった
          </ListSubheader>
        }
      >
        {newChannels.map(channel => {
          return channelItem(
            'uptime-order',
            channel,
            channel.name,
            <AccessTimeIcon style={{ marginBottom: '-3px', fontSize: 14 }} />,
            channel.startingTime.replace('前', '')
          )
        })}
      </List>

      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="body2" color="textSecondary" component="p">
              ご連絡は
              <TwitterLink href={'https://twitter.com/shule517'}>
                @shule517
              </TwitterLink>
              まで！
            </Typography>
          </ListSubheader>
        }
      />
    </div>
  )
}

const TwitterLink = styled.a`
  color: rgba(0, 0, 0, 0.54);
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  margin-left: 3px;
  margin-right: 3px;
`

const ListenerCountStyle = styled.span`
  margin-left: 4px;
  min-width: 22px;
`

const ChannelDetailTooltip = styled(Tooltip)`
  max-width: none;
`

const StyledAvator = styled(Avatar)`
  border: solid 1px rgba(0, 0, 0, 0.04);
`

const Logo = styled.img`
  height: 30px;
  width: 105px;
  padding-top: 3px;
  padding-bottom: 3px;
`

export default SideBar
