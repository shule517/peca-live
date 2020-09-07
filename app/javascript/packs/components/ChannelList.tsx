import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useSelectorChannels } from '../modules/channelsModule'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { Link } from 'react-router-dom'
import HeadsetIcon from '@material-ui/icons/Headset'

const useStyles = makeStyles((theme) =>
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

  return (
    <div className={classes.root}>
      <Helmet title="ぺからいぶ！" />
      {channels.map((channel, index) => {
        return (
          <Fade key={channel.streamId} in={true}>
            <Link
              to={`/channels/${channel.streamId}`}
              style={{ textDecoration: 'none' }}
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <StyledAvator
                          alt={channel.name}
                          src={channel.ypIconUrl}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            left: '21px',
                            bottom: '16px'
                          }}
                        >
                          <HeadsetIcon
                            style={{
                              fontSize: '14px',
                              marginRight: '5px',
                              marginBottom: '-2px'
                            }}
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
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Fade>
        )
      })}
    </div>
  )
}

const StyledAvator = styled(Avatar)`
  border: solid 1px rgba(0, 0, 0, 0.04);
`

export default ChannelList
