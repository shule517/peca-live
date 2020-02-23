import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import React, { useEffect, useState } from 'react'
import SignInScreen from './SignInScreen'

type Props = {
  open: boolean
  onClose: () => void
}

const LoginDialog = (props: Props) => {
  const { open, onClose } = props

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle>ログイン</DialogTitle>
      <DialogContent dividers>
        <SignInScreen />
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
