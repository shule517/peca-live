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
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 1),
    },
    card: {
      maxWidth: 550,
      width: window.parent.screen.width - 8 * 2,
      margin: `${theme.spacing(1)}px auto`,
    },
    media: {
      height: 140,
    },
  })
)

type Props = {}

const About = (props: Props) => {
  const channels = useSelectorChannels()
  const classes = useStyles({})

  const [open, setOpen] = React.useState(true)
  const [scroll, setScroll] = React.useState('paper')

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">ぺからいぶ！とは</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ maxWidth: '400px' }}
          >
            <CenterDiv style={{ margin: '20px 0 35px 0' }}>
              <Logo src="/images/pecalive.png" />
            </CenterDiv>

            <CenterDiv style={{
              // marginBottom: '35px',
              fontSize: '25px' }}>
              パソコンでも、スマホでも、もっと気軽にピアキャスライフを！
            </CenterDiv>

            <hr style={{ margin: '35px 0' }} />

            <div style={{ marginBottom: '5px' }}>
              <img
                src="/images/device/windows.png"
                style={{ width: '30px', height: '30px', margin: '0 4px' }}
              />
              <img
                src="/images/device/mac.png"
                style={{ width: '30px', height: '30px', margin: '0 4px' }}
              />
              <img
                src="/images/device/iphone.png"
                style={{ width: '30px', height: '30px', margin: '0 4px', padding: '2px 0' }}
              />
              <img
                src="/images/device/android.png"
                style={{ width: '30px', height: '30px', margin: '0 2px 0 2px' }}
              />
              から簡単にPeerCastを見ることができます。
            </div>

            <hr style={{ margin: '35px 0' }} />
            {/*<div style={{ marginBottom: '20px' }} />*/}

            {/*<h1>作りはじめたきっかけ</h1>*/}

            {/*<h3>どこからでもアクセス！</h3>*/}
            {/*<CenterDiv>*/}
            {/*  <div style={{ marginBottom: '5px' }}>*/}
            {/*    PC(Windows / Mac)、スマホ(iOS /*/}
            {/*    Android)から簡単にPeerCastを見ることができます。*/}
            {/*  </div>*/}
            {/*</CenterDiv>*/}

            {/*<div style={{ margin: '100px 0 30px 0' }} />*/}

            <CenterDiv>
              <img
                src="/images/pecalive-about.jpg"
                style={{ width: '250px' }}
              />
            </CenterDiv>

            <h3>限界集落と呼ばれて早５年</h3>
            <div style={{ marginBottom: '5px' }}>
              <span>「限界集落」と呼ばれだして早５年以上が経ちました。</span>
              <span>その間に、お手軽な動画配信サービスが登場しました。</span>
              {/*<span>その間にYoutube Liveや、Twitchなど お手軽にゲーム配信ができるサービスが増えました。</span>*/}
            </div>

            {/*<CenterDiv>*/}
            {/*  <img*/}
            {/*    src="https://3.bp.blogspot.com/-03q0GrcUF3s/WTd4lK1uCRI/AAAAAAABEok/fG5xoEZUidgud4BeQdUfVNXr9FyM_RZtwCLcB/s500/fukei_mura_kaso.png"*/}
            {/*    style={{ width: '250px' }}*/}
            {/*  />*/}
            {/*</CenterDiv>*/}

            <div style={{ margin: '30px 0' }} />

            <h3>お手軽さが必要な時代！</h3>
            <div style={{ marginBottom: '5px' }}>
              {/*<span>僕も気がついたら、Youtubeばっかり見てました。。。</span>*/}
              <span>
                ぴあきゃすは好きなんだけど、なんとなく離れていってしまう。
              </span>
              <span>
                あいつらみたいに「お手軽さ」が必要な時代になってきたんだと思う。
              </span>
            </div>

            <h3>
              <div>お前らが何時までも</div>
              <div>ぴあかすできますように！</div>
            </h3>

            <div style={{ marginBottom: '5px' }}></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

  // return (
  //   <div className={classes.root}>
  //     <Helmet title="ぺからいぶ！" />
  //     <Logo src="/images/pecalive.png" />
  //     <div>パソコンでも、スマホでも、もっと気軽にピアキャスライフを！</div>
  //   </div>
  // )
}

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`

const Logo = styled.img`
  height: 40px;
`

export default About
