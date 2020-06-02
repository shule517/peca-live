import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelectorChannels } from '../modules/channelsModule'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Video from './Video'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 1)
    },
    card: {
      maxWidth: 550,
      width: window.parent.screen.width - 8 * 2,
      margin: `${theme.spacing(1)}px auto`
    },
    media: {
      height: 140
    }
  })
)

type Props = {}

const ChannelList = (props: Props) => {
  const channels = useSelectorChannels()
  const classes = useStyles({})
  const history = useHistory()

  return (
    <div className={classes.root}>
      <Helmet title="ぺからいぶ！" />
      {channels.map((channel, index) => {
        return (
          <Fade key={channel.streamId} in={true}>
            <Card
              className={classes.card}
              onClick={() => {
                // history.push(`/channels/${channel.streamId}`)
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <StyledAvator
                        alt={channel.name}
                        src={channel.ypIconUrl}
                      />
                      <div style={{ textAlign: 'center', marginTop: '2px' }}>
                        <FontAwesomeIcon
                          icon="headphones"
                          style={{ marginRight: '5px' }}
                        />
                        {channel.listenerCount}
                      </div>
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="h5" component="h2">
                        {channel.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {channel.explanation}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant="body2"
                        color="secondary"
                        component="p"
                        style={{
                          position: 'absolute',
                          right: '16px',
                          top: '14px'
                        }}
                      >
                        {channel.isFavorited ? (
                          <FavoriteIcon
                            style={{
                              position: 'absolute',
                              right: '16px',
                              top: '10px'
                            }}
                          />
                        ) : (
                          <FavoriteBorder
                            color="disabled"
                            style={{
                              position: 'absolute',
                              right: '16px',
                              top: '10px'
                            }}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{
                          position: 'absolute',
                          right: '16px',
                          bottom: '16px'
                        }}
                      >
                        {channel.startingTime}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Video
                      channel={channel}
                      isHls={false}
                      local={false}
                    ></Video>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Fade>
        )
      })}
    </div>
  )
}

const ChannelStyle = styled.div`
  /* padding: 50px; */
`

const Thumbnail = styled.img`
  width: 347.5px;
  height: 195.47px;
`

const ChannelItemStyle = styled.div`
  float: left;
  padding: 10px;
`

const StyledAvator = styled(Avatar)`
  border: solid 1px rgba(0, 0, 0, 0.04);
`

export default ChannelList
