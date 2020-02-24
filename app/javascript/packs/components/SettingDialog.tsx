import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { useSelectorPeerCast, updatePeerCast } from '../modules/peercastModule'
import PeerCast from '../types/PeerCast'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import styled from 'styled-components'

type Props = {
  open: boolean
  onClose: () => void
}

const SettingDialog = (props: Props) => {
  const dispatch = useDispatch()
  const peercast = useSelectorPeerCast()
  const [cookies, setCookie] = useCookies(['pecaHost', 'pecaPortNo'])
  const [textHost, setTextHost] = useState(peercast.host)
  const [textPortNo, setTextPortNo] = useState(peercast.portNo)
  const [broadcastChannels, setBroadcastChannels] = useState([])
  const [isPrivate, setIsPrivate] = useState(false)
  const { open, onClose } = props

  useEffect(() => {
    // ダイアログを開いた時は現在の設定を表示する
    if (open) {
      setTextHost(peercast.host)
      setTextPortNo(peercast.portNo)
    }

    const fetchLiveChannel = async () => {
      const response = await fetch('/api/v1/channels/broadcasting', {
        credentials: 'same-origin'
      })
      const channels = await response.json()
      console.log(`channels.length: ${channels.length}`)
      setBroadcastChannels(channels)
    }
    fetchLiveChannel()
  }, [open, isPrivate])

  const onSaveButtonClick = () => {
    // PeerCastの設定とクッキーに保存
    updatePeerCast(dispatch, textHost, textPortNo)
    setCookie('pecaHost', textHost)
    setCookie('pecaPortNo', textPortNo)
  }

  const onDefaultButtonClick = () => {
    // デフォルト値にテキストボックスを書き換え
    setTextHost(PeerCast.defaultHost)
    setTextPortNo(PeerCast.defaultPortNo)
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">設定</DialogTitle>
      <DialogContent>
        <FormLabel component="legend">接続先のPeerCast</FormLabel>
        <TextField
          autoFocus
          margin="dense"
          id="peercast-host"
          label="IP"
          size="small"
          value={textHost}
          onChange={e => setTextHost(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="peercast-port-no"
          label="ポート番号"
          size="small"
          value={textPortNo}
          onChange={e => setTextPortNo(parseInt(e.target.value))}
          fullWidth
        />

        <StyledFormGroup>
          <FormLabel component="legend">配信の掲載</FormLabel>
          {broadcastChannels &&
            broadcastChannels.map(channel => {
              return (
                <FormControlLabel
                  key={channel.channelId}
                  control={
                    <Switch
                      checked={!channel.private}
                      onChange={event => {
                        const apiUrl = `/api/v1/channels/private/${channel.name}`
                        fetch(apiUrl, {
                          credentials: 'same-origin'
                        })
                        setIsPrivate(!isPrivate)
                      }}
                    />
                  }
                  label={`「${channel['name']}」を掲載する`}
                />
              )
            })}
        </StyledFormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDefaultButtonClick()} color="primary">
          デフォルトに戻す
        </Button>
        <Button
          onClick={() => {
            onClose()
            onSaveButtonClick()
          }}
          color="primary"
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const StyledFormGroup = styled(FormGroup)`
  padding-top: 15px;
`

export default SettingDialog
