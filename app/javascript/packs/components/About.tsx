import React from 'react'
import styled from 'styled-components'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

type Props = {}

const About = (props: Props) => {
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
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">ぺからいぶ！とは</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ maxWidth: '400px', width: '100%' }}
          >
            <CenterDiv style={{ margin: '20px 0 15px 0' }}>
              <Logo src="/images/pecalive.png" />
            </CenterDiv>

            <CenterDiv
              style={{
                color: '#757c80',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              パソコンでも、スマホでも。
            </CenterDiv>
            <CenterDiv
              style={{
                color: '#757c80',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              もっと気軽にピアキャスライフを！
            </CenterDiv>

            <CenterDiv>
              <img src="/images/device/anywhere.png" />
            </CenterDiv>

            どこからでも簡単にPeerCastを見ることがきでます！

            <hr style={{ margin: '35px 0' }} />

            <h3>ぺからいぶ！を作り出した きっかけ</h3>
            <CenterDiv>
              <img
                src="/images/pecalive-about.jpg"
                style={{ maxWidth: '400px', width: '100%' }}
              />
            </CenterDiv>

            <h3>限界集落と呼ばれて早５年…</h3>
            <div style={{ marginBottom: '5px' }}>
              <span>「限界集落」と呼ばれだして早５年以上が経ちました。</span>
              <span>その間に、お手軽な動画配信サービスが登場しました。</span>
            </div>

            <div style={{ margin: '30px 0' }} />

            <h3>お手軽さが必要な時代になった！</h3>
            <div style={{ marginBottom: '30px' }}>
              <span>ピアキャスは好きなんだけど、なんとなく離れていってしまう。。。</span>
              <span>あいつらみたいに「お手軽さ」が必要な時代になってきたんだと思う。</span>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <span>「</span>
              <Logo src="/images/pecalive.png" style={{ height: '20px', margin: '0 6px' }} />
              <span>」で、みんなのピアキャスライフをサポートしていきたい！</span>
            </div>

            <CenterDiv>
              <img
                src="/images/forever-peerkasu.png"
                style={{ maxWidth: '400px', width: '100%' }}
              />
            </CenterDiv>
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
`

const Logo = styled.img`
  height: 40px;
`

export default About
