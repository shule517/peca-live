import React from 'react'
import styled from 'styled-components'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import DialogModel from '../types/Dialog'
import { useDispatch } from 'react-redux'
import { setAboutPage, useSelectorDialog } from '../modules/dialogModule'

type Props = {}

const About = (props: Props) => {
  const dialog = useSelectorDialog()
  const dispatch = useDispatch()

  const [scroll, setScroll] = useState('paper')

  const handleClickOpen = (scrollType) => () => {
    // setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setAboutPage(dispatch, dialog.currentAboutPage + 1)

    // 最後のページを閉じたときに、読んだフラグを立てる
    if (dialog.currentAboutPage >= 1) {
      localStorage.setItem('aboutVersion', DialogModel.CurrentAboutVersion) // 見たAboutバージョンを設定する。次回の起動時に既読判定として使う。
    }
  }

  return (
    <div>
      <Dialog
        open={dialog.currentAboutPage === 0}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>ぺからいぶ！とは</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <CenterDiv style={{ margin: '20px 0 15px 0' }}>
              <Logo src="/images/pecalive.png" style={{ height: '45px', marginRight: '8x' }} />
            </CenterDiv>

            <CenterDiv
              style={{
                color: 'slategray',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              パソコンでも、スマホでも。
            </CenterDiv>
            <CenterDiv
              style={{
                color: 'slategray',
                fontSize: '13px',
                fontWeight: 'bold',
                marginBottom: '50px',
              }}
            >
              もっと気軽にピアキャスライフを！
            </CenterDiv>

            <CenterDiv style={{ marginBottom: '5px' }}>
              <img src="/images/device/anywhere.png" style={{ width: '100%', maxWidth: '350px' }} />
            </CenterDiv>

            <CenterDiv
              style={{
                fontSize: '16px',
                color: 'rgba(0, 0, 0, 0.54)',
                margin: '5px 0 15px 0',
              }}
            >
              どこからでもPeerCastを見よう！
            </CenterDiv>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            次へ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialog.currentAboutPage === 1}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>作りはじめたきっかけ</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <CenterDiv>
              <img src="/images/pecalive-about.jpg" style={{ maxWidth: '360px', width: '100%' }} />
            </CenterDiv>

            <Title>限界集落と呼ばれて早５年…</Title>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>「限界集落」と呼ばれだして早５年以上が経ちました。</span>
                <span>Youtube Liveや、Twitchなど お手軽にゲーム配信ができるサービスが増えました。</span>
                <span>そして、配信以外にも Youtube、Netflix、amazon prime videoなどの強敵も登場！</span>
              </Typography>
            </div>

            <div style={{ margin: '30px 0' }} />

            <Title>お手軽さが必要な時代になった！</Title>
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>僕も気がついたら、Youtubeばっかり見てました。。。</span>
                <span>ピアキャスは好きなんだけど、なんとなく離れていってしまう。</span>
                <span>あいつらみたいに「お手軽さ」がないとやっていけない時代になってきたんだと思う。</span>
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            次へ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialog.currentAboutPage === 2}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          <span style={{ fontFamily: 'Anton' }}>PeerCast FOREVER</span>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <Title>みんなのピアキャスライフをサポートしていきたい！</Title>
            <div style={{ marginBottom: '15px' }}>
              <Typography variant="body2" color="textSecondary" component="div">
                もっと快適なサービスにしていくために、みなさんの意見が必要です！ 要望、バグ報告など 気軽に{' '}
                <a href="https://twitter.com/shule517">@shule517</a> まで連絡ください。
              </Typography>
            </div>

            <CenterDiv>
              <img src="/images/forever-peerkasu.png" style={{ maxWidth: '400px', width: '100%' }} />
            </CenterDiv>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h4`
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
`

const Logo = styled.img`
  height: 40px;
`

export default About
