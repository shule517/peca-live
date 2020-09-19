import React from 'react'
import styled from 'styled-components'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'

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
              <Logo
                src="/images/pecalive.png"
                style={{ height: '45px', marginRight: '8x' }}
              />
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
              <img
                src="/images/device/anywhere.png"
                style={{ width: '100%', maxWidth: '350px' }}
              />
            </CenterDiv>

            <CenterDiv>どこからでもPeerCastを見よう！</CenterDiv>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={false}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          ぺからいぶ！を作り出した きっかけ
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ maxWidth: '400px', width: '100%' }}
          >
            <CenterDiv>
              <img
                src="/images/pecalive-about.jpg"
                style={{ maxWidth: '400px', width: '100%' }}
              />
            </CenterDiv>

            <Title>限界集落と呼ばれて早５年…</Title>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>「限界集落」と呼ばれだして早５年以上が経ちました。</span>
                <span>その間に、お手軽な動画配信サービスが登場しました。</span>
              </Typography>
            </div>

            <div style={{ margin: '30px 0' }} />

            <Title>お手軽さが必要な時代になった！</Title>
            <div style={{ marginBottom: '30px' }}>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  ピアキャスは好きなんだけど、なんとなく離れていってしまう。。。
                </span>
                <span>
                  あいつらみたいに「お手軽さ」が必要な時代になってきたんだと思う。
                </span>
              </Typography>
            </div>

            <Title>みんなのピアキャスライフをサポートしていきたい！</Title>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>
                  このままだと本当にコミュニティとしてのPeerCastは死ぬんだなと思いました。
                </span>
                <span>この場所を守るためにも、サポートをしていきたい。</span>
              </Typography>
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

const Title = styled.h4`
  margin-bottom: 10px;
`

const Logo = styled.img`
  height: 40px;
`

export default About
